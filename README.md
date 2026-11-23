# Silo-based delayed closure and sutureless closure compared with fascial closure in neonates with gastroschisis: a systematic review and meta-analysis

Data, analysis code and search materials for the systematic review and meta-analysis. PROSPERO CRD420261519114.

## Contents
- `data/` extraction tables (arm-level data, decisions on 42 included reports, reference list).
- `analysis/` pooled results, GRADE and ROBINS-I tables, analysis datasets (csv), fitted models (`models.rds`), figures (`figures/`, including forest and harvest plots).
- `scripts/` R and Python code that builds arms, runs the pairwise, network and multilevel models, GRADE, risk-of-bias and harvest plots, and the manuscript tables.
- `search/` Boolean strings, journal and database scans, search test code.
- `supplementary/` Supplementary Tables S1 and S2, Boolean test report, analysis plan, extraction workbook, PRISMA flow diagram, full-text tracker.
- `manuscript/` current manuscript draft.

Full-text PDFs are not included because of publisher copyright. The full-text tracker lists every report.

## Methods in brief
Random-effects pairwise meta-analysis (REML, Hartung-Knapp, prediction intervals) for delayed silo-based closure (DC) and sutureless closure (SL) against fascial closure (FC), with network and multilevel models as checks. R 4.6 with meta, metafor, netmeta and estmeansd. Medians converted with the Box-Cox method (seed 20261123).

## License and citation
Code under MIT, data and text under CC BY 4.0. See `CITATION.cff`.
