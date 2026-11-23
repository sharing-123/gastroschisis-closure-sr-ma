import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch
import json,os
H=os.path.dirname(os.path.abspath(__file__))
HN=json.load(open(os.path.join(H,'hand_numbers.json')))
PH='___'
fig,ax=plt.subplots(figsize=(11,13)); ax.set_xlim(0,100); ax.set_ylim(0,130); ax.axis('off')
plt.rcParams['font.family']='serif'
def box(x,y,w,h,lines,fc='white',ec='black',fs=8.6,bold_first=False):
    ax.add_patch(FancyBboxPatch((x,y),w,h,boxstyle='square,pad=0',fc=fc,ec=ec,lw=1.1))
    n=len(lines); step=h/(n+0.6)
    for i,l in enumerate(lines):
        yy=y+h-(i+0.85)*step
        miss='___' in l
        ax.text(x+1,yy,l,fontsize=fs,va='center',ha='left',fontweight='bold' if (bold_first and i==0) else 'normal',
                bbox=dict(facecolor='yellow',edgecolor='none',pad=0.8) if miss else None)
def arrow(x1,y1,x2,y2): ax.annotate('',xy=(x2,y2),xytext=(x1,y1),arrowprops=dict(arrowstyle='-|>',color='black',lw=1))
ax.text(50,127.5,'PRISMA 2020 flow diagram',fontsize=13,fontweight='bold',ha='center')
# headers
box(2,119,60,5,['Identification of studies via databases and registers'],fc='#F5B800',ec='#F5B800',fs=10)
box(66,119,32,5,['Identification via other methods'],fc='#F5B800',ec='#F5B800',fs=10)
# identification
box(2,92,28,24,['Records identified from*','Databases (n = ___)','  PubMed (n = 1,912)','  Scopus (n = ___)','  Cochrane Library (n = ___)','  EBSCOhost (n = ___)','  ProQuest (n = ___)','  Europe PMC (n = 1,941)','Registers (n = 50)','  ClinicalTrials.gov (n = 50)'],bold_first=True,fs=8)
box(34,100,28,16,['Records removed before screening','Duplicate records removed (n = ___)','Ineligible by automation (n = 0)','Removed for other reasons (n = 0)'],fs=8,bold_first=True)
arrow(30,104,34,104)
box(66,92,32,24,[f'Records identified from',f'Hand-searching of 10 journals (n = {HN["ident"]})',f'Found in databases (n = {HN["dbmatch"]})',f'Unique records screened (n = {HN["unique"]})',f'Excluded, title/abstract (n = {HN["excl"]})',f'Duplicate record (n = {HN["dup"]})'],fs=8,bold_first=True)
# screening
box(2,70,28,12,['Records screened','(n = ___)'],fs=9)
box(34,70,28,12,['Records excluded**','(n = ___)'],fs=9)
arrow(16,92,16,82); arrow(30,76,34,76)
box(2,52,28,12,['Reports sought for retrieval','(n = ___)'],fs=9)
box(34,52,28,12,['Reports not retrieved','(n = ___)'],fs=9)
arrow(16,70,16,64); arrow(30,58,34,58)
box(66,70,32,12,['Reports sought for retrieval',f'(n = {HN["pend"]+HN["incl"]})'],fs=9)
box(66,52,32,12,['Reports not retrieved',f'(n = {HN["pend"]})'],fs=9)
arrow(82,92,82,82); arrow(82,70,82,64)
box(2,28,28,18,['Reports assessed for eligibility','(n = ___)'],fs=9)
box(34,24,28,22,['Reports excluded','Wrong population (n = ___)','No closure comparison (n = ___)','No arm-level data (n = ___)'],fs=8,bold_first=True)
arrow(16,52,16,46); arrow(30,37,34,37)
box(66,28,32,18,['Reports assessed for eligibility',f'(n = {HN["incl"]})'],fs=9)
box(66,8,32,14,['Reports excluded','No arm-level data (n = 1)'],fs=8.4,bold_first=True)
arrow(82,52,82,46); arrow(82,28,82,22)
# included
box(2,6,60,14,['Studies included in review (n = ___)','Eligible reports with extractable data in the current analysis (n = 42)','Studies with arm-level data (n = 35), of which pooled (n = 32)'],fs=8.6,bold_first=True)
arrow(16,28,16,20)
ax.text(2,2.5,'*Counts per database, not total. **No automation tools were used. Highlighted items await counts from the review team.',fontsize=7.6,style='italic')
ax.text(2,0.2,'Source: Page MJ, et al. BMJ 2021;372:n71. doi:10.1136/bmj.n71 (CC BY 4.0).',fontsize=7.6)
out=r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR\Analysis\forest\Figure_1_PRISMA.png'
fig.savefig(out,dpi=300,bbox_inches='tight',facecolor='white'); print('saved')
