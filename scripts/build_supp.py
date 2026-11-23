import csv,json,os,re,docx
from docx.shared import Pt,Cm,Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from openpyxl import Workbook
from openpyxl.styles import Font,PatternFill,Alignment
from openpyxl.utils import get_column_letter
H0=os.path.dirname(os.path.abspath(__file__))
OUT=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR'; AN=OUT+r'\Analysis'
rd=lambda p:list(csv.DictReader(open(p,encoding='utf-8-sig')))
DEC=rd(os.path.join(H0,'decisions.csv')); RES=rd(AN+r'\results_pairwise_and_sensitivity.csv'); ROB=rd(AN+r'\ROBINS_I_judgements.csv'); GR=rd(AN+r'\GRADE_table.csv')
CC=rd(AN+r'\analysis_dataset_continuous.csv'); BB=rd(AN+r'\analysis_dataset_binary.csv'); ARMS=rd(os.path.join(H0,'arms.csv'))
REFS=json.load(open(os.path.join(H0,'refs.json'),encoding='utf-8'))
S2=docx.Document(OUT+r'\Supplementary Table S1 S2 Gastroschisis Closure.docx').tables[1]
S2rows=[[c.text for c in r.cells] for r in S2.rows]
# ---------------- Supplementary docx ----------------
D=docx.Document(); s=D.sections[0]; s.page_width=Cm(21.59); s.page_height=Cm(27.94)
for a in ('left_margin','right_margin','top_margin','bottom_margin'): setattr(s,a,Cm(2.2))
st=D.styles['Normal']; st.font.name='Times New Roman'; st.font.size=Pt(10); st.element.rPr.rFonts.set(qn('w:eastAsia'),'Times New Roman')
def para(t,bold=False,size=None,after=6):
    p=D.add_paragraph(); r=p.add_run(t); r.bold=bold
    if size: r.font.size=Pt(size)
    p.paragraph_format.space_after=Pt(after); return p
def tbl(head,rows,widths,size=8):
    t=D.add_table(rows=1,cols=len(head)); t.autofit=False
    b=OxmlElement('w:tblBorders')
    for e in ('top','bottom','insideH'):
        x=OxmlElement('w:'+e); x.set(qn('w:val'),'single'); x.set(qn('w:sz'),'4'); x.set(qn('w:color'),'000000'); b.append(x)
    t._tbl.tblPr.append(b)
    for i,h in enumerate(head):
        c=t.rows[0].cells[i]; c.width=Cm(widths[i]); r=c.paragraphs[0].add_run(h); r.bold=True; r.font.size=Pt(size)
    for row in rows:
        cs=t.add_row().cells
        for i,v in enumerate(row):
            cs[i].width=Cm(widths[i]); r=cs[i].paragraphs[0].add_run(str(v)); r.font.size=Pt(size)
    for row in t.rows:
        for c in row.cells:
            for p in c.paragraphs: p.paragraph_format.space_after=Pt(1)
    D.add_paragraph()
def fig(path,cap,w=6.4):
    if not os.path.exists(path): return
    p=D.add_paragraph(); p.alignment=WD_ALIGN_PARAGRAPH.CENTER; p.add_run().add_picture(path,width=Inches(w)); para(cap,size=9,after=10)
para('Supplementary Material',bold=True,size=14)
para('Silo-based delayed closure and sutureless closure compared with fascial closure in neonates with gastroschisis, a systematic review and meta-analysis',size=11)
para('Contents. Table S1 and S2 (search strategies and hand-searched records) are in the separate file Supplementary Table S1 S2 Gastroschisis Closure. The analysis plan is in the file Analysis Plan Pairwise Meta-analysis Gastroschisis. This document holds Tables S3 to S6 and Figures S1 to S9. The extraction workbook (Supplementary_Extraction_Workbook.xlsx) holds every extracted value with its source table, the analysis datasets, the results and the scripts are in the Scripts folder.')
# Table S3
para('Supplementary Table S3. Decision for each eligible report.',bold=True)
rows=[[d['study'],d['year'],d['pmid'],d['decision'],d['reason']] for d in sorted(DEC,key=lambda x:(int(x['year']),x['study']))]
tbl(['Study','Year','PMID','Decision','Reason'],rows,[2.6,1.0,1.8,3.6,8.2])
# Table S4 sensitivity
para('Supplementary Table S4. Primary and sensitivity analyses.',bold=True)
rows=[]
for r in RES:
    rows.append([r['outcome'],r['contrast'].replace('_vs_',' vs '),r['analysis'],r['k'],r['n'],r['est'],f"{r['lo']} to {r['hi']}",r['pval'],r['I2'],(f"{r['pi_lo']} to {r['pi_hi']}" if r['pi_lo'] not in ('','NA') else '')])
tbl(['Outcome','Comparison','Analysis','k','n','Estimate','95% CI','P','I2 %','95% PI'],rows,[1.4,1.6,4.6,0.7,1.0,1.4,2.4,1.0,1.0,2.4],size=7)
para('Estimates are mean differences in days (DC or SL minus FC) for continuous outcomes and risk ratios for binary outcomes. The Wan analysis leaves out Hawkins because its parenteral nutrition range reaches 1718 days.',size=9)
# Table S5 ROBINS-I
para('Supplementary Table S5. ROBINS-I judgements for non-randomized studies (L low, M moderate, S serious).',bold=True)
rows=[[r['Study']]+[r[k] for k in ('D1','D2','D3','D4','D5','D6','D7','Overall')] for r in ROB]
tbl(['Study','D1 confounding','D2 selection','D3 classification','D4 deviations','D5 missing data','D6 measurement','D7 reporting','Overall'],rows,[3.2,1.6,1.6,1.8,1.6,1.8,1.8,1.6,1.4],size=8)
para('RoB 2 for the three trials. Pastor 2008, low risk of bias. Bruzoni 2017, some concerns (allocation concealment not described, unblinded outcome assessment). Poola 2019, some concerns (small trial stopped early, unblinded). Judgements are provisional until the second reviewer has rated each study.',size=9)
# Table S6 conversion log
para('Supplementary Table S6. Source of the mean and standard deviation used for each study arm.',bold=True)
how={'0':'reported mean and SD','1':'reported mean with range (SD from range)','2':'Box-Cox from median with range or IQR','3':'Wan formula','':''}
import collections
cnt=collections.defaultdict(lambda:collections.Counter())
for r in CC:
    for k in ('e_how','c_how'):
        v=str(r[k]).split('.')[0] if r[k] not in ('','NA') else ''
        cnt[r['label']][how.get(v,v)]+=1
rows=[[k,'; '.join(f'{a} ({b})' for a,b in v.items())] for k,v in sorted(cnt.items())]
tbl(['Study','Conversion (number of arm-level entries)'],rows,[4.0,13.4])
# figures
FD=AN+r'\forest'
para('Supplementary figures',bold=True,size=12)
fig(FD+r'\nma_graph_LOS.png','Figure S1a. Network of evidence for length of stay.',3.2)
fig(FD+r'\nma_forest_LOS.png','Figure S1b. Network estimates against fascial closure, length of stay.')
fig(FD+r'\nma_forest_VD.png','Figure S1c. Network estimates against fascial closure, ventilator days.')
fig(FD+r'\nma_forest_PN.png','Figure S1d. Network estimates against fascial closure, parenteral nutrition.')
fig(FD+r'\nma_forest_FF.png','Figure S1e. Network estimates against fascial closure, time to full feeds.')
para('Table S7. The GRADE evidence profile is Table 2 of the main text and the sheet GRADE of the extraction workbook, in table form.',size=10)

caps={'forest_VD_DC_vs_FC.png':'Figure S4. Ventilator days, DC versus FC.','forest_FF_DC_vs_FC.png':'Figure S5a. Time to full feeds, DC versus FC.','forest_FF_SL_vs_FC.png':'Figure S5b. Time to full feeds, SL versus FC.','forest_PN_DC_vs_FC.png':'Figure S6a. Parenteral nutrition, DC versus FC.','forest_PN_SL_vs_FC.png':'Figure S6b. Parenteral nutrition, SL versus FC.','forest_SEPSIS_DC_vs_FC.png':'Figure S7a. Sepsis, DC versus FC.','forest_SEPSIS_SL_vs_FC.png':'Figure S7b. Sepsis, SL versus FC.','forest_DEATH_DC_vs_FC.png':'Figure S7c. Mortality, DC versus FC.','forest_NEC_DC_vs_FC.png':'Figure S7d. Necrotizing enterocolitis, DC versus FC.','forest_HERNIA_DC_vs_FC.png':'Figure S7e. Hernia, DC versus FC.','forest_HERNIA_SL_vs_FC.png':'Figure S7f. Hernia, SL versus FC.','forest_subgroup_LOS_population.png':'Figure S8a. Length of stay by population (DC versus FC).','forest_subgroup_LOS_design.png':'Figure S8b. Length of stay by design (DC versus FC).','forest_subgroup_VD_population.png':'Figure S8c. Ventilator days by population (DC versus FC).','forest_subgroup_VD_design.png':'Figure S8d. Ventilator days by design (DC versus FC).','funnel_LOS_DC_vs_FC.png':'Figure S9a. Funnel plot of length of stay, DC versus FC.','leaveoneout_LOS_DC_vs_FC.png':'Figure S9b. Leave-one-out analysis of length of stay, DC versus FC.'}
for f,c in caps.items(): fig(FD+'\\'+f,c)
D.save(OUT+r'\Supplementary_Material_Gastroschisis_Closure.docx')
# ---------------- extraction workbook ----------------
wb=Workbook(); hf=PatternFill('solid',fgColor='1F3864')
def sheet(name,rows,widths=None,first=False):
    ws=wb.active if first else wb.create_sheet()
    ws.title=name
    for r in rows: ws.append(list(r))
    for c in ws[1]: c.font=Font(bold=True,color='FFFFFF'); c.fill=hf; c.alignment=Alignment(wrap_text=True,vertical='top')
    for i in range(1,ws.max_column+1): ws.column_dimensions[get_column_letter(i)].width=(widths[i-1] if widths and i<=len(widths) else 16)
    ws.freeze_panes='A2'; return ws
sheet('README',[['Item','Description'],['Purpose','Extraction and analysis data for the gastroschisis closure systematic review (pairwise meta-analysis).'],['Arms_extracted','Every arm-level value as reported, with source table and note. Pair format, experimental arm = e_, comparator = c_. stat_type gives the original form (mean and SD, median with range or IQR, events).'],['Analysis_continuous / Analysis_binary','Datasets after conversion and combination, as used by run_analysis.R (Box-Cox conversion, seed 20261123).'],['Results','Primary and sensitivity results.'],['ROBINS_I and GRADE','Judgements and certainty ratings, provisional until second-reviewer check.'],['Decisions','Per-report decision and reason.'],['HandSearch','Hand-searched journal records not retrieved by the database searches, with decisions.'],['References','Reference list with DOIs checked against Crossref or Europe PMC.']],[26,110],first=True)
sheet('Decisions',[['Study','Year','PMID','Decision','Reason']]+[[d['study'],d['year'],d['pmid'],d['decision'],d['reason']] for d in DEC],[18,8,12,34,80])
cols=list(ARMS[0].keys()); sheet('Arms_extracted',[cols]+[[a[c] for c in cols] for a in ARMS],[16]*len(cols))
c1=list(CC[0].keys()); sheet('Analysis_continuous',[c1]+[[a[c] for c in c1] for a in CC])
c2=list(BB[0].keys()); sheet('Analysis_binary',[c2]+[[a[c] for c in c2] for a in BB])
c3=list(RES[0].keys()); sheet('Results',[c3]+[[a[c] for c in c3] for a in RES],[44,10,12,6,8,10,10,10,8,10,10,10])
c4=list(ROB[0].keys()); sheet('ROBINS_I',[c4]+[[a[c] for c in c4] for a in ROB])
c5=list(GR[0].keys()); sheet('GRADE',[c5]+[[a[c] for c in c5] for a in GR],[10,34,22,12,22,8,14,14,12,14,16,14,14])
sheet('HandSearch',S2rows,[24,90,90])
sheet('References',[['Key','DOI','Reference']]+[[k,v['doi'],v['ref']] for k,v in REFS.items()],[12,30,140])
wb.save(OUT+r'\Supplementary_Extraction_Workbook.xlsx')
print('ok')
