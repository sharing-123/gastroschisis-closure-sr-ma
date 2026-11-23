import json,re,urllib.request
from concurrent.futures import ThreadPoolExecutor
R=json.load(open('refs.json',encoding='utf-8'))
def g(u,t=40): return json.loads(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'x'}),timeout=t).read())
def one(k):
    for _ in range(3):
        try:
            e=g('https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&resultType=lite&query=EXT_ID:'+k+'%20AND%20SRC:MED')['resultList']['result']
            return k,(e[0]['authorString'].rstrip('.') if e else None)
        except Exception: pass
    return k,None
keys=[k for k in R if k.isdigit()]
with ThreadPoolExecutor(6) as ex: A=dict(ex.map(one,keys))
ch=0
for k,a in A.items():
    if not a: print('no EPMC',k); continue
    names=[x.strip() for x in a.split(', ')]
    if len(names)>6: names=names[:6]+['et al']
    new=', '.join(names)
    old=R[k]['ref']; seg,rest=old.split('. ',1)
    if seg.split(' ')[0].lower()!=new.split(' ')[0].lower():
        print('CHANGED',k,'|',seg[:40],'->',new[:40]); ch+=1
    R[k]['ref']=new+'. '+rest
json.dump(R,open('refs.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print('changed first author',ch)
