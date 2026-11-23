import urllib.request,urllib.parse,json,re,csv,sys
from strings import *
def get(u):
    return urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'sr-search-check'}),timeout=60).read().decode()
# PubMed
u='https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmax=10000&retmode=json&term='+urllib.parse.quote(PUBMED)
j=json.loads(get(u))['esearchresult']; pm=set(j['idlist']); print('PubMed count',j['count'],len(pm)); print(j.get('errorlist'),j.get('warninglist'))
json.dump(sorted(pm),open('pm_ids.json','w'))
# Europe PMC
res=[];cur='*'
while True:
    u='https://www.ebi.ac.uk/europepmc/webservices/rest/search?format=json&pageSize=1000&resultType=lite&cursorMark='+urllib.parse.quote(cur)+'&query='+urllib.parse.quote(EUROPEPMC)
    d=json.loads(get(u)); res+=d['resultList']['result']
    nc=d.get('nextCursorMark')
    if not nc or nc==cur or not d['resultList']['result']: break
    cur=nc
print('EuropePMC',d['hitCount'],len(res))
json.dump(res,open('epmc.json','w'))
