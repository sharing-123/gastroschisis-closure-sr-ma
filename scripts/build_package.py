import docx,os,re,shutil,copy,json
from docx.shared import Pt,Cm
from docx.enum.text import WD_COLOR_INDEX,WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
H0=os.path.dirname(os.path.abspath(__file__))
R=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR'; PK=R+r'\Submission_Package'; AN=R+r'\Analysis'; FD=AN+r'\forest'
for sub in ('Tables','Figures','Supplementary','Checklists','Declarations'): os.makedirs(os.path.join(PK,sub),exist_ok=True)
TITLE='Silo-based delayed closure and sutureless closure compared with fascial closure in neonates with gastroschisis, a systematic review and meta-analysis'
AUTH=['Vita Indriasari','Karina Zulkarnain Balia','Rizki Diposarosa','Dikki Drajat Kusmayadi','Emiliana Lia']
AFF='Department of Pediatric Surgery, Faculty of Medicine, Universitas Padjadjaran, Jl. Raya Bandung-Sumedang Km 21, Jatinangor, Sumedang 45363, West Java, Indonesia'
def newdoc(land=False):
    d=docx.Document(); s=d.sections[0]; s.page_width=Cm(21.59); s.page_height=Cm(27.94)
    if land: s.orientation=1; s.page_width,s.page_height=s.page_height,s.page_width
    for a in ('left_margin','right_margin','top_margin','bottom_margin'): setattr(s,a,Cm(2.2))
    st=d.styles['Normal']; st.font.name='Times New Roman'; st.font.size=Pt(11); st.element.rPr.rFonts.set(qn('w:eastAsia'),'Times New Roman')
    st.paragraph_format.space_after=Pt(6); return d
def P(d,t,bold=False,size=None,italic=False,align=None,after=6):
    p=d.add_paragraph()
    for s in re.split(r'(«[^»]*»)',t):
        if not s: continue
        hl=s.startswith('«'); r=p.add_run(s.strip('«»') if hl else s); r.bold=bold; r.italic=italic
        if size: r.font.size=Pt(size)
        if hl: r.font.highlight_color=WD_COLOR_INDEX.YELLOW
    p.paragraph_format.space_after=Pt(after)
    if align=='c': p.alignment=WD_ALIGN_PARAGRAPH.CENTER
    return p
def T(d,head,rows,widths,size=9):
    t=d.add_table(rows=1,cols=len(head)); t.autofit=False
    b=OxmlElement('w:tblBorders')
    for e in ('top','bottom','insideH'):
        x=OxmlElement('w:'+e); x.set(qn('w:val'),'single'); x.set(qn('w:sz'),'4'); x.set(qn('w:color'),'000000'); b.append(x)
    t._tbl.tblPr.append(b)
    for i,h in enumerate(head):
        c=t.rows[0].cells[i]; c.width=Cm(widths[i]); r=c.paragraphs[0].add_run(h); r.bold=True; r.font.size=Pt(size)
    for row in rows:
        cs=t.add_row().cells
        for i,v in enumerate(row):
            cs[i].width=Cm(widths[i]); p=cs[i].paragraphs[0]
            for s in re.split(r'(«[^»]*»)',str(v)):
                if not s: continue
                hl=s.startswith('«'); r=p.add_run(s.strip('«»') if hl else s); r.font.size=Pt(size)
                if hl: r.font.highlight_color=WD_COLOR_INDEX.YELLOW
    for row in t.rows:
        for c in row.cells:
            for p in c.paragraphs: p.paragraph_format.space_after=Pt(1)
    return t
# ---------- numbers from manuscript ----------
M=docx.Document(R+r'\Manuscript_Gastroschisis_Closure_PairwiseMA.docx'); ps=[p.text for p in M.paragraphs]
_ai=ps.index('Abstract'); abs_parts=ps[_ai+1:_ai+5]; abs_txt=' '.join(abs_parts); abs_w=len(abs_txt.replace('«','').replace('»','').split())
main_w=len(' '.join(ps[ps.index('Introduction'):ps.index('Conclusions')+2]).split())
nref=sum(1 for t in ps if re.match(r'^\[\d+\] ',t))
# ---------- 01 title page ----------
d=newdoc()
P(d,'Title page',bold=True,size=13)
P(d,TITLE,bold=True,size=14)
P(d,'Running title. Closure strategies for gastroschisis')
P(d,', '.join(f'{a}\u00B9' if i!=1 else f'{a}\u00B9*' for i,a in enumerate(AUTH)))
P(d,'\u00B9 '+AFF)
P(d,'*Corresponding author. Karina Zulkarnain Balia, Department of Pediatric Surgery, Faculty of Medicine, Universitas Padjadjaran, Jl. Raya Bandung-Sumedang Km 21, Jatinangor, Sumedang 45363, West Java, Indonesia. Email dr.karinazulkarnain@gmail.com. «[Telephone and ORCID iDs to be added.]»')
P(d,f'Abstract {abs_w} words. Main text {main_w} words. References {nref}. Tables 4. Figures 7. Supplementary files 1 document, 1 workbook, 2 supporting documents.')
P(d,'Keywords. gastroschisis, abdominal wall closure, silo, sutureless closure, meta-analysis, prediction interval')
P(d,'Registration. «[PROSPERO CRD420261519114. The record must be amended to describe the pairwise design, the complexity strata and the new search, and the amendment date should be stated here.]»')
P(d,'Funding. «[None declared, authors to confirm.]»')
P(d,'Competing interests. «[None declared, authors to confirm.]»')
P(d,'Ethics. Ethical approval and informed consent were not required because the review used only published data.')
P(d,'Acknowledgments. «[To be completed by the authors, for example librarians or colleagues who helped obtain full texts.]»')
P(d,'Author contributions. «[See the CRediT table in the Declarations folder. Each author must confirm their roles.]»')
P(d,'Data availability. The extraction workbook, analysis dataset and R scripts are in the Supplementary Material. «[A new archive with a DOI will be created at submission.]»')
P(d,'Previous submission. «[The authors should state whether an earlier version of this work was submitted elsewhere. An earlier network meta-analysis version was not accepted by two journals.]»')
d.save(PK+r'\01_Title_Page.docx')
# ---------- 02 cover letter ----------
d=newdoc()
P(d,'«[Date]»'); P(d,'The Editors'); P(d,'«[Journal name]»'); P(d,'Dear Editors,')
P(d,f'We submit the manuscript "{TITLE}" for consideration as a systematic review and meta-analysis.')
P(d,'Surgeons choose among fascial closure, delayed closure after a silo, and sutureless closure for gastroschisis, and the choice depends on the condition of the bowel. That dependence makes simple comparisons of strategies open to confounding by indication. We pooled 35 comparative studies with arm-level data on about 5,800 infants, including three randomized trials, with random-effects models, prediction intervals, risk of bias assessment and GRADE.')
P(d,'Delayed closure after a silo was associated with a longer stay, longer ventilation and more days of parenteral nutrition than fascial closure, but heterogeneity was high and the trials were too small to settle the question. Sutureless closure was associated with fewer ventilator days and did not change length of stay. Certainty of evidence was low or very low. We think the review helps clinicians who counsel families and groups that write local protocols, and it shows what future trials and registries should report.')
P(d,'The review follows PRISMA 2020, and the full search strategies, extraction data and analysis scripts are provided. «[An earlier version of this work with a different design was submitted to other journals and was not accepted. This version has a new search, full-text extraction of 42 reports and a different analysis. Authors to confirm this wording.]»')
P(d,'The work is original, has not been published before and is not under consideration elsewhere. All authors have read and approved the manuscript. «[Competing interests and funding statements to be confirmed.]»')
P(d,'Thank you for considering our work. I am the corresponding author and will handle all communication during review.')
P(d,'Sincerely,'); P(d,'Karina Zulkarnain Balia'); P(d,'On behalf of all authors'); P(d,AFF,size=10); P(d,'dr.karinazulkarnain@gmail.com',size=10)
d.save(PK+r'\02_Cover_Letter.docx')
# ---------- 03 blinded main text ----------
B=docx.Document(R+r'\Manuscript_Gastroschisis_Closure_PairwiseMA.docx')
body=B.element.body
paras=list(B.paragraphs)
# remove author block: paragraphs after the title up to the first page break
tp=[p for p in paras if p.text.lower().startswith('silo-based delayed closure')][0]
rm=False
for p in paras:
    if p._p is tp._p: rm=True; continue
    if rm:
        if p.text=='Abstract': break
        if p.text.strip()!='' or True: p._p.getparent().remove(p._p)
for p in list(B.paragraphs):
    if p._p.xpath('.//w:drawing'): p._p.getparent().remove(p._p)
# drop the final Figures heading page
txt=[p.text for p in B.paragraphs]
for p in list(B.paragraphs):
    if p.text=='Figures': p._p.getparent().remove(p._p)
B.save(PK+r'\03_Manuscript_Blinded_Main_Text.docx')
# ---------- 04 highlights, 05 abstract ----------
H=['Silo-based closure goes with longer stay, but confounding by indication is likely','Sutureless closure may cut ventilator days by about 1.5 without changing stay','Only three small trials exist and certainty of evidence is low to very low','Network and multilevel checks agreed with the pairwise random-effects results']
d=newdoc(); P(d,'Highlights',bold=True,size=13)
for h in H: P(d,'\u2022 '+h+f'  ({len(h)} characters)')
d.save(PK+r'\04_Highlights.docx'); assert all(len(h)<=85 for h in H),[len(h) for h in H]
d=newdoc(); P(d,'Abstract',bold=True,size=13); [P(d,x) for x in abs_parts]; P(d,'Keywords. gastroschisis, abdominal wall closure, silo, sutureless closure, meta-analysis, prediction interval')
d.save(PK+r'\05_Abstract.docx')
# ---------- tables ----------
body=M.element.body; els=list(body)
tbls=[e for e in els if e.tag==qn('w:tbl')]
cap_notes=[]
for i,t in enumerate(tbls,1):
    k=els.index(t); cap=els[k-1]; note=els[k+2] if k+2<len(els) else None
    nd=docx.Document(); s=nd.sections[0]; s.page_width=Cm(27.94); s.page_height=Cm(21.59); s.orientation=1
    for a in ('left_margin','right_margin','top_margin','bottom_margin'): setattr(s,a,Cm(1.8))
    nd.styles['Normal'].font.name='Times New Roman'
    nb=nd.element.body; sect=nb[-1]
    ex=[]
    j=k+1
    while j<len(els) and els[j].tag==qn('w:p') and len(ex)<7:
        tx=''.join(x.text or '' for x in els[j].iter(qn('w:t'))).strip()
        if tx.startswith(('Table ','Figures','Figure ')) : break
        ex.append(els[j]); j+=1
    for e in [cap,t]+ex:
        sect.addprevious(copy.deepcopy(e))
    nd.save(PK+rf'\Tables\Table_{i}.docx')
# ---------- figures ----------
FM={'Figure_1_PRISMA.png':'Figure_1_PRISMA_flow_diagram.png','forest_LOS_DC_vs_FC.png':'Figure_2_Forest_stay_DC_vs_FC.png','forest_LOS_SL_vs_FC.png':'Figure_3_Forest_stay_SL_vs_FC.png','forest_VD_SL_vs_FC.png':'Figure_4_Forest_ventilator_days_SL_vs_FC.png','Figure_Harvest_DC_vs_FC.png':'Figure_6_Harvest_plot_DC_vs_FC.png','Figure_Harvest_SL_vs_FC.png':'Figure_7_Harvest_plot_SL_vs_FC.png','Figure_ROBINS_I.png':'Figure_5_Risk_of_bias_ROBINS-I.png'}
SM={'forest_VD_DC_vs_FC.png':'Figure_S4_Forest_ventilator_days_DC_vs_FC.png','forest_FF_DC_vs_FC.png':'Figure_S5a_Forest_feeds_DC_vs_FC.png','forest_FF_SL_vs_FC.png':'Figure_S5b_Forest_feeds_SL_vs_FC.png','forest_PN_DC_vs_FC.png':'Figure_S6a_Forest_PN_DC_vs_FC.png','forest_PN_SL_vs_FC.png':'Figure_S6b_Forest_PN_SL_vs_FC.png','forest_SEPSIS_DC_vs_FC.png':'Figure_S7a_Forest_sepsis_DC_vs_FC.png','forest_SEPSIS_SL_vs_FC.png':'Figure_S7b_Forest_sepsis_SL_vs_FC.png','forest_DEATH_DC_vs_FC.png':'Figure_S7c_Forest_mortality_DC_vs_FC.png','forest_NEC_DC_vs_FC.png':'Figure_S7d_Forest_NEC_DC_vs_FC.png','forest_HERNIA_DC_vs_FC.png':'Figure_S7e_Forest_hernia_DC_vs_FC.png','forest_HERNIA_SL_vs_FC.png':'Figure_S7f_Forest_hernia_SL_vs_FC.png','forest_subgroup_LOS_population.png':'Figure_S8a_Subgroup_stay_population.png','forest_subgroup_LOS_design.png':'Figure_S8b_Subgroup_stay_design.png','forest_subgroup_VD_population.png':'Figure_S8c_Subgroup_ventilation_population.png','forest_subgroup_VD_design.png':'Figure_S8d_Subgroup_ventilation_design.png','funnel_LOS_DC_vs_FC.png':'Figure_S9a_Funnel_stay_DC_vs_FC.png','leaveoneout_LOS_DC_vs_FC.png':'Figure_S9b_Leave_one_out_stay_DC_vs_FC.png','nma_graph_LOS.png':'Figure_S1a_Network_graph_stay.png','nma_forest_LOS.png':'Figure_S1b_NMA_forest_stay.png','nma_forest_VD.png':'Figure_S1c_NMA_forest_ventilation.png','nma_forest_PN.png':'Figure_S1d_NMA_forest_PN.png','nma_forest_FF.png':'Figure_S1e_NMA_forest_feeds.png'}
for a,b in FM.items(): shutil.copy2(os.path.join(FD,a),os.path.join(PK,'Figures',b))
shutil.copy2(os.path.join(R,'PRISMA Gastroschisis Closure - Draft.docx'),os.path.join(PK,'Figures','Figure_1_PRISMA_flow_diagram_editable.docx'))
for a,b in SM.items(): shutil.copy2(os.path.join(FD,a),os.path.join(PK,'Supplementary',b))
L=[('Figure 1','PRISMA 2020 flow diagram, drawn on the PRISMA template.'),('Figure 6','Harvest plot of delayed closure after a silo (DC) against fascial closure (FC) by direction of effect. Bar height shows risk of bias and letters identify studies.'),('Figure 7','Harvest plot of sutureless closure (SL) against fascial closure (FC) by direction of effect.'),('Figure 2','Length of hospital stay after delayed silo-based closure (DC) compared with fascial closure (FC). Random-effects meta-analysis with Hartung-Knapp confidence interval. The red bar shows the 95% prediction interval. Positive differences mean a longer stay after DC.'),('Figure 3','Length of hospital stay after sutureless closure (SL) compared with fascial closure (FC). Studies of flap and plastic closure were left out of the primary analysis. Negative differences mean a shorter stay after SL.'),('Figure 4','Ventilator days after sutureless closure (SL) compared with fascial closure (FC). Negative differences mean fewer ventilator days after SL.'),('Figure 5','Risk of bias of the 32 non-randomized studies assessed with ROBINS-I. D1 confounding, D2 selection of participants, D3 classification of interventions, D4 deviations from intended interventions, D5 missing data, D6 measurement of outcomes, D7 selection of the reported result.')]
d=newdoc(); P(d,'Figure legends',bold=True,size=13)
for a,b in L: P(d,f'{a}. {b}')
P(d,'File names. Figures are provided as separate PNG files at 300 dpi in the Figures folder, one file per figure.',size=10)
d.save(PK+r'\Figures\Figure_Legends.docx')
d=newdoc(); P(d,'Supplementary figure legends',bold=True,size=13)
legs=[('Figure S1a to S1e','Network meta-analysis. S1a, network of evidence for length of stay. S1b to S1e, network estimates against fascial closure for stay, ventilator days, parenteral nutrition and time to full feeds.'),('Figure S4','Ventilator days, DC versus FC.'),('Figure S5a, S5b','Time to full enteral feeds, DC versus FC and SL versus FC.'),('Figure S6a, S6b','Days of parenteral nutrition, DC versus FC and SL versus FC.'),('Figure S7a to S7f','Binary outcomes. Sepsis (DC and SL versus FC), mortality, necrotizing enterocolitis and hernia.'),('Figure S8a to S8d','Subgroup analyses of stay and ventilator days by population (simple gastroschisis only or not) and by design.'),('Figure S9a, S9b','Funnel plot and leave-one-out analysis for length of stay, DC versus FC.')]
for a,b in legs: P(d,f'{a}. {b}')
d.save(PK+r'\Supplementary\Supplementary_Figure_Legends.docx')
# ---------- supplementary documents copied ----------
for f in ('Supplementary_Material_Gastroschisis_Closure.docx','Supplementary_Extraction_Workbook.xlsx','Supplementary Table S1 S2 Gastroschisis Closure.docx','Analysis Plan Pairwise Meta-analysis Gastroschisis.docx','Laporan Uji Boolean Gastroschisis.docx','PRISMA Flow Diagram Gastroschisis Closure.docx'):
    shutil.copy2(os.path.join(R,f),os.path.join(PK,'Supplementary',f))
shutil.copy2(AN+r'\ROBINS_I_judgements.csv',PK+r'\Supplementary\ROBINS_I_judgements.csv'); shutil.copy2(AN+r'\GRADE_table.csv',PK+r'\Supplementary\GRADE_table.csv')
shutil.copytree(R+r'\Scripts',PK+r'\Supplementary\Scripts',dirs_exist_ok=True)
# ---------- checklists ----------
PR=[('1','Title','Identify the report as a systematic review','Title page, manuscript title','Reported'),('2','Abstract','Structured summary per PRISMA 2020 for Abstracts','Abstract','Reported'),('3','Introduction, rationale','Describe the rationale in the context of existing knowledge','Introduction, paragraphs 1 and 2','Reported'),('4','Introduction, objectives','State the objectives or questions','Introduction, paragraph 3','Reported'),('5','Methods, eligibility criteria','Specify inclusion and exclusion criteria and how studies were grouped','Methods, paragraph 1','Reported'),('6','Information sources','List databases, registers and other sources with search dates','Methods, paragraph 2, Table S1','Reported, counts for four databases pending'),('7','Search strategy','Present full search strategies for all sources','Table S1, Boolean test report','Reported'),('8','Selection process','Describe how reviewers screened records and whether independent','Methods, paragraph 3','Pending author statement (dual screening, kappa)'),('9','Data collection process','Describe how data were collected, whether independent, contact with authors','Methods, paragraph 3','Reported, author contact not done, second check pending'),('10a','Data items, outcomes','List and define outcomes and time frames','Methods, paragraph 1','Reported'),('10b','Data items, other variables','List other variables sought and assumptions','Methods, paragraph 3, extraction workbook','Reported'),('11','Study risk of bias assessment','Specify tools and reviewers','Methods, paragraph 5','Pending second rater'),('12','Effect measures','Specify effect measures for each outcome','Methods, paragraph 6','Reported'),('13a','Synthesis methods, eligibility for syntheses','Describe how studies were grouped for each synthesis','Methods, paragraphs 1, 6','Reported'),('13b','Synthesis methods, data preparation','Describe data conversions and missing summary statistics','Methods, paragraph 4','Reported'),('13c','Synthesis methods, tabulation','Describe methods to tabulate or display results','Methods, Tables 1 to 3, Figures 2 to 5','Reported'),('13d','Synthesis methods, models','Describe synthesis methods, heterogeneity model and software','Methods, paragraphs 6 and 8','Reported'),('13e','Synthesis methods, heterogeneity','Describe methods to explore heterogeneity','Methods, paragraph 7','Reported'),('13f','Synthesis methods, sensitivity','Describe sensitivity analyses','Methods, paragraph 7, Table 3','Reported'),('14','Reporting bias assessment','Describe methods to assess reporting bias','Methods, paragraph 7 (funnel plot, Egger)','Reported'),('15','Certainty assessment','Describe methods to assess certainty','Methods, paragraph 5','Reported'),('16a','Study selection','Describe search and selection results with a flow diagram','Results, paragraph 1, Figure 1','Pending database counts'),('16b','Study selection, excluded','Cite studies that appeared to meet criteria but were excluded','Table S3, Table S2','Reported'),('17','Study characteristics','Cite each included study and present characteristics','Table 1','Reported'),('18','Risk of bias in studies','Present risk of bias assessments','Results, Figure 5, Table S5','Reported, provisional'),('19','Results of individual studies','Present summary statistics and effect estimates for each study','Figures 2 to 4, S4 to S7, workbook','Reported'),('20a','Results of syntheses, characteristics','Summarise characteristics and risk of bias among contributing studies','Results, Table 1','Reported'),('20b','Results of syntheses, results','Present results of all syntheses with CI and prediction intervals','Results, Table 2, Figures 2 to 4','Reported'),('20c','Results of syntheses, heterogeneity','Present investigations of heterogeneity','Results, Figures S8, S9','Reported'),('20d','Results of syntheses, sensitivity','Present sensitivity analyses','Results, Table 3, Table S4','Reported'),('21','Reporting biases','Present assessments of risk of bias due to missing results','Results, funnel plot (Figure S9a)','Reported'),('22','Certainty of evidence','Present certainty for each outcome','Results, Table 2','Reported'),('23a','Discussion, general interpretation','Provide a general interpretation in the context of other evidence','Discussion, paragraphs 1 to 3','Reported'),('23b','Discussion, limitations of evidence','Discuss limitations of the evidence','Discussion, paragraph 5','Reported'),('23c','Discussion, limitations of review','Discuss limitations of the review processes','Discussion, paragraph 5','Reported'),('23d','Discussion, implications','Discuss implications for practice, policy and research','Discussion, paragraph 6','Reported'),('24a','Registration and protocol','Provide registration information','Methods, paragraph 1, title page','Pending PROSPERO amendment'),('24b','Registration, protocol access','Indicate where the protocol can be accessed','Analysis plan file','Reported'),('24c','Registration, amendments','Describe amendments to information in the registration','Methods, deviations paragraph','Pending author wording'),('25','Support','Describe sources of financial or non-financial support','Declarations','Pending author statement'),('26','Competing interests','Declare competing interests','Declarations','Pending author statement'),('27','Availability of data, code and materials','Report which items are publicly available','Declarations, Supplementary Material','Reported, archive DOI pending')]
d=newdoc(True); P(d,'PRISMA 2020 checklist',bold=True,size=13); P(d,'Page, M.J. et al. BMJ 2021;372:n71. doi:10.1136/bmj.n71. Locations refer to sections of the main text because page numbers are set at submission.',size=9)
T(d,['Item','Topic','Requirement (short)','Location in this submission','Status'],[[a,b,c,e,f if 'ending' not in f else '«'+f+'»'] for a,b,c,e,f in PR],[1.4,4.6,8.0,6.0,4.8],size=8)
d.save(PK+r'\Checklists\PRISMA_2020_Checklist.docx')
PS=[('1','Database name','Name each database and the platform or provider','Methods, paragraph 2, Table S1','Reported'),('2','Multi-database searching','State if a single search string was used across databases','Table S1 (translated strings per database)','Reported'),('3','Study registries','List registries searched','Table S1 (ClinicalTrials.gov)','Reported, WHO ICTRP not searched'),('4','Online resources and browsing','Describe websites and journals browsed','Table S1 (eight Sinta journals and two surgery journals via Crossref metadata)','Reported'),('5','Citation searching','Report citation searching','Not done','Not done, stated as limitation'),('6','Contacts','Report contact with experts or authors','Not done','Not done, stated as limitation'),('7','Other methods','Describe any other search methods','Hand-search via DOI metadata','Reported'),('8','Full search strategies','Provide full strategies for every source','Table S1, Boolean test report','Reported'),('9','Limits and restrictions','State limits applied','None (language, date, design)','Reported'),('10','Search filters','State filters used','None','Reported'),('11','Prior work','Say if search strategies were adapted from earlier work','Methods, paragraph 2, Boolean report (earlier version)','Reported'),('12','Updates','Report updates of the search','Single search date 22 November 2026','Reported'),('13','Dates of searches','Report dates for each source','Table S1','Reported'),('14','Deduplication','Describe how duplicates were removed','Table S1 note','Pending counts'),('15','Total records','Report total records identified and after deduplication','Figure 1','Pending database counts'),('16','Peer review of search','State whether the strategy was peer reviewed','Recall check against 64 known records and 7 independent reports','No PRESS review, stated as limitation')]
d=newdoc(True); P(d,'PRISMA-S checklist for reporting literature searches',bold=True,size=13); P(d,'Rethlefsen, M.L. et al. Syst Rev 2021;10:39. doi:10.1186/s13643-020-01542-z.',size=9)
T(d,['Item','Topic','Requirement (short)','Location','Status'],[[a,b,c,e,f if 'ending' not in f else '«'+f+'»'] for a,b,c,e,f in PS],[1.4,4.2,8.0,6.2,5.0],size=8)
d.save(PK+r'\Checklists\PRISMA-S_Checklist.docx')
# ---------- declarations ----------
d=newdoc(); P(d,'Declaration of interests',bold=True,size=13)
P(d,'«[Choose one and confirm for each author.]» The authors declare that they have no known competing financial interests or personal relationships that could have appeared to influence the work reported in this paper.')
P(d,'Authors. '+', '.join(AUTH)); P(d,'Signature and date for each author. «[to be completed]»')
d.save(PK+r'\Declarations\Declaration_of_Interests.docx')
d=newdoc(True); P(d,'Author contributions (CRediT taxonomy)',bold=True,size=13)
roles=['Conceptualization','Methodology','Software','Formal analysis','Investigation','Data curation','Writing, original draft','Writing, review and editing','Visualization','Supervision','Project administration']
T(d,['Role']+AUTH,[[r]+['«[confirm]»']*5 for r in roles],[4.6,4.0,4.0,4.0,4.0,4.0],size=8)
P(d,'Each author must confirm the roles above. Roles are not assigned on behalf of the authors.',size=9)
d.save(PK+r'\Declarations\Author_Contributions_CRediT.docx')
d=newdoc(); P(d,'Author agreement',bold=True,size=13)
P(d,f'Manuscript. {TITLE}')
P(d,'We confirm that this manuscript is original, has not been published, and is not under consideration elsewhere. All authors have read and approved the final version and the order of authorship. We have disclosed all relevant financial and non-financial interests.')
for a in AUTH: P(d,f'{a}    Signature ____________________    Date ____________')
d.save(PK+r'\Declarations\Author_Agreement.docx')
d=newdoc(); P(d,'Statement on the use of AI tools and on data',bold=True,size=13)
P(d,'«[The authors must complete this statement in the wording required by the target journal. It should say which AI tools, if any, were used for data extraction, analysis scripts, drafting or editing, what they were used for, and that the authors checked every extracted value and the final text against the source reports and take responsibility for the content.]»')
P(d,'Data and code. The extraction workbook, analysis datasets, R scripts and search scripts are in the Supplementary folder. Analyses used R 4.6.2 with a fixed random seed of 20261123. «[A public archive with a DOI will be created at submission.]»')
d.save(PK+r'\Declarations\AI_Use_and_Data_Statement.docx')
# ---------- README ----------
idx='''# Submission package, gastroschisis closure systematic review

Built 24 Nov 2026. Items highlighted yellow in the Word files need the authors.

01_Title_Page.docx, 02_Cover_Letter.docx, 03_Manuscript_Blinded_Main_Text.docx (no author names, no figures), 04_Highlights.docx, 05_Abstract.docx
Tables/ Table_1 to Table_4 (one file each, landscape)
Figures/ Figure_1 to Figure_7 (one PNG per figure, 300 dpi) and Figure_Legends.docx
Supplementary/ Supplementary_Material (tables S3 to S6, all supplementary figures), Table S1 and S2 (search), Analysis Plan, Boolean test report, PRISMA flow docx, Extraction workbook, ROBINS-I and GRADE csv, every supplementary figure as its own PNG, Supplementary_Figure_Legends, Scripts/
Checklists/ PRISMA_2020_Checklist, PRISMA-S_Checklist
Declarations/ Declaration_of_Interests, Author_Contributions_CRediT, Author_Agreement, AI_Use_and_Data_Statement
Full manuscript with title page and embedded figures is in the parent folder (Manuscript_Gastroschisis_Closure_PairwiseMA.docx).

Open items before submission
1. Counts for Scopus, Cochrane Library and EBSCOhost, deduplication and screening numbers (PRISMA, Table S1, Figure 1).
2. PROSPERO amendment and the deviations paragraph.
3. Dual screening, extraction check, kappa, second rater for ROBINS-I, RoB 2 and GRADE.
4. Funding, competing interests, CRediT roles, ORCID iDs, acknowledgments, AI-use statement, signatures.
5. Four hand-search records (Journal of Neonatal Surgery) without accessible full text.
6. Choose the journal and reformat to its instructions.
7. Open every Word file once in Word and check layout.
'''
open(PK+r'\README_Package_Index.md','w',encoding='utf-8').write(idx)
print('package ok',abs_w,main_w,nref)
