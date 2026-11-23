import json,re,time,urllib.request,urllib.parse
from concurrent.futures import ThreadPoolExecutor
def get(u,t=40): return json.loads(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'sr-sinta-scan'}),timeout=t).read())
J={'Paediatrica Indonesiana':('S1',['0030-9311','2338-476X']),'Sari Pediatri':('S3',['0854-7823','2338-5030']),'Majalah Obstetri & Ginekologi':('S2',['0854-0381','2598-1013']),
 'Indonesian Journal of Obstetrics & Gynecology Science':('S3',['2615-496X']),'Intisari Sains Medis':('S3',['2503-3638','2089-9084']),'Medicina (Jurnal Ilmiah Kedokteran Udayana)':('S3',['2540-8313','2540-8321']),
 'Cermin Dunia Kedokteran':('S4',['0125-913X','2503-2720']),'Jurnal e-CliniC':('S4',['2337-5949']),'Medical Scope Journal':('S4',['2715-3312']),'Jurnal Ilmu Kedokteran (Journal of Medical Science)':('S4',['1978-662X','2715-4467']),'Ahmad Dahlan Medical Journal':('S5',['2774-3837'])}
P=re.compile(r'gastroschis|gastrochis|gastroskis|laparoschisis|paraomphalocele',re.I)
def scan(it):
    name,(lvl,iss)=it; items={}; err=0
    for s in iss:
        cur='*'
        for _ in range(60):
            try: d=get(f'https://api.crossref.org/journals/{s}/works?rows=1000&cursor={urllib.parse.quote(cur)}&select=DOI,title,abstract,issued')['message']
            except Exception as e: err+=1; break
            its=d.get('items',[])
            for x in its: items[x['DOI'].lower()]=x
            nc=d.get('next-cursor')
            if not its or not nc or nc==cur: break
            cur=nc; time.sleep(0.2)
    txt=lambda x:' '.join(x.get('title',[''])) +' '+(x.get('abstract') or '')
    hits=[(x['DOI'].lower(),x.get('title',[''])[0].strip(),(x.get('issued',{}).get('date-parts',[[None]])[0] or [None])[0]) for x in items.values() if P.search(txt(x))]
    return name,lvl,len(items),sorted(hits,key=lambda h:h[2] or 0),err
with ThreadPoolExecutor(4) as ex: R=list(ex.map(scan,J.items()))
json.dump(R,open('sinta_scan.json','w'),ensure_ascii=False)
for n,l,t,h,e in R: print(l,n,'| scanned',t,'| hits',len(h),'| err',e)
for n,l,t,h,e in R:
    for x in h: print('  ',n[:14],x[2],x[0],x[1][:80])
