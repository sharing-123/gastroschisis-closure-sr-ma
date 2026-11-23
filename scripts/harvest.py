import pandas as pd,numpy as np,matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
A=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR\Analysis'
plt.rcParams["font.family"]="serif"; plt.rcParams["font.serif"]=["Times New Roman","DejaVu Serif"]; plt.rcParams["hatch.linewidth"]=0.9
GREEN=("#e6f3e6","#2e8b2e"); TOP=1.35; HEAD=0.32; STRIP=0.22
df=pd.read_csv(A+r'\harvest_input.csv'); rob=pd.read_csv(A+r'\ROBINS_I_judgements.csv',encoding='utf-8-sig')
rmap={r.Study:r.Overall for r in rob.itertuples()}
H={'L':1.0,'M':0.66,'S':0.33,'C':0.15}
df['study']=df['label']; df['diff']=df.e_M-df.c_M
def hgt(s,d): return 0.66 if d=='RCT' else H.get(rmap.get(s,'S'),0.33)
def sc(n): return 'A' if n>50 else ('B' if n>=20 else 'C')
def alloc(f): return 0 if f.all() else (2 if (~f).all() else 1)
def draw(ax,panel,title,groups,hdr,info,L):
    slots=max([len(g) for g in groups]+[3]); cw=slots+1.0; tot=3*cw
    ax.set_xlim(0,tot); ax.set_ylim(-STRIP,TOP+HEAD); ax.axis('off')
    ax.add_patch(Rectangle((0,-STRIP),tot,TOP+HEAD+STRIP,fill=False,edgecolor='black',linewidth=1.1))
    ax.plot([0,tot],[0,0],color='#8c8c8c',lw=.8); ax.plot([0,tot],[TOP,TOP],color='black',lw=1)
    for c in (1,2): ax.plot([c*cw,c*cw],[-STRIP,TOP+HEAD],color='#8c8c8c',lw=.8)
    for c in range(3):
        ax.text(c*cw+cw/2,TOP+HEAD/2,hdr[c],ha='center',va='center',fontsize=9,style='italic')
        m=groups[c]; st=c*cw+(cw-len(m))/2+0.1
        for i,s in enumerate(m):
            x=st+i; d,h,n=info[s]
            ax.bar(x+.4,h,width=.8,color=GREEN[0],edgecolor=GREEN[1],hatch='////' if d=='RCT' else '....',linewidth=1.1)
            ax.text(x+.4,h+.02,L[s],ha='center',va='bottom',fontsize=8,color='#1f3fbf')
            ax.text(x+.4,-STRIP/2,sc(n),ha='center',va='center',fontsize=8,color='#7f7f7f')
    ax.text(-0.012,.5,title,transform=ax.transAxes,rotation=90,ha='right',va='center',fontsize=10)
    ax.text(-0.07,1.0,panel,transform=ax.transAxes,ha='left',va='top',fontsize=12,fontweight='bold')
def letters(i):
    return chr(97+i) if i<26 else chr(97+i//26-1)+chr(97+i%26)
def make(cc,short,fn,num):
    sub=df[df.contrast==cc]; studies=sorted(sub.study.unique()); L={s:letters(i) for i,s in enumerate(studies)}
    outs=[('LOS','Length of stay','A'),('VD','Ventilator days','B'),('PN','Parenteral nutrition','C'),('FF','Time to full feeds','D')]
    outs=[o for o in outs if (sub.outcome==o[0]).sum()>=2]
    nrow=len(outs); fig=plt.figure(figsize=(10,2.2*nrow+2.6)); gs=fig.add_gridspec(nrow+1,1,height_ratios=[1]*nrow+[1.15],hspace=.35,left=.1,right=.98,top=.93,bottom=.02)
    hdr=[f'Shorter with {short}\n(beneficial effect)','Mixed effect',f'Longer with {short}\n(no beneficial effect)']
    cnt={}
    for i,(o,t,p) in enumerate(outs):
        ax=fig.add_subplot(gs[i]); s=sub[sub.outcome==o]; info={}; gr=[[],[],[]]
        for st,g in s.groupby('study'):
            info[st]=(g.design.iloc[0],hgt(st,g.design.iloc[0]),int(g.e_n.sum()))
            gr[alloc(g['diff']<0)].append(st)
        gr=[sorted(x,key=lambda z:L[z]) for x in gr]; cnt[o]=[len(x) for x in gr]
        draw(ax,p,t,gr,hdr,info,L)
    lax=fig.add_subplot(gs[nrow]); lax.axis('off'); lax.set_xlim(0,1); lax.set_ylim(0,1)
    lax.text(0,.98,'Study',fontweight='bold',fontsize=9,va='top')
    per=int(np.ceil(len(studies)/3))
    for k,s in enumerate(studies):
        lax.text(0.0+0.145*(k//per)*1.0 if False else 0.0+ (k//per)*0.2,0.84-(k%per)*(0.8/per),f'{L[s]}  {s}',fontsize=7,va='center')
    x0=0.66
    lax.text(x0,.98,'Design',fontweight='bold',fontsize=9,va='top')
    for j,(h,t) in enumerate([('////','Randomised trial'),('....','Non-randomised study')]):
        lax.add_patch(Rectangle((x0,.72-j*.16),.03,.1,facecolor=GREEN[0],edgecolor=GREEN[1],hatch=h,transform=lax.transAxes)); lax.text(x0+.04,.77-j*.16,t,fontsize=8,va='center')
    lax.text(x0,.36,'Bar height (overall risk of bias)',fontweight='bold',fontsize=9,va='top')
    for j,t in enumerate(['Tall, low','Medium, moderate or some concerns','Short, serious']): lax.text(x0,.24-j*.1,t,fontsize=8,va='center')
    lax.text(.88,.98,'Sample size\n(experimental)',fontweight='bold',fontsize=9,va='top')
    for j,t in enumerate(['A  n > 50','B  n = 20 to 50','C  n < 20']): lax.text(.88,.62-j*.16,t,fontsize=8,va='center')
    fig.suptitle(f'Harvest plot of vote counting by direction of effect, {short} versus fascial closure',x=.02,ha='left',fontsize=12,fontweight='bold')
    fig.savefig(A+'/forest/'+fn,dpi=300,facecolor='white'); plt.close(fig); print(fn,cnt)
make('DC_vs_FC','DC','Figure_Harvest_DC_vs_FC.png',4)
make('SL_vs_FC','SL','Figure_Harvest_SL_vs_FC.png',5)
