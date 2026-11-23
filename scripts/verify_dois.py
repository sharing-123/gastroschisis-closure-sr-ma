import docx,re,json,urllib.request,urllib.parse,time
from concurrent.futures import ThreadPoolExecutor
d=docx.Document(r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR\Manuscript_Gastroschisis_Closure_PairwiseMA.docx')
refs=[p.text for p in d.paragraphs if re.match(r'^\[\d+\] ',p.text)]
def g(u,t=30): return json.loads(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'sr-verify'}),timeout=t).read())
def norm(s): return set(re.findall(r'[a-z0-9]{4,}',s.lower()))
def check(r):
    n=int(re.match(r'^\[(\d+)\]',r).group(1)); doi=r.rsplit('doi:',1)[1].strip()
    body=r.split('. ',1)[1] if '. ' in r else r
    m=re.search(r'\b(19|20)\d{2}\b',r); yr=m.group(0) if m else ''
    first=r.split(' ',1)[1].split(' ')[0]
    src='';st='NOT VERIFIED'
    for attempt in range(2):
        try:
            c=g('https://api.crossref.org/works/'+urllib.parse.quote(doi))['message']
            t=c.get('title',[''])[0]; y=str((c.get('issued',{}).get('date-parts',[[None]])[0] or [None])[0])
            fams=[a.get('family','').lower() for a in c.get('author',[])]
            tit_ok=len(norm(t)&norm(r))/max(1,len(norm(t)))>=0.6
            if tit_ok and (y==yr or abs(int(y)-int(yr))<=1) and (not fams or any(f and f in first.lower() for f in fams) or first.lower() in ' '.join(fams)): src='Crossref'; st='VERIFIED'; break
            else: src='Crossref mismatch'; st='CHECK'; break
        except Exception as e: time.sleep(1)
    if st!='VERIFIED':
        try:
            e=g('https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&resultType=lite&query=DOI:%22'+urllib.parse.quote(doi)+'%22')['resultList']['result']
            if e:
                t=e[0].get('title',''); 
                if len(norm(t)&norm(r))/max(1,len(norm(t)))>=0.6 and str(e[0].get('pubYear'))==yr: src='Europe PMC/PubMed'; st='VERIFIED'
                else: src='Europe PMC mismatch'; st='CHECK'
        except Exception as ex: pass
    return n,doi,first,yr,st,src
with ThreadPoolExecutor(6) as ex: R=list(ex.map(check,refs))
import collections
print(collections.Counter(r[4] for r in R))
for n,doi,first,yr,st,src in R: print(f"{n:>2} {doi:42s} {first[:14]:14s} {yr} {st} ({src})")
