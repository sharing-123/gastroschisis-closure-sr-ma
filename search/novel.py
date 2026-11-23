import json,urllib.request,time
G=r'C:\Users\allam\AppData\Local\Temp\claude\649a80dfb0f12dc2\0fc7ff3f-42f6-460c-a47c-9cf0292298bd\scratchpad\gs'
pm=json.load(open(G+r'\pm_ids.json')); ep=json.load(open(G+r'\epmc.json'))
dois={x['doi'].lower() for x in ep if x.get('doi')}
print('DB DOIs',len(dois))
R=json.load(open('jscan.json',encoding='utf-8'))
tot=0;nov=0;out=[]
for n,t,pi,h in R:
    new=[x for x in pi if x[0] not in dois]
    print(n,'P AND I',len(pi),'not in DB set',len(new)); tot+=len(pi); nov+=len(new)
    for x in new: out.append([n]+x)
print(tot,nov)
json.dump({'dois':sorted(dois),'novel':out},open('novel.json','w'),ensure_ascii=False)
for o in out[:70]: print(o[0][:12],o[3],o[2],o[4],o[1][:90])
