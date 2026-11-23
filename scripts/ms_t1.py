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
para("FC, fascial closure; DC, delayed closure after silo; SL, sutureless or flap closure; TC, mixed comparator (primary closure plus surgical silo). LOS, length of stay; VD, ventilator days; FF, time to full enteral feeds; PN, parenteral nutrition days; Sep, sepsis or infection; Mort, mortality; Hern, hernia; NEC, necrotizing enterocolitis. Arm sizes are those of the stratum used in the primary analysis. *Means without standard deviations, not pooled.",size=9)
