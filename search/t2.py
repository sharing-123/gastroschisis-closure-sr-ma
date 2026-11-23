import urllib.request,urllib.parse,json,re,time
from strings import *
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'sr-search-check'}),timeout=90).read().decode()
# medRxiv via Europe PMC preprints
q='('+EUROPEPMC+') AND SRC:PPR AND PUBLISHER:"medRxiv"'
d=json.loads(get('https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&pageSize=100&resultType=lite&query='+urllib.parse.quote(q)))
print('medRxiv via EPMC',d['hitCount']); med=d['resultList']['result']
for x in med: print(' ',x.get('pubYear'),x.get('doi'),x['title'][:100])
json.dump(med,open('medrxiv.json','w'))
# ClinicalTrials.gov
for qs in ['query.cond=gastroschisis','query.cond=gastroschisis&query.intr=silo+OR+sutureless+OR+closure+OR+repair+OR+staged+OR+reduction']:
    d=json.loads(get('https://clinicaltrials.gov/api/v2/studies?countTotal=true&pageSize=100&fields=NCTId,BriefTitle,OverallStatus&'+qs))
    print('CT.gov',qs,d['totalCount'])
    if 'intr' in qs:
        for s in d['studies']: print(' ',s['protocolSection']['identificationModule']['nctId'],s['protocolSection']['identificationModule']['briefTitle'][:100])
        json.dump(d['studies'],open('ctgov.json','w'))
# journals via Crossref
J={'Paediatrica Indonesiana':['0030-9311','2338-476X'],'Sari Pediatri':['2338-5030','0854-7823'],'Medical Journal of Indonesia':['0853-1773','2252-8083'],'Acta Medica Indonesiana':['0125-9326','2338-8463']}
P=re.compile(r'gastroschis|gastrochis|gastroskis|laparoschisis',re.I)
I=re.compile(r'closure|repair|silo|sutureless|staged|reduction|surg|operat|management|treatment|technique|bianchi|penutupan|operasi|bedah|tatalaksana|penanganan',re.I)
out={}
for j,iss in J.items():
    items={}
    for s in iss:
        cur='*'
        while True:
            try: d=json.loads(get(f'https://api.crossref.org/journals/{s}/works?rows=1000&cursor={urllib.parse.quote(cur)}&select=DOI,title,abstract,issued,ISSN'))
            except Exception as e: print(j,s,'ERR',e); break
            m=d['message']; its=m.get('items',[])
            for it in its: items[it['DOI']]=it
            nc=m.get('next-cursor')
            if not its or not nc or nc==cur: break
            cur=nc; time.sleep(0.3)
    hits=[it for it in items.values() if P.search(' '.join(it.get('title',[''])) +' '+(it.get('abstract') or ''))]
    hitsPI=[it for it in hits if I.search(' '.join(it.get('title',[''])) +' '+(it.get('abstract') or ''))]
    print(j,'records',len(items),'P',len(hits),'P AND I',len(hitsPI))
    out[j]=[(it['DOI'],it.get('title',[''])[0],it.get('issued',{}).get('date-parts',[[None]])[0][0]) for it in hits]
json.dump(out,open('journals.json','w'),ensure_ascii=False)
for j,h in out.items():
    for x in h: print(' ',j,'|',x[2],x[0],x[1][:90])
