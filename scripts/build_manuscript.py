import docx,json,csv,re,os,collections
from docx.shared import Pt,Cm,Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH,WD_COLOR_INDEX
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
SC=os.path.dirname(os.path.abspath(__file__))
AN=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR\Analysis'
OUT=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR'
REF=json.load(open(os.path.join(SC,'refs.json'),encoding='utf-8'))
IDX=list(csv.DictReader(open(r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR\FullText_42\INDEX_42_studi.csv',encoding='utf-8-sig')))
RES=list(csv.DictReader(open(os.path.join(AN,'results_pairwise_and_sensitivity.csv'),encoding='utf-8')))
GR=list(csv.DictReader(open(os.path.join(AN,'GRADE_table.csv'),encoding='utf-8')))
HN=json.load(open(os.path.join(SC.replace('ext',''),'hand_numbers.json')))
# ---------- citation machinery ----------
key2pmid={}
for r in IDX:
    k=re.sub(r'[^a-z]','',r['First author'].lower())+r['Year']
    key2pmid[k]=r['PMID']
key2pmid.update({'owen2006':'17101353','owen2010':'20850625','fraser2020':'32151403','fraser2022':'35450699','avila2025':'39812599','vila2025':'39812599','sosnowska2023':'36808050','maksoudfilho2006':'16736218'})
order=[]
def cite(m):
    keys=[k.strip().lstrip('@') for k in re.split(r'[;,]',m.group(1))]
    nums=[]
    for k in keys:
        rk=key2pmid.get(k,k)
        if rk not in REF: raise KeyError(k)
        if rk not in order: order.append(rk)
        nums.append(order.index(rk)+1)
    nums=sorted(set(nums));
    # compress ranges
    out=[];i=0
    while i<len(nums):
        j=i
        while j+1<len(nums) and nums[j+1]==nums[j]+1: j+=1
        out.append(str(nums[i]) if j==i else (f'{nums[i]},{nums[j]}' if j==i+1 else f'{nums[i]}\u2013{nums[j]}')); i=j+1
    return '['+','.join(out)+']'
def cit(t): return re.sub(r'\[@([^\]]+)\]',cite,t)
# ---------- numbers ----------
def get(analysis_start,o,c):
    for r in RES:
        if r['analysis'].startswith(analysis_start) and r['outcome']==o and r['contrast']==c: return r
P=lambda o,c:get('Primary',o,c)
def f1(x,d=1): return f'{float(x):.{d}f}'.replace('-','\u2212')
def ci(r,d=1): return f"{f1(r['est'],d)} ({f1(r['lo'],d)} to {f1(r['hi'],d)})"
def pi(r,d=1): return f"{f1(r['pi_lo'],d)} to {f1(r['pi_hi'],d)}"
def i2(r): return f"{float(r['I2']):.0f}%"
def S(an,o,c): return get(an,o,c)
# ---------- document helpers ----------
D=docx.Document()
sec=D.sections[0]; sec.page_width=Cm(21.59); sec.page_height=Cm(27.94)
for a in ('left_margin','right_margin','top_margin','bottom_margin'): setattr(sec,a,Cm(2.54))
st=D.styles['Normal']; st.font.name='Times New Roman'; st.font.size=Pt(11); st.element.rPr.rFonts.set(qn('w:eastAsia'),'Times New Roman')
st.paragraph_format.line_spacing=1.5; st.paragraph_format.space_after=Pt(6)
# line numbering
sp=sec._sectPr; ln=OxmlElement('w:lnNumType'); ln.set(qn('w:countBy'),'1'); ln.set(qn('w:restart'),'continuous'); sp.append(ln)
def runs(p,text,bold=False,italic=False,size=None):
    parts=re.split(r'(«[^»]*»)',text)
    for s in parts:
        if not s: continue
        hl=s.startswith('«')
        s=s.strip('«»') if hl else s
        # italic markup *...*
        for q in re.split(r'(\*[^*]+\*)',s):
            if not q: continue
            it=q.startswith('*') and q.endswith('*') and len(q)>2
            r=p.add_run(q.strip('*') if it else q); r.bold=bold; r.italic=italic or it
            if size: r.font.size=Pt(size)
            if hl: r.font.highlight_color=WD_COLOR_INDEX.YELLOW
def para(text,bold=False,italic=False,size=None,align=None,after=6,indent=False,keep=False):
    p=D.add_paragraph(); runs(p,cit(text),bold,italic,size)
    p.paragraph_format.space_after=Pt(after)
    if align=='c': p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    if indent: p.paragraph_format.first_line_indent=Cm(1)
    if keep: p.paragraph_format.keep_with_next=True
    return p
def H(text,lvl=1):
    p=D.add_paragraph(); r=p.add_run(text); r.bold=True; r.font.size=Pt(13 if lvl==1 else 11.5)
    if lvl==2: r.italic=True
    p.paragraph_format.space_before=Pt(10); p.paragraph_format.keep_with_next=True; return p
def tbl(head,rows,widths,size=8.5,hl_cols=()):
    t=D.add_table(rows=1,cols=len(head)); t.alignment=WD_TABLE_ALIGNMENT.CENTER; t.autofit=False
    b=OxmlElement('w:tblBorders')
    for e in ('top','bottom','insideH'):
        x=OxmlElement('w:'+e); x.set(qn('w:val'),'single'); x.set(qn('w:sz'),'4'); x.set(qn('w:color'),'000000'); b.append(x)
    t._tbl.tblPr.append(b)
    for i,h in enumerate(head):
        c=t.rows[0].cells[i]; c.width=Cm(widths[i]); r=c.paragraphs[0].add_run(h); r.bold=True; r.font.size=Pt(size)
    for row in rows:
        cs=t.add_row().cells
        for i,v in enumerate(row):
            cs[i].width=Cm(widths[i]); runs(cs[i].paragraphs[0],cit(str(v)),size=size)
    for row in t.rows:
        for c in row.cells:
            for p in c.paragraphs: p.paragraph_format.space_after=Pt(1); p.paragraph_format.line_spacing=1.0
    D.add_paragraph().paragraph_format.space_after=Pt(2)
    return t
def fig(path,caption,width=6.5):
    p=D.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.add_run().add_picture(path,width=Inches(width))
    para(caption,size=10,after=10)

# =================== TITLE PAGE ===================
TITLE='Delayed silo-based and sutureless closure compared with fascial closure for gastroschisis: a systematic review and meta-analysis of comparative studies'
para(TITLE,bold=True,size=15,after=10)
para('Vita Indriasari, Karina Zulkarnain Balia*, Rizki Diposarosa, Dikki Drajat Kusmayadi, Emiliana Lia',after=4)
para('Department of Pediatric Surgery, Faculty of Medicine, Universitas Padjadjaran, Jl. Raya Bandung-Sumedang Km 21, Jatinangor, Sumedang 45363, West Java, Indonesia',size=10,after=4)
para('*Corresponding author: Karina Zulkarnain Balia, dr.karinazulkarnain@gmail.com',size=10,after=4)
para('Running title: Closure strategies for gastroschisis',size=10,after=4)
para('Keywords: gastroschisis; abdominal wall closure; silo; sutureless closure; meta-analysis; prediction interval',size=10,after=4)
para('«[Author contributions, ORCID iDs and affiliation superscripts to be completed by the authors.]»',size=10)
D.add_page_break()
# =================== ABSTRACT ===================
H('Abstract')
dl=P('LOS','DC_vs_FC'); dv=P('VD','DC_vs_FC'); dp=P('PN','DC_vs_FC'); df=P('FF','DC_vs_FC')
sv=P('VD','SL_vs_FC'); sl=P('LOS','SL_vs_FC'); sh=P('HERNIA','SL_vs_FC')
para(f"*Background.* Surgeons close gastroschisis by fascial closure (FC), delayed closure after a silo (DC), or sutureless closure (SL). The choice depends on the condition of the bowel, so comparisons between strategies are open to confounding by indication. We pooled the comparative evidence and asked how far its results can be trusted.")
para(f"*Methods.* We searched PubMed, Scopus, Cochrane Library, EBSCOhost, ProQuest, Europe PMC, ClinicalTrials.gov, and ten pediatric surgery journals on 22 November 2026 «[Scopus, Cochrane, EBSCOhost and ProQuest counts to be entered]». Randomized trials and comparative cohort or case-control studies of neonates with gastroschisis were eligible. Effects were pooled with random-effects models (REML, Hartung-Knapp confidence intervals, prediction intervals). Risk of bias was rated with ROBINS-I and RoB 2, and certainty with GRADE. A network meta-analysis and a multilevel model served as secondary analyses.")
para(f"*Results.* Forty-two reports with extractable data were found, and 35 contributed arm-level data on about 5,800 infants, including three randomized trials. Compared with FC, DC was associated with a longer hospital stay ({ci(dl)} days; {dl['k']} studies), more ventilator days ({ci(dv)}) and more days of parenteral nutrition ({ci(dp)}); time to full feeds, sepsis, necrotizing enterocolitis and mortality did not differ. Heterogeneity was high (I\u00B2 {i2(dl)} for stay) and the prediction interval for stay ({pi(dl)} days) included no difference. The three trials (n = 92 for stay) were too small to settle the question. SL did not change hospital stay ({ci(sl)} days; {sl['k']} studies) but was associated with fewer ventilator days ({ci(sv)}; {sv['k']} studies). Umbilical hernia was more frequent after SL, with a very wide interval (RR {ci(sh,2)}; {sh['k']} studies). Certainty was low or very low for every outcome.")
para("*Conclusions.* The longer stay and ventilation after silo-based closure probably reflect, at least in part, the sicker infants who receive a silo. Sutureless closure may shorten ventilation without a clear effect on stay. Trials that stratify by bowel condition, or registries that adjust for it, are needed before a strategy can be recommended for every infant.")
D.add_page_break()
# =================== INTRODUCTION ===================
H('1. Introduction')
para("Gastroschisis is a congenital defect of the anterior abdominal wall with a prevalence of about 3 per 10 000 births, higher in young mothers and with regional variation [@feldkamp]. The birth prevalence has risen in the United States over three decades [@schuh]. The timing of surgery and the choice of closure technique influence time on the ventilator, time to full enteral feeds, sepsis and length of stay [@bhat]. Three strategies are in common use: fascial closure at the first operation (FC), staged reduction in a preformed or surgical silo followed by delayed closure (DC), and sutureless closure that leaves the fascial defect to close around the umbilical cord or a dressing (SL) [@petrosyan].")
para("Earlier systematic reviews compared pairs of strategies. Reviews of FC against silo-based repair reported similar survival but conflicting results for feeding, stay and ventilation [@kunz; @allin], and reviews of flap or sutureless closure reported short-term outcomes comparable to or better than sutured repair, with more umbilical hernias [@youssef; @miyake; @diyaolu; @rao]. These reviews share one weakness. Infants with edematous or damaged bowel are more likely to receive a silo, and they stay in hospital longer for that reason. A raw comparison of strategies therefore mixes the effect of the technique with the effect of the bowel. Most trials are small, and registries cannot separate the two without adjustment.")
para("We did not find a review that (i) pooled all three strategies against a common comparator using a model that allows for between-study heterogeneity and reports prediction intervals, (ii) separated studies restricted to simple gastroschisis from studies that included complex cases, and (iii) tested whether the network of evidence permits indirect comparison between DC and SL. Our aims were to estimate the association of DC and SL with in-hospital outcomes relative to FC, to examine how far study design, case mix and data conversion change those estimates, and to rate how much confidence the evidence deserves.")
# =================== METHODS ===================
H('2. Methods')
H('2.1 Protocol and reporting',2)
para("The review follows PRISMA 2020 [@prisma]. «[The protocol was registered in PROSPERO, CRD420261519114; the registration must be amended before submission to record the pairwise design, the pre-specified complexity strata and the new search, with the amendment date stated here.]» The analysis plan was written before data were pooled and is provided in the supplement.")
H('2.2 Eligibility',2)
para("We included randomized trials and comparative cohort or case-control studies of neonates with gastroschisis that compared at least two of three strategies and reported outcomes for each arm or an adjusted effect with its standard error. FC meant sutured fascial closure at the first operation. DC meant placement of a preformed or surgical silo with closure at a later operation. SL meant closure without fascial sutures using the umbilical cord or a dressing. Flap or plastic closure was analysed as a separate subgroup and not merged with SL. Single-arm series, case reports, reviews, studies of omphalocele only, and studies that compared timing of closure without comparing techniques were excluded. The primary outcome was length of hospital stay. Secondary outcomes were ventilator days, time to full enteral feeds, days of parenteral nutrition, sepsis or bloodstream infection, necrotizing enterocolitis, mortality and ventral or umbilical hernia.")
H('2.3 Search',2)
para(f"We searched PubMed, Scopus, the Cochrane Library, EBSCOhost (MEDLINE), ProQuest and Europe PMC (which includes medRxiv) on 22 November 2026, together with ClinicalTrials.gov and ten pediatric surgery journals (Journal of Pediatric Surgery, Pediatric Surgery International, European Journal of Pediatric Surgery, Seminars in Pediatric Surgery, Journal of Pediatric Surgery Case Reports, African Journal of Paediatric Surgery, Journal of Indian Association of Pediatric Surgeons, Journal of Neonatal Surgery, World Journal of Pediatric Surgery, Annals of Pediatric Surgery) through Crossref metadata. The strategy combined a gastroschisis block with a closure-technique block, without limits on language, date or design. It retrieved all 64 records assessed in an earlier version of this review in both PubMed and Europe PMC, and all seven independent reviews and trials we used as a recall check in Europe PMC. The full strings and counts are in Supplementary Table S1 and the Boolean test report. Spanish-language reports were read in the original.")
H('2.4 Selection and data extraction',2)
para("«[Two reviewers screened titles, abstracts and full texts independently, with disagreements settled by a third reviewer; agreement is reported as kappa = ___.]» Full texts of all 42 eligible reports were obtained. For each study we extracted design, setting, population, arm sizes, and means with standard deviations, or medians with ranges or interquartile ranges, for the continuous outcomes, and event counts for the binary outcomes. When a study separated uncomplicated from complex gastroschisis we recorded both strata. When silo groups were defined by time to closure, we combined them into one DC arm with the usual formula for combining groups. Every extracted value, its source table and every conversion is in the extraction workbook (supplement). «[A second reviewer verified every extracted value against the full text.]»")
para("Medians with ranges or interquartile ranges were converted to means and standard deviations with the Box-Cox method of McGrath et al. [@mcgrath], which allows for skew and is the primary approach, and with the formulas of Wan et al. [@wan] as a sensitivity analysis. Standard errors were converted to standard deviations. Conversions use a fixed random seed (20261123) for reproducibility. Studies that reported only medians without any measure of spread, or means without standard deviations, were not pooled for that outcome.")
H('2.5 Risk of bias and certainty of evidence',2)
para("Non-randomized studies were assessed with ROBINS-I [@robinsi] and trials with RoB 2 [@rob2]. «[Two reviewers rated each study independently and resolved differences by discussion.]» Certainty of evidence was rated with GRADE. Bodies of evidence from non-randomized studies started at high certainty within the ROBINS-I framework and were rated down for risk of bias, inconsistency, indirectness, imprecision and publication bias [@grade; @grade_robinsi]. We used minimally important differences of 3 days for stay, feeds and parenteral nutrition, 1 day for ventilation and a risk ratio of 0.75 to 1.25 for binary outcomes.")
H('2.6 Statistical analysis',2)
para("We chose the model from the structure of the data. The comparisons are DC against FC and SL against FC. Most studies contribute one effect per outcome, so a conventional pairwise random-effects meta-analysis is the primary model [@balduzzi]. We estimated between-study variance with restricted maximum likelihood, used the Hartung-Knapp adjustment for the confidence interval because most analyses had fewer than 20 studies [@hk], and report 95% prediction intervals [@inthout]. Continuous outcomes were pooled as mean differences in days, and binary outcomes as risk ratios with inverse-variance weights and a 0.5 continuity correction. Each study entered once per outcome. When a study reported both a simple stratum and an all-infant stratum, the all-infant stratum was used in the primary analysis and the simple stratum in a pre-specified sensitivity analysis.")
para("Heterogeneity was summarised with I\u00B2 and \u03C4\u00B2. We explored it with subgroup analyses by design (randomized or not) and by population (studies restricted to simple gastroschisis or not), by a single-moderator meta-regression on publication year, and by leave-one-out analysis. Funnel plots and the Egger test were run only for comparisons with ten or more studies. Sensitivity analyses used the Wan conversion, simple-stratum data only, trials only, non-randomized studies only, exclusion of studies whose arm sizes had to be approximated, exclusion of every converted median, and the inclusion of flap or plastic closure in SL.")
para("Three secondary analyses addressed dependence between effects. First, two three-arm studies contribute a shared arm to both comparisons and the only direct DC against SL data; we therefore fitted a frequentist network meta-analysis with netmeta [@netmeta], in which every network is connected through FC and a loop is closed only by those two studies, and we examined direct and indirect estimates with node splitting. We interpreted P-scores with caution [@pscore]. Second, we fitted a multilevel model (rma.mv) with study and effect as random levels and the contrast as a moderator, with cluster-robust standard errors [@metafor]. Third, the contrast of sutureless against sutured closure after silo placement (two studies) was analysed separately. All analyses were run in R 4.6.2 with the meta, metafor, netmeta and estmeansd packages; scripts and data are in the supplement.")
# =================== RESULTS ===================
H('3. Results')
H('3.1 Study selection',2)
para(f"«[Database and register totals, duplicates removed and records screened: to be entered from the PRISMA diagram once the Scopus, Cochrane Library, EBSCOhost and ProQuest counts are available.]» Hand-searching of ten journals identified {HN['ident']} records, {HN['dbmatch']} of which had already been found by the database searches. Of the remaining {HN['unique']}, {HN['excl']} were excluded on title or abstract, one was a duplicate, one (a multicentre cohort of complex gastroschisis) lacked group sizes and standard deviations, and {HN['pend']} await full-text access. Forty-two reports were eligible for data extraction. Thirty-five contributed arm-level data to at least one analysis (Table 1). Seven were not pooled: four reported only adjusted associations [@weinsheimer2008; @gonzalez2018; @williamson2022; @wong2020], one compared centres by region and not by strategy [@manson2012], one was a before-and-after comparison [@joharifard2022], and one reported medians without any measure of spread [@dore2016].")
H('3.2 Characteristics of included studies',2)
para("The 35 studies were published from 2000 to 2025 and came from North America (n = 23), Europe (n = 6), Latin America (n = 4) and Asia (n = 2). Three were randomized trials [@pastor2008; @bruzoni2017; @poola2019], one of which stopped early. The remainder were single-centre or multicentre cohorts and case-control studies, including eight registry, consortium or multicentre cohorts [@murthy2014; @gurien2017; @owen2010; @stanger2014; @emami2015; @hawkins2020; @fraser2020; @fraser2022]. Twelve studies restricted inclusion to simple gastroschisis or reported a simple stratum; the others included complex cases without separate data. Twenty-two studies compared DC with FC, and twelve compared SL (or flap closure) with FC. Two had three arms [@mcnamara2011; @avila2025]. Two studies compared a mixed comparator (primary closure plus surgical silo) with a preformed silo; because that comparator is not FC, they were not pooled and are described in the supplement [@allotey2007; @charlesworth2014]. Two studies contributed to the contrast of sutureless against sutured closure after silo [@fraser2020; @dariel2015].")
# Table 1 builder
arms=list(csv.DictReader(open(os.path.join(SC,'arms.csv'),encoding='utf-8-sig')))
country={'Minkes':'USA','Kidd':'USA','Chiu':'USA','Maksoud-Filho':'Brazil','Owen2006':'UK','Allotey':'UK','Pastor':'USA, Canada','Riboh':'USA','Villela':'Mexico','Banyard':'USA','Lobo':'USA','Owen2010':'UK, Ireland','Tsai':'Taiwan','McNamara':'USA','Alali':'USA','Schmidt':'Brazil','Orion':'USA','Charlesworth':'UK','Stanger':'Canada','Murthy':'USA','Dariel':'Canada','Emami':'Canada','Bruzoni':'USA','Gurien':'USA','Poola':'USA','Witt':'USA','Grabski':'USA','Hawkins':'USA','Fraser2020':'USA','Fraser2022':'USA','Barry':'USA','Sosnowska':'Poland','Chantakhow':'Thailand','Avila-Hernandez':'Mexico','Anand':'UK'}
design={'Pastor':'RCT','Bruzoni':'RCT','Poola':'RCT (stopped early)','Owen2006':'Matched case-control','Riboh':'Case-control','Grabski':'Case-control','Owen2010':'National cohort','Murthy':'Registry cohort','Gurien':'Registry cohort','Stanger':'Registry cohort','Hawkins':'Multicentre cohort','Fraser2020':'Consortium cohort','Fraser2022':'Consortium cohort','Emami':'Registry cohort'}
simple={'Riboh','Owen2006','Villela','Owen2010','Murthy','Fraser2020','Avila-Hernandez','Bruzoni','Poola'}
strat={'Tsai','Witt','Emami'}
lab={'Owen2006':'Owen 2006','Owen2010':'Owen 2010','Fraser2020':'Fraser 2020','Fraser2022':'Fraser 2022','Avila-Hernandez':'Avila-Hernandez 2025','Maksoud-Filho':'Maksoud-Filho 2006'}
rows=[]; seen=set()
def narm(study):
    if study=='Hawkins': return collections.OrderedDict([('FC',224),('DC',327)])
    if study=='Gurien': return collections.OrderedDict([('FC',364),('DC',263)])
    best={}
    for r in arms:
        if r['study']!=study or r['stratum'] not in ('A','M','P','S'): continue
        for pre,node in (('c',r['c_node']),('e',r['e_node'])):
            n=r[f'{pre}_n']
            if not n: continue
            pr={'A':0,'M':1,'P':2,'S':2}[r['stratum']]
            if node not in best or pr<best[node][0]: best[node]=(pr,int(float(n)))
    return collections.OrderedDict((k,v[1]) for k,v in sorted(best.items(),key=lambda kv:['FC','TC','SL','DC'].index(kv[0]) if kv[0] in ['FC','TC','SL','DC'] else 9))
studies=[]
for r in arms:
    if r['study'] not in seen and r['stratum']!='POSTSILO': seen.add(r['study']); studies.append((r['study'],int(r['year'])))
studies=sorted(studies,key=lambda s:(s[1],s[0]))
outs=collections.defaultdict(set)
for r in arms:
    if r['outcome'] in ('LOS','VD','FF','PN','SEPSIS','DEATH','HERNIA','NEC'): outs[r['study']].add(r['outcome'])
short={'LOS':'LOS','VD':'VD','FF':'FF','PN':'PN','SEPSIS':'Sep','DEATH':'Mort','HERNIA':'Hern','NEC':'NEC'}
for s,y in studies:
    key=re.sub(r'[^a-z]','',s.lower())+str(y)
    a=narm(s); pop='Simple' if s in simple else ('Simple stratum + all' if s in strat else 'Unrestricted')
    ns='/'.join(f"{k} {v}" for k,v in a.items())
    rows.append([f"{lab.get(s,s+' '+str(y))} [@{key.replace('owen20062006','owen2006')}]" if False else f"{lab.get(s,s+' '+str(y))}",country.get(s,''),design.get(s,'Cohort'),pop,ns,', '.join(short[o]+('*' if (s=='Stanger' and o in ('LOS','VD')) else '') for o in ('LOS','VD','FF','PN','SEPSIS','DEATH','HERNIA','NEC') if o in outs[s])])
D.add_paragraph()
para('Table 1. Characteristics of the 35 studies that contributed arm-level data.',bold=True,size=10,keep=True)
tbl(['Study','Country','Design','Population','Arms (n)','Outcomes extracted'],rows,[3.4,2.0,2.6,2.6,4.0,3.0],size=8)
para("FC, fascial closure; DC, delayed closure after silo; SL, sutureless or flap closure; TC, mixed comparator (primary closure plus surgical silo). LOS, length of stay; VD, ventilator days; FF, time to full enteral feeds; PN, parenteral nutrition days; Sep, sepsis or infection; Mort, mortality; Hern, hernia; NEC, necrotizing enterocolitis. Arm sizes are those of the stratum used in the primary analysis. *Means without standard deviations; not pooled.",size=9)
H('3.3 Risk of bias',2)
para("Overall risk of bias was serious in 31 of 32 non-randomized studies and moderate in one (a matched case-control study) (Figure 5). Confounding was serious in every study except the matched one, because the technique was chosen on the basis of bowel condition and, in several cohorts, changed with era. Missing outcome data raised concern in two registries: stay was available for 76% of infants in one and 85% in the other, and time to full feeds for only 26% in the first [@hawkins2020; @gurien2017]. Of the three trials, one was rated at low risk [@pastor2008] and two had some concerns, mainly because they were small, unblinded and, for one, stopped early [@bruzoni2017; @poola2019].")
H('3.4 Delayed silo-based closure compared with fascial closure',2)
para(f"Nineteen studies with 2,460 infants contributed to length of stay. DC was associated with {f1(dl['est'])} more days in hospital (95% CI {f1(dl['lo'])} to {f1(dl['hi'])}; I\u00B2 {i2(dl)}; Figure 2). The 95% prediction interval, {pi(dl)} days, includes both benefit and harm, so the effect in a new setting could be null. Ventilator days were higher after DC ({ci(dv)} days; 16 studies; I\u00B2 {i2(dv)}), as was parenteral nutrition ({ci(dp)} days; 11 studies; I\u00B2 {i2(dp)}). Time to full enteral feeds did not differ ({ci(df)} days; 10 studies). Sepsis (RR {ci(P('SEPSIS','DC_vs_FC'),2)}; 10 studies), necrotizing enterocolitis (RR {ci(P('NEC','DC_vs_FC'),2)}; 7 studies) and mortality (RR {ci(P('DEATH','DC_vs_FC'),2)}; 9 studies) did not differ. Ventral hernia was less frequent after DC, but only three studies informed it and the interval included no difference (RR {ci(P('HERNIA','DC_vs_FC'),2)}).")
a=S('Non-randomised','LOS','DC_vs_FC'); r_=S('Randomised','LOS','DC_vs_FC'); s_=S('Simple','LOS','DC_vs_FC'); w_=S('Wan','LOS','DC_vs_FC'); x_=S('Excluding converted','LOS','DC_vs_FC'); ap=S('Excluding approximated','LOS','DC_vs_FC')
para(f"The finding for stay was stable to leave-one-out analysis (pooled difference 5.8 to 7.6 days, P from 0.002 to 0.025) and to the exclusion of studies with approximated arm sizes ({ci(ap)} days), but it lost statistical significance when only studies reporting means and standard deviations were kept ({ci(x_)} days; 11 studies) and with the Wan conversion ({ci(w_)} days; 18 studies). In studies restricted to simple gastroschisis the estimate was similar but imprecise ({ci(s_)} days; 6 studies). The two trials with extractable stay data (n = 92) gave {ci(r_)} days, an interval too wide to be informative [@pastor2008; @poola2019]. Subgroup tests did not show that the estimate differed by population (P = 0.66) or design (P = 0.11). A meta-regression on publication year was not significant (0.4 days per year, P = 0.25). The funnel plot showed no clear asymmetry (Egger P = 0.56). The multilevel model gave a similar estimate (7.3 days, 95% CI 3.4 to 11.3).")
fig(os.path.join(AN,'forest','forest_LOS_DC_vs_FC.png'),'Figure 2. Length of hospital stay, delayed silo-based closure (DC) versus fascial closure (FC). Random-effects meta-analysis with Hartung-Knapp confidence interval; red bar, 95% prediction interval. Positive differences mean longer stay after DC.')
H('3.5 Sutureless closure compared with fascial closure',2)
para(f"Eight studies with 416 infants informed length of stay, and SL did not change it ({ci(sl)} days; I\u00B2 {i2(sl)}; Figure 3). Ventilator days were lower after SL ({ci(sv)} days; 5 studies; I\u00B2 {i2(sv)}), and the direction was the same with the Wan conversion ({ci(S('Wan','VD','SL_vs_FC'))}), in non-randomized studies only ({ci(S('Non-randomised','VD','SL_vs_FC'))}) and when flap and plastic closure were added ({ci(S('Including','VD','SL_vs_FC'))}; 6 studies). It was not significant when only the three studies that reported means and standard deviations were kept ({ci(S('Excluding converted','VD','SL_vs_FC'))}). Time to full feeds ({ci(P('FF','SL_vs_FC'))} days; 6 studies) and parenteral nutrition ({ci(P('PN','SL_vs_FC'))} days; 4 studies) did not differ. Sepsis showed no clear difference (RR {ci(P('SEPSIS','SL_vs_FC'),2)}; 5 studies). Only two studies reported hernia, and SL had more events with a very wide interval (RR {ci(sh,2)}). Only one study with events reported mortality. In the multilevel model, SL was associated with {f1(-2.40)[1:] if False else '2.4'} fewer ventilator days (95% CI 0.6 to 4.2).")
fig(os.path.join(AN,'forest','forest_LOS_SL_vs_FC.png'),'Figure 3. Length of hospital stay, sutureless closure (SL) versus fascial closure (FC). Flap and plastic closure studies were excluded from the primary analysis. Negative differences mean shorter stay after SL.')
fig(os.path.join(AN,'forest','forest_VD_SL_vs_FC.png'),'Figure 4. Ventilator days, sutureless closure (SL) versus fascial closure (FC). Negative differences mean fewer ventilator days after SL.')
H('3.6 Closure after silo placement',2)
para("Two studies compared sutureless with sutured closure in infants who had already received a silo. In the Midwest Pediatric Surgery Consortium (uncomplicated gastroschisis, 30 sutureless and 212 sutured), median stay was 36 against 33.5 days, ventilator time 0.5 against 4 days, and surgical site infection 1 of 30 against 29 of 212 [@fraser2020]. In a Canadian cohort (23 plastic and 41 surgical secondary closures), ventilator time, sepsis (12 of 23 against 13 of 41) and umbilical hernia (5 of 23 against 6 of 41) were similar [@dariel2015]. These data are too few to pool.")
H('3.7 Network and multilevel analyses',2)
para("The network for stay contained 25 studies from three designs (DC against FC, SL against FC, and the two three-arm studies). Estimates against FC agreed with the pairwise results: DC 7.1 days (95% CI 3.4 to 10.8) and SL 0.5 days (\u22125.2 to 6.2). For ventilator days, DC added 2.7 days (1.1 to 4.2) and SL removed 2.5 days (\u22125.1 to 0.1), and for parenteral nutrition DC added 7.3 days (3.5 to 11.0) with no change for SL. Direct and indirect estimates for DC against SL did not disagree (stay, P = 0.19; ventilator days, P = 0.76; parenteral nutrition, P = 0.95), but the loop rests on two small studies, so the test has little power and the P-scores were not interpreted. Network estimates are in Supplementary Figure S1.")
H('3.8 Certainty of the evidence',2)
para("Certainty was very low for stay, ventilator days, feeds, parenteral nutrition and hernia after DC, and for stay, feeds, parenteral nutrition, sepsis and hernia after SL. It was low for sepsis, necrotizing enterocolitis and mortality after DC and for ventilator days after SL (Table 2). We rated risk of bias down by one level in every case and did not rate down for publication bias.")
# Table 2 from GRADE csv
rows2=[]
for g in GR:
    rows2.append([g['Contrast'],g['Outcome'],g['Studies'],g['Participants'],g['Effect'],g['I2'],g['Certainty_Text'].title()])
para('Table 2. Pooled estimates and certainty of evidence (primary analyses).',bold=True,size=10,keep=True)
tbl(['Comparison','Outcome','Studies','Participants','Effect vs FC (95% CI)','I\u00B2','Certainty'],rows2,[1.9,4.6,3.0,1.9,3.3,1.0,2.0],size=8)
para("Mean differences in days for continuous outcomes and risk ratios for binary outcomes, random-effects with Hartung-Knapp confidence intervals. For mortality the number of studies counts those with events in at least one arm. Full GRADE profiles are in Figures S2 and S3.",size=9)
# =================== DISCUSSION ===================
H('4. Discussion')
para(f"In this review of 35 comparative studies, delayed closure after a silo was associated with about 6.6 more days in hospital, 3 more ventilator days and 7 more days of parenteral nutrition than fascial closure, and showed no difference in sepsis, necrotizing enterocolitis or mortality. Sutureless closure did not change hospital stay but was associated with about 1.5 fewer ventilator days, and its hernia estimate was too imprecise to read. The direction of the ventilator result for SL agrees with a recent meta-analysis of 23 studies [@rao], and the network analysis adds only that the data do not contradict an indirect comparison between DC and SL.")
para("The main result for DC needs to be read with the design of the studies in mind. Surgeons place a silo when the bowel is edematous, when the abdomen does not accept reduction, or when the infant is unstable, and these infants stay longer whatever the technique. The effect sizes fall within the range expected from that selection alone. Four observations support this reading. The two trials, in which allocation did not depend on bowel condition, showed no difference in stay, although with only 92 infants they cannot exclude one. The estimate shrank, and lost significance, when only studies reporting means and standard deviations or restricted to simple gastroschisis were kept. Between-study heterogeneity was large, and the prediction interval included no difference. Finally, the difference in ventilator days ranged from 2 days fewer after DC in a trial to 12 days more in a cohort [@pastor2008; @lobo2010]. The data therefore support the statement that DC is associated with longer care in routine practice. They do not support the statement that DC causes longer care.")
para("The fewer ventilator days after sutureless closure are more plausible as an effect of the technique, because they follow from avoiding general anaesthesia and a closure under tension, and the direction was stable across conversion methods, design and the addition of flap closure. The estimate is based on five studies with 255 infants, however, and it was not significant when only reported means and standard deviations were used. Sutureless closure was not associated with a shorter stay, and the only trial found a longer one [@bruzoni2017]. The hernia signal is consistent with earlier work [@rao; @diyaolu], but two studies cannot estimate its size, and in the largest consortium cohort 39% of peri-umbilical hernias had closed spontaneously, and 46% in the sutureless group [@fraser2022].")
para("Three features of the analysis bear on how the results should be used. First, the choice of model followed the data. Nearly all studies contribute one effect per outcome and the networks are stars apart from two three-arm studies, so a network meta-analysis would have added little beyond two pairwise comparisons. We therefore treated pairwise random-effects meta-analysis with prediction intervals as the primary analysis and reported the network and a multilevel model as checks that agreed with it. Second, conversion of medians matters. Many studies report medians with ranges, and ranges that extend to hundreds of days can produce implausible standard deviations; we used the Box-Cox method as primary, excluded the one study with a parenteral nutrition range up to 1718 days from the Wan sensitivity analysis, and report both sets of results. Third, arm sizes for continuous outcomes in two large registries had to be approximated from the total number with data, and excluding them did not change the conclusions for stay.")
H('4.1 Strengths and limitations',2)
para("The strengths are a search across six databases, one register and ten journals with a tested Boolean string and recall check; full-text review of all 42 eligible reports; a pre-specified separation of simple and complex gastroschisis; prediction intervals and sensitivity analyses on every conversion; and a network and multilevel check. The limitations are those of the evidence. Almost all studies are observational and unadjusted, which leaves confounding by indication as the leading threat. Registries overlap in time and may share centres, and we could not check patient overlap. Outcomes such as ventilator days and time to full feeds are defined differently across studies, and several reports give only medians. Only three trials exist, and one stopped early. Sepsis definitions differ, and mortality is rare. The hand-search records of six journals could not be assessed because abstracts were inaccessible, and one potentially relevant report of complex gastroschisis lacked group sizes. «[Scopus, Cochrane Library, EBSCOhost and ProQuest results will be added; Embase was not searched.]» No pooled analysis was possible for complex gastroschisis alone.")
H('4.2 Implications',2)
para("For counselling, the data support telling families that silo-based closure is associated with a longer stay in routine practice, that this probably reflects the infants who need a silo, and that sutureless closure may shorten ventilation without changing the stay and may increase umbilical hernias that often close without surgery. They do not support a recommendation to choose any strategy for every infant. Future work should report outcomes by complexity stratum, deposit individual patient data from registries so that confounding by bowel condition can be adjusted at the patient level, and run pragmatic trials of sutureless against fascial closure in simple gastroschisis with ventilator days, umbilical hernia and neurodevelopment as outcomes.")
H('5. Conclusions')
para("Delayed silo-based closure is associated with longer stay, ventilation and parenteral nutrition than fascial closure, but the association is imprecise, heterogeneous and open to confounding by indication, and trial evidence is too small to settle it. Sutureless closure may shorten ventilation without a clear effect on stay. Certainty is low or very low, and trials or adjusted individual patient analyses that stratify by bowel condition are needed.")
H('Declarations',1)
para("*Funding.* «[None declared; authors to confirm.]»")
para("*Competing interests.* «[None declared; authors to confirm.]»")
para("*Ethics.* Ethical approval and informed consent were not required because the review used only published data.")
para("*Data availability.* The extraction workbook, analysis dataset and R scripts are provided in the Supplementary Material. «[A new archive with a DOI will be created at submission; the earlier archive, 10.5281/zenodo.22989879, belongs to the previous version.]»")
para("*Use of AI tools.* «[The authors should state here, in the wording required by the target journal, any use of AI tools in data extraction, analysis scripts or drafting, and confirm that all values were checked against the source reports.]»")
# =================== REFERENCES ===================
D.add_page_break(); H('References')
for i,k in enumerate(order,1):
    para(f"[{i}] {REF[k]['ref']}",size=9.5,after=3)
D.add_page_break(); H('Figure legends and figures')
fig(os.path.join(AN,'forest','Figure_ROBINS_I.png'),'Figure 5. Risk of bias of the 32 non-randomized studies (ROBINS-I).',width=5.0)
fig(os.path.join(AN,'forest','forest_VD_DC_vs_FC.png'),'Figure S-a (main text reference). Ventilator days, DC versus FC.')
D.save(os.path.join(OUT,'Manuscript_Gastroschisis_Closure_PairwiseMA.docx'))
print('refs',len(order),'saved')
