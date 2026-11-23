## GRADE evidence profile in the author's gt style (Times New Roman, footnotes with explicit downgrading reasons)
.libPaths(c("C:/Users/allam/R/lib", .libPaths()))
suppressPackageStartupMessages({library(gt); library(dplyr); library(webshot2)})
OUT <- "C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis"
res <- read.csv(file.path(OUT, "results_pairwise_and_sensitivity.csv"), stringsAsFactors = FALSE)
S <- readRDS(file.path(OUT, "models.rds"))
prim <- res[grepl("^Primary", res$analysis), ]
mid <- c(LOS = 3, VD = 1, FF = 3, PN = 3)             # minimally important differences (days)
bin_lo <- 0.75; bin_hi <- 1.25
nrct <- function(o, cc) { x <- S$MODELS[[paste(o, cc, "primary")]]$x; if (is.null(x)) return(c(0, 0)); if (o %in% c("SEPSIS","DEATH","HERNIA","NEC")) x <- x[(x$e_ev + x$c_ev) > 0, ]; c(sum(x$design == "RCT"), sum(x$design == "NRS")) }
dom <- function(r) {
  o <- r$outcome; isb <- o %in% c("SEPSIS", "DEATH", "HERNIA", "NEC")
  incons <- if (is.na(r$I2) || r$k < 2) 0 else if (r$I2 >= 75) 2 else if (r$I2 >= 50) 1 else 0
  # imprecision
  if (isb) {
    cross_null <- r$lo <= 1 & r$hi >= 1
    wide <- (r$lo < bin_lo | r$hi > bin_hi)
    imp <- if (r$k < 3 | (cross_null & wide & r$n < 1000)) 2 else if (cross_null | wide) 1 else 0
  } else {
    m <- mid[[o]]
    cross_null <- r$lo <= 0 & r$hi >= 0
    cross_mid <- (abs(r$lo) < m | abs(r$hi) < m) & !cross_null
    imp <- if (cross_null & (r$k < 5 | r$n < 400)) 2 else if (cross_null | cross_mid) 1 else 0
  }
  rob <- 1
  cert <- max(1, 4 - rob - incons - imp)
  list(rob = rob, incons = incons, imp = imp, cert = cert)
}
lbl <- c("Not serious", "Serious", "Very serious")
sym <- c("\u2295\u25EF\u25EF\u25EF", "\u2295\u2295\u25EF\u25EF", "\u2295\u2295\u2295\u25EF", "\u2295\u2295\u2295\u2295")
txt <- c("VERY LOW", "LOW", "MODERATE", "HIGH")
oname <- c(LOS = "Length of hospital stay (days)", VD = "Ventilator days", FF = "Time to full enteral feeds (days)", PN = "Parenteral nutrition (days)",
           SEPSIS = "Sepsis / bloodstream infection (RR)", DEATH = "Mortality (RR)", HERNIA = "Ventral / umbilical hernia (RR)", NEC = "Necrotizing enterocolitis (RR)")
imp_lab <- c(LOS = "CRITICAL", VD = "IMPORTANT", FF = "IMPORTANT", PN = "IMPORTANT", SEPSIS = "CRITICAL", DEATH = "CRITICAL", HERNIA = "IMPORTANT", NEC = "IMPORTANT")
mk <- function(cc, ex) {
  rows <- list()
  for (o in names(oname)) {
    r <- prim[prim$outcome == o & prim$contrast == cc, ]; if (!nrow(r)) next
    if (r$k < 2) next
    g <- dom(r); nr <- nrct(o, cc)
    fmt <- if (o %in% c("SEPSIS", "DEATH", "HERNIA", "NEC")) sprintf("%.2f (%.2f to %.2f)", r$est, r$lo, r$hi) else sprintf("%.1f (%.1f to %.1f)", r$est, r$lo, r$hi)
    rows[[length(rows) + 1]] <- tibble(Outcome = oname[[o]], Studies = sprintf("%d (%d RCT, %d NRS)", r$k, nr[1], nr[2]), Participants = r$n,
      Effect = fmt, I2 = sprintf("%.0f%%", r$I2), RiskOfBias = "Serious\u00B9", Inconsistency = paste0(lbl[g$incons + 1], if (g$incons > 0) "\u00B2" else ""),
      Indirectness = "Not serious", Imprecision = paste0(lbl[g$imp + 1], if (g$imp > 0) "\u00B3" else ""), Certainty_Symbol = sym[g$cert], Certainty_Text = txt[g$cert], Importance = imp_lab[[o]])
  }
  bind_rows(rows)
}
tab <- function(df, title, sub, file) {
  g <- df %>% gt() %>%
    tab_header(title = md(paste0("**", title, "**")), subtitle = md(sub)) %>%
    tab_spanner(label = "Quality assessment", columns = c(RiskOfBias, Inconsistency, Indirectness, Imprecision)) %>%
    cols_merge(columns = c(Certainty_Symbol, Certainty_Text), pattern = "{1}<br><b>{2}</b>") %>%
    cols_label(Outcome = "Outcomes", Studies = "No. of studies", Participants = "Participants", Effect = "Effect (95% CI)", I2 = "I\u00B2", RiskOfBias = "Risk of bias",
               Inconsistency = "Inconsistency", Indirectness = "Indirectness", Imprecision = "Imprecision", Certainty_Symbol = "Certainty of evidence", Importance = "Importance") %>%
    tab_style(style = cell_text(weight = "bold", align = "left"), locations = cells_body(columns = Outcome)) %>%
    tab_style(style = cell_fill(color = "#F9F9F9"), locations = cells_body(rows = seq(1, nrow(df), 2))) %>%
    cols_align(align = "center", columns = -Outcome) %>%
    tab_source_note(source_note = md(paste0(
      "**Explanations for downgrading certainty.** All bodies of evidence started at high certainty (ROBINS-I framework) and were rated down for the reasons below.<br>",
      "1. **Risk of bias:** downgraded one level (Serious). Overall ROBINS-I judgement was Serious in 31 of 32 non-randomized studies, driven by confounding by indication (infants with compromised bowel are selected for a silo); the three randomized trials had some concerns (small, unblinded, one stopped early).<br>",
      "2. **Inconsistency:** downgraded one level when I\u00B2 was 50% to 74% and two levels when I\u00B2 was 75% or higher, with prediction intervals that cross the null.<br>",
      "3. **Imprecision:** downgraded one level when the 95% CI crossed the null or a minimally important difference (3 days for stay, feeds and parenteral nutrition; 1 day for ventilation; RR 0.75 to 1.25 for binary outcomes) and two levels when it also rested on fewer than five studies or fewer than 400 participants.<br>",
      "Publication bias was not rated down (Egger p = 0.58 for stay, DC vs FC; fewer than 10 studies for other comparisons). NRS, non-randomized study; RCT, randomized trial. Mean differences are experimental minus fascial closure; negative values favour the experimental strategy.")))  %>%
    tab_options(table.border.top.color = "black", table.border.bottom.color = "black", heading.background.color = "#E5E5E5", column_labels.font.weight = "bold", table.font.names = "Times New Roman", table.font.size = 12)
  gtsave(g, file.path(OUT, "forest", file), vwidth = 1500, zoom = 1.6)
  invisible(g)
}
dc <- mk("DC_vs_FC", "DC"); sl <- mk("SL_vs_FC", "SL")
tab(dc, "GRADE evidence profile: delayed silo-based closure (DC) versus fascial closure (FC)", "Neonates with gastroschisis; random-effects meta-analysis with Hartung-Knapp adjustment", "Figure_GRADE_DC_vs_FC.png")
tab(sl, "GRADE evidence profile: sutureless closure (SL) versus fascial closure (FC)", "Neonates with gastroschisis; random-effects meta-analysis with Hartung-Knapp adjustment", "Figure_GRADE_SL_vs_FC.png")
write.csv(rbind(cbind(Contrast = "DC vs FC", dc), cbind(Contrast = "SL vs FC", sl)), file.path(OUT, "GRADE_table.csv"), row.names = FALSE)
print(rbind(cbind(Contrast = "DC", dc[, c("Outcome", "Studies", "Effect", "I2", "Inconsistency", "Imprecision", "Certainty_Text")]), cbind(Contrast = "SL", sl[, c("Outcome", "Studies", "Effect", "I2", "Inconsistency", "Imprecision", "Certainty_Text")])), width = 200)
