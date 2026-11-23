import docx,copy,os,json,re,zipfile,collections,sys
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
sys.path.insert(0,r'C:\Users\allam\AppData\Local\Temp\claude\649a80dfb0f12dc2\0fc7ff3f-42f6-460c-a47c-9cf0292298bd\scratchpad\gs')
import cfg
SC=r'C:\Users\allam\AppData\Local\Temp\claude\a7673535580505a5\0fc7ff3f-42f6-460c-a47c-9cf0292298bd\scratchpad'
OUT=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR'
SRC_S=r'C:\Users\allam\Downloads\Strabismus VR AR Dichoptic\Supplementary Table S1 S2 Strabismus VR AR Dichoptic.docx'
SRC_P=r'C:\Users\allam\Downloads\Strabismus VR AR Dichoptic\PRISMA Flow Diagram Strabismus VR AR Dichoptic.docx'
DATE=cfg.DATE
CP=os.path.join(OUT,'COUNTS_TO_FILL.json')
CNT=json.load(open(CP,encoding='utf-8')) if os.path.exists(CP) else {}
def F(k):
    v=CNT.get(k)
    return f'{v:,}' if isinstance(v,int) and not isinstance(v,bool) else '___'
def FY(k):
    return (F(k),F(k)=='___')
DBS=['scopus','cochrane','ebsco']
db_known=all(isinstance(CNT.get(k),int) for k in DBS)
db_total=(1912+1941+sum(CNT[k] for k in DBS)) if db_known else None
hand=json.load(open(os.path.join(SC,'hand_final.json'),encoding='utf-8'))   # [journal,doi,title,year,in_db]
jcount=collections.Counter(r[0] for r in hand)
hand_full=hand
nov=[r for r in hand_full if not r[4]]
# ---- screening decisions for the 61 hand-searched records not found in databases (index = order in nov) ----
A='Single-arm report or case series; no comparison of closure strategies.'
B='Not a clinical comparison of closure strategies (review, history, epidemiology, prenatal, experimental, educational or non-closure topic).'
C='Wrong population or setting (general neonatal surgery, omphalocele, or mixed anterior abdominal wall defects without a closure comparison).'
D='Duplicate of a database record (same study, different DOI).'
PEND='Full text or abstract not accessible; assessment pending.'
dec={}
for i in (2,4,6,8,9,10,12,14,16,17,18,19,20,21,22,23,31,34,40,41,42,45,46,49,60): dec[i]=('X',A)
for i in (1,5,7,11,13,15,24,25,26,28,29,30,32,33,37,38,43,44,47,53,55,58,59,61): dec[i]=('X',B)
for i in (36,39,50,51): dec[i]=('X',C)
dec[35]=('D',D)
for i in (3,27,48,52,54,56): dec[i]=('P',PEND)
dec[57]=('I','Retrospective multicentre cohort of complex gastroschisis, primary closure versus silo (234 neonates). Only means and P values are available; group sizes and standard deviations must be requested from the authors before it can be pooled.')
SEL=['Journal of Neonatal Surgery','Journal of Pediatric Surgery Case Reports']
sel_nov=[i for i,r in enumerate(nov,1) if r[0] in SEL]
dec={i:dec[i] for i in sel_nov}
hand=[r for r in hand_full if r[0] in SEL]
jcount=collections.Counter(r[0] for r in hand)
assert all(i in dec for i in sel_nov)
cnt=collections.Counter(v[0] for v in dec.values())
n_dup_title=cnt['D']; n_x=cnt['X']; n_p=cnt['P']; n_i=cnt['I']
n_ident=len(hand); n_db=sum(1 for r in hand if r[4]); n_unique=len(sel_nov)
SIN=json.load(open(os.path.join(SC.replace('ext',''),'sinta_scan.json'),encoding='utf-8')) if os.path.exists(os.path.join(SC.replace('ext',''),'sinta_scan.json')) else json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'sinta_scan.json'),encoding='utf-8'))
SIN=[(n,l,t,h) for n,l,t,h,e in SIN if len(h)>0]
SINREC=[(n,l,doi,ti,y) for n,l,t,h in SIN for doi,ti,y in h]
n_sin=len(SINREC)
SD={'10.14238/pi64.3.2024.264-9':'No comparison of closure strategies. Cohort of 42 neonates after closure surgery, exposure was age at closure and outcome was mortality.','10.14238/sp14.6.2013.341-4':'Wrong population. Mixed gastrointestinal anomalies (gastroschisis 6.3%), no closure comparison.','10.20473/mog.v34i12026.84-98':'Not a clinical comparison of closure strategies. Case report and review of limb-body wall complex.','10.15562/ism.v11i3.730':'Single-arm case series of five infants after primary closure, no comparator.','10.15562/medicina.v49i2.65':'Not a closure comparison. Thermoregulation management in neonates.','10.35790/ecl.v10i2.39161':'Wrong population. Postoperative outcome of mixed congenital anomalies.','10.35790/ecl.v11i3.46617':'No comparison of closure strategies. Eighteen infants, factors associated with outcome, all died.','10.35790/msj.v3i2.39122':'Not a clinical comparison. Review of initial management by general practitioners.','10.26891/jik.v14i2.2020.121-124':'Single case report of staged closure, no comparator.'}
assert all(r[2] in SD for r in SINREC),[r[2] for r in SINREC if r[2] not in SD]
n_ident+=n_sin; n_unique+=n_sin; n_x+=n_sin
print('identified',n_ident,'db-matched',n_db,'unique',n_unique,'dup',n_dup_title,'excluded',n_x,'pending',n_p,'included',n_i)
json.dump({'ident':n_ident,'dbmatch':n_db,'unique':n_unique,'dup':n_dup_title,'excl':n_x,'pend':n_p,'incl':n_i,'jcount':jcount,'sinta':n_sin},open(os.path.join(SC,'hand_numbers.json'),'w'))
JABBR={'Journal of Pediatric Surgery':'JPS','Pediatric Surgery International':'PSI','European Journal of Pediatric Surgery':'EJPS','Seminars in Pediatric Surgery':'SemPS','Journal of Pediatric Surgery Case Reports':'JPSCR','African Journal of Paediatric Surgery':'AJPS','Journal of Indian Association of Pediatric Surgeons':'JIAPS','Journal of Neonatal Surgery':'JNS','World Journal of Pediatric Surgery':'WJPS','Annals of Pediatric Surgery':'APS'}
order=['Journal of Pediatric Surgery','Pediatric Surgery International','European Journal of Pediatric Surgery','Seminars in Pediatric Surgery','Journal of Pediatric Surgery Case Reports','African Journal of Paediatric Surgery','Journal of Indian Association of Pediatric Surgeons','Journal of Neonatal Surgery','World Journal of Pediatric Surgery','Annals of Pediatric Surgery']

# =============== S1 / S2 =================
d=docx.Document(SRC_S)
def set_text(cell,text,hl=False,bold=None):
    p=cell.paragraphs[0]; runs=p.runs
    for r in runs[1:]: r._r.getparent().remove(r._r)
    r=runs[0]; r.text=text
    if bold is not None: r.bold=bold
    if hl:
        r._r.get_or_add_rPr().append(OxmlElement('w:highlight')); r._r.rPr.find(qn('w:highlight')).set(qn('w:val'),'yellow')
    for extra in cell.paragraphs[1:]: extra._p.getparent().remove(extra._p)
def rebuild(tbl,rows):
    protos={k:copy.deepcopy(tbl.rows[i]._tr) for k,i in rows['protos'].items()}
    for r in list(tbl.rows)[1:]: tbl._tbl.remove(r._tr)
    for kind,cells in rows['data']:
        tr=copy.deepcopy(protos[kind]); tbl._tbl.append(tr); row=tbl.rows[-1]
        tcs=row.cells if kind!='section' else [row.cells[0]]
        for c,val in zip(tcs,cells):
            hl=False
            if isinstance(val,tuple): val,hl=val
            set_text(c,val,hl)
Y=lambda s:(s,True)
EBSCO='(TI('+cfg.j(cfg.P_TERMS)+') OR AB('+cfg.j(cfg.P_TERMS)+')) AND (TI('+cfg.j(cfg.I_TERMS)+') OR AB('+cfg.j(cfg.I_TERMS)+'))'
JSTR='(gastroschis* OR gastrochis* OR gastroskis* OR laparoschisis OR paraomphalocele) AND (closure OR repair OR silo OR silastic OR preformed OR sutureless OR umbilical cord OR staged OR reduction OR bianchi OR surgery OR surgical OR operative OR management OR treatment OR technique* OR flap OR bedside OR sutured OR plastic) -- title and abstract applied locally to DOI metadata from Crossref (by ISSN).'
data=[('section',['Databases']),
 ('data',['PubMed','1,912',DATE,cfg.PUBMED]),
 ('data',['Scopus',FY('scopus'),(DATE,False) if F('scopus')!='___' else Y('___'),cfg.SCOPUS]),
 ('data',['Cochrane Library',FY('cochrane'),(DATE,False) if F('cochrane')!='___' else Y('___'),cfg.COCHRANE]),
 ('data',['EBSCOhost (MEDLINE with Full Text)',FY('ebsco'),(DATE,False) if F('ebsco')!='___' else Y('___'),EBSCO]),
 ('data',['Europe PMC (includes medRxiv preprints)','1,941',DATE,cfg.EUROPEPMC]),
 ('sub',['Subtotal (databases)',((f'{db_total:,}',False) if db_known else Y('___')),'','Sum of the five databases above.']),
 ('section',['Registers']),
 ('data',['ClinicalTrials.gov','50',DATE,cfg.CTGOV]),
 ('sub',['Subtotal (registers)','50','','ClinicalTrials.gov only.']),
 ('section',['Hand-searched Indonesian journals (Sinta indexed, not indexed in the databases; DOI metadata via Crossref)'])]
JSTR_ID='(gastroschis* OR gastrochis* OR gastroskis* OR laparoschisis OR paraomphalocele) -- closure block omitted because the journals return few gastroschisis records (title and abstract applied locally to DOI metadata from Crossref, by ISSN).'
for n_,l_,t_,h_ in SIN: data.append(('data',[f'{n_} (Sinta {l_[1]})',str(len(h_)),DATE,JSTR_ID]))
data.append(('sub',['Subtotal (Indonesian Sinta journals)',str(n_sin),'','Sum of the eight journals above. Cermin Dunia Kedokteran, Indonesian Journal of Obstetrics and Gynecology Science and Ahmad Dahlan Medical Journal returned no record in Crossref and are not listed.']))
data.append(('section',['Additional hand-searched journals not well covered by PubMed or Europe PMC (DOI metadata via Crossref)']))
for jn in SEL: data.append(('data',[jn,str(jcount[jn]),DATE,JSTR]))
data+= [('sub',['Subtotal (hand-searching of journals)',str(n_ident),'','Sum of the eight Sinta journals and the two surgery journals above. Records already retrieved by the database searches were matched by DOI and not assessed again.']),
 ('sub',['Total',((f'{db_total+50+n_ident:,}',False) if db_known else Y('___')),'','Total records identified (databases + registers + hand-searching).']),
 ('sub',['Duplicate records removed',FY('dup'),'','Duplicates were removed from the database and register records by matching digital object identifiers and normalised titles. Hand-searched records that the database searches had already retrieved were matched by DOI and not assessed again.']),
 ('sub',['Records screened (title and abstract)',FY('screened'),'','Database and register records minus duplicates.'])]
rebuild(d.tables[0],{'protos':{'section':1,'data':2,'sub':8},'data':data})
# S2
S2=[]
S2=[('data',[n_+' (Sinta '+l_[1]+')',f'{ti_.strip()} ({y_}, doi:{d_})','Excluded at title and abstract. '+SD[d_]]) for n_,l_,d_,ti_,y_ in SINREC]
sortd=sorted(sel_nov,key=lambda i:(order.index(nov[i-1][0]) if nov[i-1][0] in order else 99,nov[i-1][3] or 0))
for i in sortd:
    r=nov[i-1]; k,reason=dec[i]
    tag={'X':'Excluded at title and abstract. ','D':'Removed as duplicate. ','P':'Pending. ','I':'Assessed in full; excluded for lack of arm-level data. '}[k]
    S2.append(('data',[r[0],f'{r[2].strip()} *({r[3]}, doi:{r[1]})*'.replace('*',''),tag+reason]))
for r in hand:
    if r[4]: S2.append(('data',[r[0],f'{r[2].strip()} ({r[3]}, doi:{r[1]})','Already retrieved by the database searches (duplicate), not assessed again.']))
rebuild(d.tables[1],{'protos':{'data':1},'data':S2})
ps=d.paragraphs
def settxt(p,text):
    p.runs[0].text=text
    for r in p.runs[1:]: r._r.getparent().remove(r._r)
settxt(ps[0],'Supplementary Table S1. Full search strategies for all databases, registers, and hand-searched journals.')
settxt(ps[1],'Counts for PubMed, Europe PMC, ClinicalTrials.gov, and the hand-searched journals were produced on the test date ('+DATE+') with the E-utilities, the Europe PMC REST API, ClinicalTrials.gov API v2, and Crossref (by ISSN), with the Boolean string applied locally to title and abstract for journals. Cells in yellow are the review team\u2019s own counts for sources that need a licensed or interactive session (Scopus, Cochrane Library, EBSCOhost); their strings were checked for syntax only. Journal abbreviations: JPS, Journal of Pediatric Surgery; PSI, Pediatric Surgery International; EJPS, European Journal of Pediatric Surgery; SemPS, Seminars in Pediatric Surgery; JPSCR, Journal of Pediatric Surgery Case Reports; AJPS, African Journal of Paediatric Surgery; JIAPS, Journal of Indian Association of Pediatric Surgeons; JNS, Journal of Neonatal Surgery; WJPS, World Journal of Pediatric Surgery; APS, Annals of Pediatric Surgery. Crossref carries abstracts for few records of some journals, so title-only matching was used for them.')
settxt(ps[3],'Supplementary Table S2. Hand-searched records not retrieved by the database searches, and screening decisions.')
settxt(ps[4],f'Eight Indonesian Sinta journals and two surgery journals that PubMed and Europe PMC cover poorly returned {n_ident} gastroschisis records. {n_db} had already been found by the database searches. Of the other {n_unique}, {n_x} were excluded on title and abstract, {n_p} await full-text access and {n_i} was assessed in full and excluded for lack of arm-level data. Decisions were made on title and, where Crossref or Europe PMC held one, abstract.')
try: d.save(os.path.join(OUT,'Supplementary Table S1 S2 Gastroschisis Closure.docx'))
except PermissionError:
    d.save(os.path.join(OUT,'Supplementary Table S1 S2 Gastroschisis Closure (UPDATED, close the open copy).docx')); print('S1S2 locked, saved alt name')

# =============== PRISMA =================
z=zipfile.ZipFile(SRC_P); x=z.read('word/document.xml').decode('utf8')

def _clone(m):
    p=m.group(0)
    extra=''.join(p.replace('E-Jurnal Medika Udayana (n = 2)',f'ZZJOURNAL{i} (n = 2)') for i in range(5,11))
    return p+extra
x=re.sub(r'<w:p[ >](?:(?!</w:p>).)*?E-Jurnal Medika Udayana \(n = 2\)(?:(?!</w:p>).)*?</w:p>',_clone,x,flags=re.S)
NUM=r'\(n[ \u00a0]=[ \u00a0]([\d,]+)\)'
hist=[]
def f(n): return f'{n:,}'
def rep(m):
    t=m.group(2); ctx=''.join(hist[-8:]); hist.append(t); new=t; t0=t
    sc={n_:len(h_) for n_,l_,t_,h_ in SIN}
    NM={'Paediatrica Indonesiana':'Paediatrica Indonesiana','Sari Pediatri':'Sari Pediatri','Majalah Obstetri & Ginekologi':'Majalah Obstetri dan Ginekologi','Intisari Sains Medis':'Intisari Sains Medis','Medicina (Jurnal Ilmiah Kedokteran Udayana)':'Medicina (Udayana)','Jurnal e-CliniC':'Jurnal e-CliniC','Medical Scope Journal':'Medical Scope Journal','Jurnal Ilmu Kedokteran (Journal of Medical Science)':'Jurnal Ilmu Kedokteran'}
    lines=[f'{NM[k]} (n = {v})' for k,v in sc.items()]
    for jn_ in SEL: lines.append(f'{jn_} (n = {jcount[jn_]})')
    new=re.sub(r'^Hand-searching of Sinta journals \(n = 33\)',f'Hand-searching of 10 journals (n = {n_ident})',new)
    for pat,i in [('Ophthalmologica Indonesiana \(n = 27\)',0),('Jurnal Kesehatan Andalas \(n = 2\)',1),('Cermin Dunia Kedokteran \(n = 2\)',2),('E-Jurnal Medika Udayana \(n = 2\)',3)]:
        new=re.sub(r'^\S\s*'+pat,'• '+lines[i],new)
    mz=re.match(r'^\S\s*ZZJOURNAL(\d+) \(n = 2\)',new)
    if mz: new='• '+lines[int(mz.group(1))-1]
    new=new.replace('Databases (n = 2,180)','Databases (n = '+(f'{db_total:,}' if db_known else '___')+')')
    new=re.sub(r'^\S\s*PubMed \(n = 398\)','\u2022 PubMed (n = 1,912)',new)
    new=re.sub(r'^\S\s*Scopus \(n = 819\)','\u2022 Scopus (n = '+F('scopus')+')',new)
    new=re.sub(r'^\S\s*Cochrane Library \(n = 51\)','\u2022 Cochrane Library (n = '+F('cochrane')+')',new)
    new=re.sub(r'^\S\s*EBSCOhost \(n = 341\)','\u2022 EBSCOhost (n = '+F('ebsco')+')',new)
    new=re.sub(r'^\S\s*ProQuest \(n = 82\)','@@DROP@@',new)
    new=re.sub(r'^\S\s*Europe PMC \(n = 489\)','\u2022 Europe PMC (n = 1,941)',new)
    new=new.replace('Registers (n = 14)','Registers (n = 50)')
    new=re.sub(r'^\S\s*ClinicalTrials.gov \(n = 14\)','\u2022 ClinicalTrials.gov (n = 50)',new)
    new=new.replace('Duplicate records removed  (n = 1,188)','Duplicate records removed  (n = '+F('dup')+')')
    new=new.replace('Inappropriate population ','Wrong population ').replace('Inappropriate population (','Wrong population (')
    new=new.replace('No postoperative VR, AR, or dichoptic training','No comparison of closure strategies')
    new=new.replace('No results, protocol, or retracted report','No arm-level data after author contact')
    mm=re.search(NUM,new)
    if mm:
        n=mm.group(1); c=ctx+t0; val=None
        if n=='975': val=F('excluded_screen')
        elif n=='1,006': val=F('screened')
        elif 'Inappropriate population' in t0 or 'No postoperative' in t0 or 'No results' in t0 or ('Wrong' in t0 and n in ('20','12','0','3','4','8')):
            if n in ('20','12','0'): val={'20':'0','12':'0','0':str(n_i)}[n]
            else: val=F({'3':'wrong_pop','4':'no_comp','8':'no_arm'}[n])
        elif n=='20': val=str(0)
        elif any(k in c for k in ('not retrieved','sought','assessed','Studies included','Reports of included')):
            pos={k:c.rfind(k) for k in ('not retrieved','sought','assessed','Studies included','Reports of included')}; k=max(pos,key=pos.get)
            if k=='Studies included': val=F('studies_included')
            elif k=='Reports of included': val=F('reports_included')
            else: val={'not retrieved':{'1':str(n_p),'13':F('not_retrieved')},'sought':{'33':str(n_p+n_i),'31':F('sought')},'assessed':{'32':str(n_i),'18':F('assessed')}}[k][n]
        if val is not None: new=new[:mm.start()]+'(n = '+val+')'+new[mm.end():]
    return m.group(1)+new+m.group(3)
x2=re.sub(r'(<w:t(?: [^>]*)?>)([^<]*)(</w:t>)',rep,x)
x2=re.sub(r'<w:p[ >](?:(?!<w:p[ >]|</w:p>).)*?@@DROP@@(?:(?!</w:p>).)*?</w:p>','',x2,flags=re.S)
assert '@@DROP@@' not in x2
def hl(m):
    r=m.group(0)
    if '___' not in r or 'w:highlight' in r: return r
    if '<w:rPr>' in r: return r.replace('<w:rPr>','<w:rPr><w:highlight w:val="yellow"/>',1)
    return re.sub(r'^(<w:r(?: [^>]*)?>)',r'\1<w:rPr><w:highlight w:val="yellow"/></w:rPr>',r,count=1)
x3=re.sub(r'<w:r(?: [^>]*)?>(?:(?!</w:r>).)*?</w:r>',hl,x2,flags=re.S)
def boost(xml):
    def f(m):
        b=m.group(0)
        if 'Hand-searching' not in b: return b
        b=b.replace('cy="1595438"','cy="2000000"')
        b=b.replace('<a:noFill/><a:ln>','<a:solidFill><a:srgbClr val="FFFFFF"/></a:solidFill><a:ln>',1)
        b=b.replace('filled="f"','filled="t" fillcolor="white"').replace('relativeHeight="251673600"','relativeHeight="251999999"').replace('z-index:251673600','z-index:251999999')
        b=re.sub(r'height:125.65pt','height:157.5pt',b)
        return b
    return re.sub(r'<mc:AlternateContent>.*?</mc:AlternateContent>',f,xml,flags=re.S)
x3=boost(x3)
dst=os.path.join(OUT,'PRISMA Flow Diagram Gastroschisis Closure.docx')
zo=zipfile.ZipFile(dst,'w',zipfile.ZIP_DEFLATED)
for it in z.infolist(): zo.writestr(it,x3.encode('utf8') if it.filename=='word/document.xml' else z.read(it.filename))
zo.close(); print('saved')
