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
        out.append(str(nums[i]) if j==i else (f'{nums[i]},{nums[j]}' if j==i+1 else f'{nums[i]}-{nums[j]}')); i=j+1
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

