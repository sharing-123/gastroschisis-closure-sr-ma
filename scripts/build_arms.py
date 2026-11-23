import csv,re,json,os
H=os.path.dirname(os.path.abspath(__file__))
rows=[]
rd=csv.reader(open(os.path.join(H,'data.csv'),encoding='utf-8'))
hdr=next(rd)
def num(x):
    try: return float(x)
    except: return None

def parse_stat(stat,m,s,side):
    """return dict of stats for one arm. side 0/1"""
    d=dict(mean=None,sd=None,med=None,q1=None,q3=None,mn=None,mx=None,ev=None)
    if stat=='mean±SD': d['mean']=m; d['sd']=s
    elif stat.startswith('mean_noSD'): d['mean']=m
    elif stat=='events': d['ev']=m
    elif stat.startswith('median_iqr'):
        mm=re.search(r'\[([\d.;]+)\|([\d.;]+)\]',stat); q=mm.group(side+1).split(';')
        d['med']=m; d['q1']=float(q[0]); d['q3']=float(q[1])
    elif stat.startswith('median(range'):
        mm=re.search(r'range ([\d.]+)-([\d.]+) \| ([\d.]+)-([\d.]+)',stat); g=mm.groups()
        d['med']=m; d['mn']=float(g[2*side]); d['mx']=float(g[2*side+1])
    elif stat.startswith('mean(range'):
        mm=re.search(r'range ([\d.]+)-([\d.]+) \| ([\d.]+)-([\d.]+)',stat); g=mm.groups()
        d['mean']=m; d['mn']=float(g[2*side]); d['mx']=float(g[2*side+1])
    else: raise ValueError(stat)
    return d

def contrast(t1,t2,stratum):
    if stratum=='POSTSILO': return 'POSTSILO','SL','FC'   # e,c nodes
    s={t1,t2}
    if s=={'FC','DC'}: return 'DC_vs_FC','DC','FC'
    if s=={'FC','SL'}: return 'SL_vs_FC','SL','FC'
    if s=={'SL','DC'}: return 'SL_vs_DC','SL','DC'
    if s=={'TC','DC'}: return 'DC_vs_TC','DC','TC'
    raise ValueError((t1,t2))

out=[]
def push(study,year,outcome,stratum,t1,n1,st1,t2,n2,st2,stat,source,note,combine=''):
    con,e,c=contrast(t1,t2,stratum)
    a,b=(st1,st2) if t1==c else (st2,st1)
    na,nb=(n1,n2) if t1==c else (n2,n1)
    r=dict(study=study,year=year,outcome=outcome,stratum=stratum,contrast=con,e_node=e,c_node=c,stat_type=stat,source=source,note=note,combine=combine)
    for pre,st,n in (('c',a,na),('e',b,nb)):
        r[pre+'_n']=n
        for k,v in st.items(): r[f'{pre}_{k}']=v
    out.append(r)

for row in rd:
    if not row or not row[0]: continue
    study,year,outcome,stratum,t1,n1,m1,s1,t2,n2,m2,s2,stat,source=row[:14]; note=','.join(row[14:])
    n1=num(n1);n2=num(n2);m1=num(m1);s1=num(s1);m2=num(m2);s2=num(s2)
    st1=parse_stat(stat,m1,s1,0); st2=parse_stat(stat,m2,s2,1)
    push(study,int(year),outcome,stratum,t1,n1,st1,t2,n2,st2,stat,source,note)

def S(**k):
    d=dict(mean=None,sd=None,med=None,q1=None,q3=None,mn=None,mx=None,ev=None); d.update(k); return d
# ---- earlier verified mean/SD rows (checked against PDFs this session) ----
P='mean±SD'
add=[]
def A(study,year,outcome,stratum,t1,n1,s1,t2,n2,s2,stat,source,note='',combine=''):
    push(study,year,outcome,stratum,t1,n1,s1,t2,n2,s2,stat,source,note,combine)
# Pastor 2008 RCT (Table 4) mixed
for o,(a,b,c,d) in {'VD':(5.29,5.2,3.17,2.9),'PN':(33.0,27,38.8,33),'LOS':(43.2,28,49.1,34)}.items():
    A('Pastor',2008,o,'M','FC',27,S(mean=a,sd=b),'DC',27,S(mean=c,sd=d),P,'Table 4','RCT; ITT (7 of 27 primary converted to silo)')
for o,(x,y) in {'SEPSIS':(6,7),'NEC':(1,3),'DEATH':(0,0)}.items():
    A('Pastor',2008,o,'M','FC',27,S(ev=x),'DC',27,S(ev=y),'events','Table 4')
# Lobo 2010 (mean±SEM -> SD) mixed
import math
def sd(sem,n): return round(sem*math.sqrt(n),3)
for o,(a,b,c,d) in {'VD':(3.6,0.7,16.1,3.5),'PN':(40.6,12.9,65.1,16.3),'FF':(24.0,8.8,52.6,16.5),'LOS':(44.3,9.5,55.3,9.3)}.items():
    A('Lobo',2010,o,'M','FC',10,S(mean=a,sd=sd(b,10)),'DC',27,S(mean=c,sd=sd(d,27)),P,'Table 2','mean±SEM converted to SD; atresia 3/10 in primary arm')
A('Lobo',2010,'DEATH','M','FC',10,S(ev=0),'DC',27,S(ev=3),'events','prior extraction (verify)')
# Riboh 2009 simple
for o,(a,b,c,d) in {'VD':(12.1,11.1,5.0,6.0),'FF':(21.4,11.7,16.8,7.9),'LOS':(49.7,41.2,34.8,22.7)}.items():
    A('Riboh',2009,o,'P','FC',19,S(mean=a,sd=b),'SL',24,S(mean=c,sd=d),P,'Table 2','includes silo reduction in 9 vs 10')
# Tsai 2010: P (uncomplicated) and A (all)
for o,(a,b,c,d,a2,b2) in {'LOS':(36.56,31.47,33.25,8.74,55.91,64.13),'FF':(34.57,30.59,32.01,7.83,38.52,29.76),'VD':(5.62,7.89,7.00,5.24,18.31,49.0)}.items():
    A('Tsai',2010,o,'P','FC',23,S(mean=a,sd=b),'DC',12,S(mean=c,sd=d),P,'Table 4','uncomplicated; label says median/IQR but values are mean±SD')
    A('Tsai',2010,o,'A','FC',32,S(mean=a2,sd=b2),'DC',12,S(mean=c,sd=d),P,'Table 4','all infants incl complicated in PC arm')
A('Tsai',2010,'DEATH','P','FC',23,S(ev=2),'DC',12,S(ev=2),'events','Table 4')
A('Tsai',2010,'DEATH','A','FC',32,S(ev=5),'DC',12,S(ev=2),'events','Table 4')
# Witt 2019 JAMA Surg: simple P, all A
for o,(pa,pb,pc,pd,aa,ab,ac,ad) in {'LOS':(32.5,15.0,31.3,13.4,43.9,40.4,36.7,21.2),'FF':(27.3,13.2,23.9,10.2,31.4,20.2,27.9,17.3),'PN':(25.3,12.7,22.6,10.1,33.5,29.8,27.4,18.2),'VD':(6.5,9.5,2.4,3.0,6.8,1.3,2.8,3.3)}.items():
    A('Witt',2019,o,'P','FC',43,S(mean=pa,sd=pb),'SL',36,S(mean=pc,sd=pd),P,'Table 2','simple gastroschisis')
    if o!='VD': A('Witt',2019,o,'A','FC',50,S(mean=aa,sd=ab),'SL',40,S(mean=ac,sd=ad),P,'Table 2','all gastroschisis')
A('Witt',2019,'SEPSIS','P','FC',43,S(ev=3),'SL',36,S(ev=2),'events','Table 3','positive blood culture')
A('Witt',2019,'HERNIA','P','FC',43,S(ev=0),'SL',36,S(ev=5),'events','Table 3','umbilical hernia requiring operation')
# Bruzoni 2017 RCT simple (Table 2/3)
for o,(a,b,c,d) in {'VD':(3.15,2.37,1.89,1.7),'FF':(27.8,20.0,45.1,27.3),'LOS':(31.4,19.73,49.3,24.0)}.items():
    A('Bruzoni',2017,o,'P','FC',20,S(mean=a,sd=b),'SL',19,S(mean=c,sd=d),P,'Table 2','RCT; uncomplicated')
A('Bruzoni',2017,'SEPSIS','P','FC',20,S(ev=3),'SL',19,S(ev=8),'events','Table 3')
A('Bruzoni',2017,'DEATH','P','FC',20,S(ev=0),'SL',19,S(ev=0),'events','Table 3')
# Owen 2006 (median range) simple, n=27 vs 21
def MR(m,a,b): return S(med=m,mn=a,mx=b)
def MI(m,a,b): return S(med=m,q1=a,q3=b)
for o,(x,y) in {'VD':(MR(4,1,16),MR(0,0,19)),'FF':(MR(26,12,102),MR(31,17,90)),'PN':(MR(25,10,101),MR(30,15,90)),'LOS':(MR(32,15,120),MR(36,20,164))}.items():
    A('Owen2006',2006,o,'P','FC',27,x,'DC',21,y,'median(range)','Table 2','matched case-control; OFC vs preformed silo no GA')
A('Owen2006',2006,'NEC','P','FC',27,S(ev=4),'DC',21,S(ev=2),'events','Table 3')
# Poola 2019 RCT (median IQR), n=20 vs 18; simple
for o,(x,y) in {'LOS':(MI(24,18.5,40),MI(26.5,21,31)),'VD':(MI(3.3,1.6,5),MI(4.9,3.1,6.6)),'FF':(MI(18,13.5,30),MI(20,15,23))}.items():
    A('Poola',2019,o,'P','FC',20,x,'DC',18,y,'median(IQR)','Table 2','truncated RCT; atresia/necrosis excluded')
A('Poola',2019,'HERNIA','P','FC',20,S(ev=2),'DC',18,S(ev=2),'events','prior extraction (verify)')
# Emami 2015 (flap = SL subtype) low-risk P, all A
for o,(x,y) in {'VD':(MR(4,0,28),MR(3,0,23)),'LOS':(MR(32,2,395),MR(30,6,430)),'PN':(MR(25,2,401),MR(26,8,373))}.items():
    A('Emami',2015,o,'P','FC',344,x,'SL',112,y,'median(range)','Table 3','FLAP closure (sutureless-type); GPS<2')
A('Emami',2015,'LOS','A','FC',436,MR(36,4,626),'SL',129,MR(31,4,430),'median(range)','Table 2','all infants')
A('Emami',2015,'DEATH','P','FC',344,S(ev=3),'SL',112,S(ev=1),'events','Table 3')
A('Emami',2015,'DEATH','A','FC',436,S(ev=9),'SL',129,S(ev=2),'events','Table 2')
# Hawkins 2020: immediate n=224 vs silo groups (<=5 d, 6-10 d, >10 d); n approximated for continuous
def prop(n,N,tot=566): return max(2,round(n*N/tot))
HK={'LOS':(433,MR(34,1,221),[(130,MR(34,14,92)),(140,MR(45,5,197)),(57,MR(62,1,306))],'LOS range for silo<=5d printed 14-920; read as 14-92'),
    'VD':(430,MR(3,1,42),[(130,MR(5,1,138)),(140,MR(9,1,108)),(57,MR(13.5,1,194))],''),
    'PN':(365,MR(26.5,2,1718),[(130,MR(24,4,138)),(140,MR(31,1,334)),(57,MR(34,1,229))],''),
    'FF':(147,MR(22,1,142),[(130,MR(23,6,106)),(140,MR(31,13,536)),(57,MR(70.5,26,229))],'')}
for o,(N,imm,subs,nt) in HK.items():
    for i,(sn,ss) in enumerate(subs,1):
        A('Hawkins',2020,o,'M','FC',prop(224,N),imm,'DC',prop(sn,N),ss,'median(range)','Table 2',f'silo subgroup {i}; n approximated from outcome N={N}; '+nt,combine=f'H{i}')
for o,(x,y) in {'SEPSIS':(44,61),'HERNIA':(27,20),'DEATH':(10,12)}.items():
    A('Hawkins',2020,o,'M','FC',224,S(ev=x),'DC',327,S(ev=y),'events','Table 2')
# Schmidt 2011 (prior extraction from PMC XML; SEM converted) - verify
A('Schmidt',2011,'LOS','M','FC',24,S(mean=34.2,sd=20.086),'DC',21,S(mean=38.4,sd=27.495),P,'prior extraction','SEM converted')
A('Schmidt',2011,'PN','M','FC',24,S(mean=25.7,sd=16.657),'DC',21,S(mean=31.0,sd=28.412),P,'prior extraction','SEM converted')
A('Schmidt',2011,'SEPSIS','M','FC',24,S(ev=13),'DC',21,S(ev=9),'events','prior extraction')

meta={ # design, population(simple_only/unrestricted)
'Pastor':('RCT','unrestricted'),'Bruzoni':('RCT','simple_only'),'Poola':('RCT','simple_only')}
simple={'Riboh','Owen2006','Villela','Owen2010','Murthy','Fraser2020','Avila-Hernandez'}
for r in out:
    d,p=meta.get(r['study'],('NRS','simple_only' if r['study'] in simple else 'unrestricted'))
    r['design']=d; r['population']=p
cols=['study','year','outcome','stratum','contrast','e_node','c_node','design','population','combine','stat_type','source','note']
for pre in ('c','e'): cols+= [f'{pre}_{k}' for k in ('n','mean','sd','med','q1','q3','mn','mx','ev')]
w=csv.DictWriter(open(os.path.join(H,'arms.csv'),'w',encoding='utf-8-sig',newline=''),fieldnames=cols); w.writeheader()
for r in out: w.writerow({k:r.get(k) for k in cols})
import collections
print(len(out)); print(collections.Counter((r['contrast'],r['outcome']) for r in out))
