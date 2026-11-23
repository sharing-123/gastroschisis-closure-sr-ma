import json,csv,re,urllib.request,urllib.parse,os
from concurrent.futures import ThreadPoolExecutor
SC=os.path.dirname(os.path.abspath(__file__))
IDX=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR\FullText_42\INDEX_42_studi.csv'
rows=list(csv.DictReader(open(IDX,encoding='utf-8-sig')))
METH={ # key -> DOI
 'prisma':'10.1136/bmj.n71','robinsi':'10.1136/bmj.i4919','rob2':'10.1136/bmj.l4898','grade':'10.1136/bmj.39489.470347.ad',
 'grade_robinsi':'10.1016/j.jclinepi.2018.01.012','wan':'10.1186/1471-2288-14-135','mcgrath':'10.1177/0962280219889080',
 'hk':'10.1002/sim.1009','inthout':'10.1136/bmjopen-2015-010247','metafor':'10.18637/jss.v036.i03','balduzzi':'10.1136/ebmental-2019-300117',
 'netmeta':'10.18637/jss.v106.i02','pscore':'10.1186/s12874-015-0060-8','egger':'10.1136/bmj.315.7109.629','sterne_funnel':'10.1136/bmj.d4002',
 'rao':'10.1016/j.jpedsurg.2025.162867','kunz':'10.1016/j.jpedsurg.2013.01.020','allin':'10.1371/journal.pone.0116908','youssef':'10.1016/j.jpedsurg.2016.02.010',
 'miyake':'10.1007/s00383-018-4381-7','diyaolu':'10.21037/tgh-20-185','feldkamp':'10.1002/bdr2.2306','schuh':'10.1542/peds.2024-068696',
 'petrosyan':'10.1053/j.sempedsurg.2018.08.009','bhat':'10.3390/children7120302','salanti':'10.1371/journal.pone.0099682','dias':'10.1177/0272989x12458724',
 'cipriani':'10.1002/sim.3767' }
def get(u,t=30): return json.loads(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'sr-refs'}),timeout=t).read())
def cr(doi):
    try: return get('https://api.crossref.org/works/'+urllib.parse.quote(doi))['message']
    except Exception as e: return None
def auth(m):
    a=[]
    for x in m.get('author',[]):
        fam=x.get('family',''); giv=x.get('given','')
        ini=''.join(w[0] for w in re.split(r'[\s-]+',giv) if w) if giv else ''
        a.append((fam+' '+ini).strip())
    if len(a)>6: a=a[:6]+['et al']
    return ', '.join(a)
def fmt(m,doi):
    if not m: return None
    t=re.sub(r'<[^>]+>','',m.get('title',[''])[0]).strip().rstrip('.')
    j=(m.get('short-container-title') or m.get('container-title') or [''])[0]
    y=(m.get('issued',{}).get('date-parts',[[None]])[0] or [None])[0]
    vol=m.get('volume',''); iss=m.get('issue',''); pg=m.get('page','')
    s=f"{auth(m)}. {t}. {j} {y}"
    if vol: s+=f";{vol}"
    if iss: s+=f"({iss})"
    if pg: s+=f":{pg}"
    s+=f". doi:{doi}"
    return s
allk={r['PMID']:r['DOI'] for r in rows}
out={}
with ThreadPoolExecutor(8) as ex:
    res=list(ex.map(lambda kv:(kv[0],kv[1],cr(kv[1])),list(allk.items())+list(METH.items())))
bad=[]
for k,doi,m in res:
    f=fmt(m,doi)
    if f is None: bad.append((k,doi))
    out[k]=dict(doi=doi,ref=f,year=(m or {}).get('issued',{}).get('date-parts',[[None]])[0][0] if m else None,title=(m or {}).get('title',[''])[0] if m else '')
json.dump(out,open(os.path.join(SC,'refs.json'),'w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(len(out),'bad',bad)
# affiliation/country for the 42 studies
def aff(pmid):
    try:
        d=get('https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&resultType=core&query=EXT_ID:'+pmid+'%20AND%20SRC:MED')['resultList']['result'][0]
        al=d.get('authorList',{}).get('author',[])
        a=''
        for x in al[:1]:
            a=' | '.join(i.get('affiliation','') for i in x.get('authorAffiliationDetailsList',{}).get('authorAffiliation',[]))
        return pmid,a[-160:]
    except Exception as e: return pmid,'ERR'
with ThreadPoolExecutor(6) as ex: A=list(ex.map(aff,[r['PMID'] for r in rows]))
json.dump(dict(A),open(os.path.join(SC,'aff.json'),'w',encoding='utf-8'),ensure_ascii=False)
for p,a in A: print(p,a)
