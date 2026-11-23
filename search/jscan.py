import json,re,time,urllib.request,urllib.parse,sys
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0,r'C:\Users\allam\AppData\Local\Temp\claude\649a80dfb0f12dc2\0fc7ff3f-42f6-460c-a47c-9cf0292298bd\scratchpad\gs')
G=r'C:\Users\allam\AppData\Local\Temp\claude\649a80dfb0f12dc2\0fc7ff3f-42f6-460c-a47c-9cf0292298bd\scratchpad\gs'
def get(u,t=40):
    return json.loads(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'sr-journal-scan'}),timeout=t).read())
J={'Journal of Pediatric Surgery':['0022-3468','1531-5037'],
   'Pediatric Surgery International':['0179-0358','1437-9813'],
   'European Journal of Pediatric Surgery':['0939-7248','1439-359X'],
   'Seminars in Pediatric Surgery':['1055-8586','1532-9453'],
   'Journal of Pediatric Surgery Case Reports':['2213-5766'],
   'African Journal of Paediatric Surgery':['0189-6725','1998-3950'],
   'Journal of Indian Association of Pediatric Surgeons':['0971-9261','0974-5998'],
   'Journal of Neonatal Surgery':['2226-0439'],
   'World Journal of Pediatric Surgery':['2516-5410'],
   'Journal of Pediatric Surgery Open':['2949-9704'],
   'Annals of Pediatric Surgery':['1687-4137','2090-5939']}
P=re.compile(r'gastroschis|gastrochis|gastroskis|laparoschisis|paraomphalocele',re.I)
I=re.compile(r'closure|repair|silo|silastic|spring[- ]loaded|preformed|sutureless|umbilical cord|staged|reduction|bianchi|surgery|surgical|operative|management|treatment|technique|\bsac\b|silon|flap|bedside|sutured|plastic',re.I)
def scan(item):
    name,iss=item; items={}
    for s in iss:
        cur='*'
        for _ in range(80):
            try: d=get(f'https://api.crossref.org/journals/{s}/works?rows=1000&cursor={urllib.parse.quote(cur)}&select=DOI,title,abstract,issued,type')['message']
            except Exception as e: break
            its=d.get('items',[])
            for it in its: items[it['DOI'].lower()]=it
            nc=d.get('next-cursor')
            if not its or not nc or nc==cur: break
            cur=nc; time.sleep(0.2)
    txt=lambda it:' '.join(it.get('title',[''])) +' '+(it.get('abstract') or '')
    hits=[it for it in items.values() if P.search(txt(it))]
    pi=[it for it in hits if I.search(txt(it))]
    return name,len(items),[(it['DOI'].lower(),it.get('title',[''])[0],(it.get('issued',{}).get('date-parts',[[None]])[0] or [None])[0],it.get('type'),bool(it.get('abstract'))) for it in pi],len(hits)
with ThreadPoolExecutor(4) as ex: R=list(ex.map(scan,J.items()))
json.dump(R,open('jscan.json','w'),ensure_ascii=False)
for n,t,pi,h in R: print(n,'| scanned',t,'| P',h,'| P AND I',len(pi))
