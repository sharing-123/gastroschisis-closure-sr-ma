import docx,json
from docx.shared import Pt,Cm
from docx.oxml import OxmlElement
from docx.oxml.ns import qn

pm=set(json.load(open('pm_ids.json')))
old=set(json.load(open(r'C:/Users/allam/Downloads/JPS/Q1/pubmed_all.json')))
print('old not in new',len(old-pm),'new not in old',len(pm-old),'overlap',len(old&pm))
D=docx.Document()
s=D.sections[0]
s.page_width=Cm(21.59); s.page_height=Cm(27.94)
for a in ('left_margin','right_margin','top_margin','bottom_margin'):
    setattr(s,a,Cm(2.54))
st=D.styles['Normal']; st.font.name='Times New Roman'; st.font.size=Pt(10)
st.element.rPr.rFonts.set(qn('w:eastAsia'),'Times New Roman')

def para(text,bold=False,italic=False,size=None,after=6):
    p=D.add_paragraph(); r=p.add_run(text); r.bold=bold; r.italic=italic
    if size: r.font.size=Pt(size)
    p.paragraph_format.space_after=Pt(after)
    return p

def bullet(text):
    p=D.add_paragraph(style='List Bullet'); p.add_run(text)
    p.paragraph_format.space_after=Pt(3)

def borders(tbl):
    b=OxmlElement('w:tblBorders')
    for e in ('top','left','bottom','right','insideH','insideV'):
        x=OxmlElement('w:'+e); x.set(qn('w:val'),'single'); x.set(qn('w:sz'),'4'); x.set(qn('w:color'),'000000'); b.append(x)
    tbl._tbl.tblPr.append(b)

def table(head,rows,widths):
    t=D.add_table(rows=1,cols=len(head)); borders(t); t.autofit=False
    for i,h in enumerate(head):
        c=t.rows[0].cells[i]; c.width=Cm(widths[i]); c.paragraphs[0].add_run(h).bold=True
    for r in rows:
        cs=t.add_row().cells
        for i,v in enumerate(r):
            cs[i].width=Cm(widths[i]); cs[i].paragraphs[0].add_run(v)
    for row in t.rows:
        for c in row.cells:
            for p in c.paragraphs:
                p.paragraph_format.space_after=Pt(2)
                for r in p.runs: r.font.size=Pt(9)
    D.add_paragraph().paragraph_format.space_after=Pt(2)
    return t

para('Boolean search test report',True,size=14)
para('Closure strategies for gastroschisis: fascial, delayed silo-based, and sutureless closure',italic=True)
para('Tested 22 November 2026')

para('1. Search design',True,size=11)
para('The search follows a two-block structure (population AND closure technique) with no outcome block and no design, language, or date filter, so that studies reporting arm-level data on any outcome are not lost. It replaces the search used for the manuscript that was rejected. Differences from that search are listed in section 6.')
table(['Block','Content'],[
 ['P: gastroschisis','gastroschis*, gastrochis* (common misspelling), gastroskis* (Indonesian spelling), laparoschisis, paraomphalocele; MeSH: Gastroschisis'],
 ['I: closure technique','closure, repair, silo, Silastic, spring-loaded, preformed, sutureless, umbilical cord, staged, staged reduction/closure, delayed closure/repair, primary closure/repair, immediate closure/repair, fascial closure, sutured, plastic closure, flap, bedside, abdominal wall closure, cord closure, cord-based, cord protection, reduction, Bianchi, surgery, surgical, operative, management, treatment, technique*, sac, silon; MeSH: Abdominal Wall/surgery, Plastic Surgery Procedures, Surgical Flaps, Suture Techniques, Umbilical Cord'],
],[3.5,12.5])

para('2. Live test results',True,size=11)
table(['Source','Test performed','Result','Check'],[
 ['PubMed','Run on E-utilities with the full string','1,912 records','No syntax error, no warning, no phrase-not-found. Block P alone: 3,195 records.'],
 ['Europe PMC','Run on the REST API with the full string (TITLE_ABS and MESH fields)','1,941 records','No error. Includes preprints (medRxiv, 3 records, none eligible).'],
 ['ClinicalTrials.gov','API v2, condition field = gastroschisis','50 records','No error. 19 of the 50 carry a closure or repair term in the intervention field.'],
],[2.7,5,2.5,5.8])

para('Recall test',True)
bullet('Previous screening set (64 records assessed in the earlier manuscript: 11 pooled, 2 narrative, 22 excluded at full text, 7 registry studies, 1 prior review, 21 excluded at abstract). PubMed retrieved 64 of 64 and Europe PMC 64 of 64. This set came from the earlier search, so it is only a partial check.')
bullet('Independent check. Seven reports cited in the manuscript but outside that set (Kunz 2013, Allin 2015, Youssef 2016, Miyake 2019, Diyaolu 2021, Rao 2026, and Witt 2019 by DOI) were all retrieved by PubMed (7 of 7) with the first version of the string. With the final string they are retrieved in Europe PMC (7 of 7), and the PubMed recheck is pending because the E-utilities service was unreachable at the time.')
bullet('Failure found and fixed. A first version with only generic closure words and the term "abdominal wall defect*" returned 2,653 records, mostly adult hernia and flap literature. A second version without that term returned 1,025 records but lost closure papers that do not use the word closure (for example elective delayed reduction without anesthesia, Bianchi reduction, and a 2026 systematic review of surgical strategy). Adding reduction, Bianchi, surgery, surgical, operative, management, treatment, technique*, sac, and silon restored all of them (11 of 11 spot-checked records retrieved).')
bullet('Overlap with the earlier PubMed export (1,532 records): %d shared, %d only in the old export (mostly epidemiology, genetics, and animal models, which carry no closure term) and %d only in the new search.' % (len(old&pm),len(old-pm),len(pm-old)))

para('3. Registers and preprints',True,size=11)
para('Six registered trials of closure strategies were found. None is matched yet to a publication, and five have no results posted, so each is a lead for author contact.')
table(['Registration','Title','Status and size','Note'],[
 ['NCT00539292','Silastic spring-loaded silo for infants with gastroschisis (Hospital for Sick Children)','Terminated, n = 88','Results posted on ClinicalTrials.gov; arm-level data can be extracted from the record.'],
 ['NCT00404690','Bedside silo versus operative closure (Children\u2019s Mercy)','Terminated, n = 20','No results posted; check whether published.'],
 ['NCT01506531','Silo versus primary closure (Children\u2019s Mercy)','Completed, n = 38','Probably Poola 2019 (truncated trial); confirm.'],
 ['NCT01094587','Sutureless versus sutured closure (Stanford)','Terminated, n = 39','Probably Bruzoni 2017 (n = 39); confirm.'],
 ['NCT06461325','Surgical management of gastroschisis (Clermont-Ferrand)','Completed, n = 30','Four techniques (Bianchi, Schuster, sutureless, vacuum-assisted closure). No results posted; possible new study.'],
 ['NCT03724214','Multi-centre gastroschisis interventional study, Sub-Saharan Africa','Unknown, n = 235','Pre/post design; probably not eligible.'],
],[2.4,5.6,3,5])

para('4. Databases run by the review team',True,size=11)
para('Scopus, Cochrane Library and EBSCOhost (MEDLINE with Full Text) were searched by the review team and returned 3,375, 92 and 1,788 records. Their strings were checked for syntax here (balanced brackets and quotation marks, no empty groups, no dangling operators, valid field codes). ProQuest was dropped because its content is not mainly medical. Counts are entered in Table S1 and the PRISMA diagram.')
table(['Database','Syntax check','How to run'],[
 ['Embase','Passed','Embase.com, Advanced search, string pasted as it is (emtree term gastroschisis/exp plus title, abstract, keyword fields). Run it on the same day as Scopus and Cochrane.'],
 ['Scopus','Passed','Advanced search, string pasted as it is (TITLE-ABS-KEY fields).'],
 ['Cochrane Library','Passed','Search manager, each numbered line pasted separately in order (#1, #2, then #3 #1 AND #2).'],
 ['WHO ICTRP','Not applicable','Advanced search, condition = gastroschisis, all recruitment statuses. The portal does not take long Boolean strings.'],
],[3,2.5,10.5])

para('5. Hand-searched Indonesian journals',True,size=11)
para('Manual searching targets reports that the databases do not index, so only Indonesian journals listed in Sinta and not indexed in PubMed or Scopus were searched (Sinta levels read from the Sinta website on 24 November 2026). Records were retrieved through DOI metadata in Crossref by ISSN, and the gastroschisis block was applied locally to title and abstract. A closure block was left out because these journals return very few records.')
table(['Journal','Sinta','Records scanned','Gastroschisis records','Decision'],[
 ['Sari Pediatri','S3','1,699','1','Excluded, mixed anomalies'],
 ['Majalah Obstetri dan Ginekologi','S2','273','1','Excluded, limb-body wall complex'],
 ['Intisari Sains Medis','S3','1,843','1','Excluded, single-arm case series'],
 ['Medicina (Udayana)','S3','333','1','Excluded, not a closure comparison'],
 ['Jurnal e-CliniC','S4','1,418','2','Both excluded'],
 ['Medical Scope Journal','S4','338','1','Excluded, review'],
 ['Jurnal Ilmu Kedokteran (Riau)','S4','341','1','Excluded, single case report'],
],[5.2,1.3,2.5,2.8,4.2])
para('Hand-searching covered eight Sinta journals (Paediatrica Indonesiana, Sari Pediatri, Majalah Obstetri dan Ginekologi, Intisari Sains Medis, Medicina, Jurnal e-CliniC, Medical Scope Journal, Jurnal Ilmu Kedokteran; 9 records) and two surgery journals that PubMed and Europe PMC cover poorly (Journal of Neonatal Surgery, 21 records; Journal of Pediatric Surgery Case Reports, 8 records), 38 records in total. Four had already been retrieved by the database searches. Of the other 34, 29 were excluded on title and abstract, four await full text and one was excluded after full-text assessment. Cermin Dunia Kedokteran returned no record in Crossref, and Indonesian Journal of Obstetrics and Gynecology Science and Ahmad Dahlan Medical Journal could not be scanned by ISSN. Each record and reason is in Supplementary Table S2.')
para('Exploratory note. A separate scan of ten international pediatric surgery journals (183 records) is not part of the PRISMA flow because the databases index those journals. It found one report outside PubMed worth following up, a multicentre cohort of complex gastroschisis in the Journal of Neonatal Surgery (2025) that gives means and P values without group sizes. The authors can be asked for the data.')
para('6. What changed from the rejected search',True,size=11)
for b in ['One search date for all sources (22 November 2026). The earlier manuscript mixed 21 December 2025 for Scopus and Cochrane with 30 October 2026 for the others.',
 'Embase added. MEDLINE through EBSCOhost was dropped because PubMed already covers MEDLINE.',
 'Closure vocabulary widened (Silastic, spring-loaded, preformed, cord, bedside, reduction, Bianchi, sac, silon) and misspellings added (gastrochis*, gastroskis*).',
 'Registers searched (ClinicalTrials.gov, ICTRP). Registry results are a source of arm-level data for trials with no publication.',
 'No study is excluded for lacking arm-level data until the full text has been read and the corresponding author has been contacted twice.']:
    bullet(b)

para('7. Limits to state in the Methods',True,size=11)
for b in ['Scopus, Cochrane Library and EBSCOhost counts come from the review team\u2019s own searches and were not independently verified.',
 'The recall benchmark overlaps with the earlier search. The seven independent reports and the registered trials reduce, but do not remove, that circularity.',
 'Broad terms such as management, treatment, and surgery add noise. They were kept because they recovered closure studies that avoid the word closure, and screening removes the noise.',
 'Journal records come from DOI metadata (Crossref), not from each journal\u2019s search box. Older issues or issues not deposited may be missing, and some records have no abstract, so title-only matching was used for them.',
 'PROSPERO must be registered, or the earlier record amended with its date and reasons, before screening starts. Screening and extraction need two independent reviewers.']:
    bullet(b)

D.save(r'C:\Users\allam\Downloads\Gastroschisis_Closure_SR\Laporan Uji Boolean Gastroschisis.docx')
print('saved')
