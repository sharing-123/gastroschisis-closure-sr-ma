# Table 2 from GRADE csv
rows2=[]
for g in GR:
    rows2.append([g['Contrast'],g['Outcome'],g['Studies'],g['Participants'],g['Effect'],g['I2'],g['Certainty_Text'].title()])
para('Table 2. Pooled estimates and certainty of evidence (primary analyses).',bold=True,size=10,keep=True)
tbl(['Comparison','Outcome','Studies','Participants','Effect vs FC (95% CI)','I\u00B2','Certainty'],rows2,[1.9,4.6,3.0,1.9,3.3,1.0,2.0],size=8)
para("Mean differences in days for continuous outcomes and risk ratios for binary outcomes, random-effects with Hartung-Knapp confidence intervals. For mortality the number of studies counts those with events in at least one arm. Full GRADE profiles are in Figures S2 and S3.",size=9)
