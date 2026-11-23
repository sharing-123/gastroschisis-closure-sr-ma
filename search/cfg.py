from strings import P_TERMS,I_TERMS,tiab,EUROPEPMC
DATE='22 November 2026'
PUBMED=('("Gastroschisis"[Mesh] OR '+tiab(P_TERMS,'tiab')+') AND ("Abdominal Wall/surgery"[Mesh] OR "Plastic Surgery Procedures"[Mesh] OR "Surgical Flaps"[Mesh] OR "Suture Techniques"[Mesh] OR "Umbilical Cord"[Mesh] OR '+tiab(I_TERMS,'tiab')+')')
def j(terms,sep=' OR '): return sep.join(terms)
SCOPUS='TITLE-ABS-KEY('+j(P_TERMS)+') AND TITLE-ABS-KEY('+j(I_TERMS)+')'
COCHRANE='#1 ([mh Gastroschisis] OR ('+j(P_TERMS)+'):ti,ab,kw) #2 ([mh "Surgical Flaps"] OR [mh "Suture Techniques"] OR [mh "Umbilical Cord"] OR ('+j(I_TERMS)+'):ti,ab,kw) #3 #1 AND #2'
EBSCO=None
EMBASE="('gastroschisis'/exp OR ("+j(P_TERMS)+"):ti,ab,kw) AND (("+j(I_TERMS)+"):ti,ab,kw)"
PROQUEST='NOFT('+j(P_TERMS)+') AND NOFT('+j(I_TERMS)+')'
CTGOV='AREA[ConditionSearch](gastroschisis) -- Expert Search, condition only (no intervention block).'
ICTRP='Condition: gastroschisis OR gastroschisis*  -- run in the ICTRP advanced search, recruitment status "All".'
JP='(gastroschis* OR gastrochis* OR gastroskis* OR laparoschisis OR paraomphalocele)'
JOURNAL_STR=JP+' -- Intervention block omitted (adding it dropped 1 record in Paediatrica Indonesiana and 0 in the others; see report).'
