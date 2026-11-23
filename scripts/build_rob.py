import csv,os,collections
OUT=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR\Analysis'
# ROBINS-I domains: D1 confounding, D2 selection of participants, D3 classification of interventions,
# D4 deviations from intended interventions, D5 missing data, D6 measurement of outcomes, D7 selection of reported result
# codes: L low, M moderate, S serious, C critical
base=dict(D1='S',D2='L',D3='L',D4='L',D5='L',D6='M',D7='M')
over={
 'Minkes 2000':{}, 'Kidd 2003':{'D1':'S'}, 'Chiu 2006':{}, 'Maksoud-Filho 2006':{'D4':'M'},
 'Owen 2006':{'D1':'M'}, 'Villela 2009':{'D2':'M'}, 'Banyard 2010':{'D3':'M','D4':'M'}, 'Lobo 2010':{},
 'Tsai 2010':{'D1':'S','D2':'M'}, 'McNamara 2011':{}, 'Schmidt 2011':{}, 'Murthy 2014':{'D2':'M'},
 'Gurien 2017':{'D5':'M'}, 'Hawkins 2020':{'D5':'S'}, 'Sosnowska 2023':{'D6':'M'}, 'Avila 2025':{},
 'Chantakhow 2025':{'D2':'M'}, 'Riboh 2009':{}, 'Witt 2019':{}, 'Grabski 2019':{}, 'Barry 2023':{},
 'Fraser 2020':{}, 'Emami 2015':{}, 'Owen 2010 (UK)':{'D5':'M'}, 'Alali 2011':{'D5':'M'}, 'Stanger 2014':{'D5':'M'},
 'Orion 2011':{}, 'Fraser 2022':{'D5':'M'}, 'Allotey 2007':{'D3':'M'}, 'Charlesworth 2014':{'D3':'M'}, 'Dariel 2015':{},
 'Anand 2025':{'D5':'M','D6':'M'}}
rank={'L':0,'M':1,'S':2,'C':3}
rows=[]
for s,o in sorted(over.items(),key=lambda kv:int(kv[0].split()[-1]) if kv[0].split()[-1].isdigit() else int(kv[0].split()[-2].strip('()')) if False else 0):
    d=dict(base); d.update(o)
    ov=max(d.values(),key=lambda x:rank[x]); rows.append((s,d,ov))
rows.sort(key=lambda r:(int(''.join(ch for ch in r[0].split()[1] if ch.isdigit())),r[0]))
sym={'L':('low','+'),'M':('moderate','-'),'S':('serious','X'),'C':('critical','X'),'NI':('ni','?')}
doms=['D1','D2','D3','D4','D5','D6','D7']
cell=lambda c:f'<td class="bg-white-cell"><div class="circle-wrapper"><div class="circle {sym[c][0]}">{sym[c][1]}</div></div></td>'
trs='\n'.join(f'<tr><td class="study-name">{s}</td>'+''.join(cell(d[x]) for x in doms)+cell(ov)+'</tr>' for s,d,ov in rows)
n=len(rows)
def seg(dk):
    cnt=collections.Counter(d[dk] if dk!='Overall' else ov for s,d,ov in rows)
    return cnt
bars=[]
names=['Bias due to confounding','Bias in selection of participants','Bias in classification of interventions','Bias due to deviations from intended interventions','Bias due to missing data','Bias in measurement of outcomes','Bias in selection of the reported result']
for dk in doms:
    cnt=collections.Counter(d[dk] for s,d,ov in rows)
    segs=''.join(f'<div class="bar-segment {sym[k][0]}" style="width: {100*cnt[k]/n:.2f}%;"></div>' for k in ('L','M','S','C') if cnt[k])
    bars.append(f'<div class="bar-row">{segs}</div>')
html=f'''<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Risk of Bias Plot</title><style>
body{{font-family:Arial,Helvetica,sans-serif;background:#fff;color:#000;margin:0;padding:30px 20px;display:flex;justify-content:center}}
.main-container{{width:100%;max-width:900px}} .table-section{{display:flex;justify-content:center;align-items:center;margin-bottom:10px}}
.study-label-wrapper{{display:flex;align-items:center;justify-content:center;width:40px}} .study-label{{transform:rotate(-90deg);font-size:15px;white-space:nowrap}}
.rob-table{{border-collapse:collapse;border:1px solid #666}} .rob-table th,.rob-table td{{border:1px solid #777;text-align:center;padding:2px;height:28px}}
.domain-header{{background:#8F8F8F!important;font-weight:normal;width:40px;font-size:13px}} .study-name{{background:#8F8F8F!important;text-align:center!important;padding:2px 5px!important;font-size:13px;width:150px}}
.bg-white-cell{{background:#fff}} .circle-wrapper{{display:flex;justify-content:center;align-items:center;width:100%;height:100%}}
.circle{{width:22px;height:22px;border-radius:50%;border:1px solid #000;display:flex;justify-content:center;align-items:center;font-weight:bold;box-sizing:border-box;box-shadow:1px 1px 2px rgba(0,0,0,.15)}}
.circle.low{{background:#00A800;font-size:17px}} .circle.moderate{{background:#E6E600;font-size:19px}} .circle.serious{{background:#B30000;font-size:13px}} .circle.critical{{background:#800000;color:#fff;font-size:13px}} .circle.ni{{background:#5b9bd5;color:#fff;font-size:13px}}
.top-legend-container{{display:flex;gap:50px;margin:5px 0 28px 205px;font-size:11px;line-height:1.3}} .judgement-item{{display:flex;align-items:center;gap:6px;font-size:11px;margin-bottom:4px}}
.circle-sm{{width:14px;height:14px;border:1px solid #000;border-radius:50%;display:flex;justify-content:center;align-items:center;font-weight:bold}}
.circle-sm.low{{background:#00A800;font-size:12px}} .circle-sm.moderate{{background:#E6E600;font-size:14px}} .circle-sm.serious{{background:#B30000;font-size:9px}} .circle-sm.critical{{background:#800000;color:#fff;font-size:9px}}
.chart-wrapper{{display:flex;margin-bottom:5px;padding-left:10px}} .chart-labels{{width:300px;text-align:right;padding-right:10px;font-size:11px;display:flex;flex-direction:column;justify-content:space-between}}
.chart-bars-container{{flex:1;display:flex;flex-direction:column;justify-content:space-between}} .bar-row{{height:12px;display:flex;width:100%;margin:3.5px 0;border:1px solid #000;box-sizing:border-box}}
.bar-segment{{height:100%;border-right:1px solid #000;box-sizing:border-box}} .bar-segment:last-child{{border-right:none}}
.bar-segment.low{{background:#00A800}} .bar-segment.moderate{{background:#E6E600}} .bar-segment.serious{{background:#B30000}} .bar-segment.critical{{background:#800000}}
.x-axis-wrapper{{display:flex;padding-left:10px}} .x-axis-spacer{{width:310px}} .x-axis{{flex:1;position:relative;height:25px;border-top:1px solid #000;margin-top:5px;font-size:10px}}
.x-tick{{position:absolute;transform:translateX(-50%);top:6px}}
</style></head><body><div class="main-container">
<div style="text-align:center;margin-left:205px;font-size:13px;margin-bottom:5px">Risk of bias (ROBINS-I)</div>
<div class="table-section"><div class="study-label-wrapper"><div class="study-label">Study</div></div><div>
<table class="rob-table"><thead><tr><th style="background:#8F8F8F!important;width:150px"></th>{''.join(f'<th class="domain-header">{x}</th>' for x in doms)}<th class="domain-header" style="width:55px">Overall</th></tr></thead><tbody>
{trs}
</tbody></table></div></div>
<div class="top-legend-container"><div>
<div>D1: Bias due to confounding</div><div>D2: Bias in selection of participants into the study</div><div>D3: Bias in classification of interventions</div><div>D4: Bias due to deviations from intended interventions</div><div>D5: Bias due to missing data</div><div>D6: Bias in measurement of outcomes</div><div>D7: Bias in selection of the reported result</div><div>Overall: Overall risk of bias</div></div>
<div><div style="font-weight:bold;font-size:11px;margin-bottom:3px">Judgement</div>
<div class="judgement-item"><div class="circle-sm critical">X</div> Critical</div><div class="judgement-item"><div class="circle-sm serious">X</div> Serious</div><div class="judgement-item"><div class="circle-sm moderate">-</div> Moderate</div><div class="judgement-item"><div class="circle-sm low">+</div> Low</div></div></div>
<div class="chart-wrapper"><div class="chart-labels">{''.join(f'<div>{x}</div>' for x in names)}</div><div class="chart-bars-container">{''.join(bars)}</div></div>
<div class="x-axis-wrapper"><div class="x-axis-spacer"></div><div class="x-axis">{''.join(f'<div class="x-tick" style="left:{p}%">{p}%</div>' for p in (0,25,50,75,100))}</div></div>
</div></body></html>'''
open(os.path.join(OUT,'ROBINS_I_plot.html'),'w',encoding='utf-8').write(html)
w=csv.writer(open(os.path.join(OUT,'ROBINS_I_judgements.csv'),'w',encoding='utf-8-sig',newline=''))
w.writerow(['Study']+doms+['Overall']);
for s,d,ov in rows: w.writerow([s]+[d[x] for x in doms]+[ov])
print(n, collections.Counter(ov for s,d,ov in rows))
