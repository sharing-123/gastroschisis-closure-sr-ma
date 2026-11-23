## Pairwise meta-analysis of closure strategies for gastroschisis
## Model: random-effects, REML tau^2, Hartung-Knapp CI, prediction interval (doing-meta.guide ch.4-9)
.libPaths(c("C:/Users/allam/R/lib", .libPaths()))
suppressPackageStartupMessages({library(meta); library(metafor); library(dplyr); library(estmeansd); library(netmeta); library(grid)})
H   <- "C:/Users/allam/AppData/Local/Temp/claude/a7673535580505a5/0fc7ff3f-42f6-460c-a47c-9cf0292298bd/scratchpad/ext"
OUT <- "C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis"
dir.create(file.path(OUT, "forest"), showWarnings = FALSE, recursive = TRUE)
set.seed(20261123)
d <- read.csv(file.path(H, "arms.csv"), stringsAsFactors = FALSE, na.strings = c("", "NA"))
lab <- function(s, y) paste(s, y)
d$label <- lab(sub("2006$", "", ifelse(d$study == "Owen2006", "Owen A", ifelse(d$study == "Owen2010", "Owen B", d$study))), d$year)
d$label <- sub("Owen A 2006", "Owen 2006", sub("Owen B 2010", "Owen 2010 (UK)", d$label))
d$label <- sub("Avila-Hernandez", "Avila", sub("Fraser2020", "Fraser", d$label))
d$label <- sub("Fraser2022", "Fraser", d$label)

## ---------- 1. convert medians to mean/SD (McGrath Box-Cox; Wan as sensitivity) ----------
conv <- function(mean, sd, med, q1, q3, mn, mx, n, method = "bc") {
  if (!is.na(mean) && !is.na(sd)) return(c(mean = mean, sd = sd, how = 0))
  if (!is.na(mean) && !is.na(mn) && !is.na(mx)) return(c(mean = mean, sd = (mx - mn) / (2 * qnorm((n - 0.375) / (n + 0.25))), how = 1))
  if (is.na(med)) return(c(mean = NA, sd = NA, how = NA))
  if (method == "bc") {
    r <- tryCatch({
      if (!is.na(mn) && !is.na(mx)) bc.mean.sd(min.val = mn, med.val = med, max.val = mx, n = n)
      else bc.mean.sd(q1.val = q1, med.val = med, q3.val = q3, n = n)
    }, error = function(e) NULL)
    if (!is.null(r)) return(c(mean = r$est.mean, sd = r$est.sd, how = 2))
  }
  if (!is.na(mn) && !is.na(mx)) c(mean = (mn + 2 * med + mx) / 4, sd = (mx - mn) / (2 * qnorm((n - 0.375) / (n + 0.25))), how = 3)
  else c(mean = (q1 + med + q3) / 3, sd = (q3 - q1) / (2 * qnorm((0.75 * n - 0.125) / (n + 0.25))), how = 3)
}
apply_conv <- function(d, method) {
  for (pre in c("e", "c")) {
    res <- t(mapply(function(i) conv(d[[paste0(pre, "_mean")]][i], d[[paste0(pre, "_sd")]][i], d[[paste0(pre, "_med")]][i],
                                      d[[paste0(pre, "_q1")]][i], d[[paste0(pre, "_q3")]][i], d[[paste0(pre, "_mn")]][i],
                                      d[[paste0(pre, "_mx")]][i], d[[paste0(pre, "_n")]][i], method), seq_len(nrow(d))))
    d[[paste0(pre, "_M")]] <- as.numeric(res[, "mean"]); d[[paste0(pre, "_S")]] <- as.numeric(res[, "sd"]); d[[paste0(pre, "_how")]] <- as.numeric(res[, "how"])
  }
  d
}
comb <- function(n, m, s) { N <- sum(n); M <- sum(n * m) / N; V <- (sum((n - 1) * s^2 + n * m^2) - N * M^2) / (N - 1); c(N, M, sqrt(V)) }
prep <- function(method) {
  x <- apply_conv(d, method)
  cont <- x$outcome %in% c("LOS", "VD", "FF", "PN")
  xc <- x[cont, ]; xb <- x[!cont, ]
  # combine Hawkins silo subgroups
  key <- paste(xc$study, xc$outcome, xc$stratum, xc$contrast, xc$combine)
  hc <- !is.na(xc$combine)
  comb_rows <- do.call(rbind, lapply(split(xc[hc, ], paste(xc$study, xc$outcome, xc$stratum, xc$contrast)[hc]), function(g) {
    r <- g[1, ]; cc <- comb(g$e_n, g$e_M, g$e_S); r$e_n <- cc[1]; r$e_M <- cc[2]; r$e_S <- cc[3]; r$e_how <- max(g$e_how); r
  }))
  xc <- rbind(xc[!hc, ], comb_rows)
  list(cont = xc, bin = xb)
}
P <- prep("bc"); PW <- prep("wan")

## ---------- 2. dataset selection ----------
approx_n <- c("Gurien", "Hawkins")
exclude_primary_SL <- c("Emami", "Orion")      # flap / plastic closure analysed separately
pick <- function(x, mode) {
  out <- list()
  for (g in split(x, paste(x$study, x$outcome, x$contrast))) {
    pri <- if (mode == "simple") "P" else c("A", "M", "P")
    for (s in pri) if (any(g$stratum == s)) { out[[length(out) + 1]] <- g[g$stratum == s, ]; break }
  }
  if (length(out)) do.call(rbind, out) else x[0, ]
}
sel <- function(P, outcome, contrast, mode = "primary", drop = NULL, keep_flap = FALSE, design = NULL) {
  x <- if (outcome %in% c("LOS", "VD", "FF", "PN")) P$cont else P$bin
  x <- x[x$outcome == outcome & x$contrast == contrast & !grepl("noSD", x$stat_type), ]
  x <- x[!x$study %in% c("Anand"), ]   # percent-derived counts kept out of primary
  if (contrast == "SL_vs_FC" && !keep_flap) x <- x[!x$study %in% exclude_primary_SL, ]
  if (!is.null(drop)) x <- x[!x$study %in% drop, ]
  if (!is.null(design)) x <- x[x$design == design, ]
  x <- pick(x, mode)
  x <- x[!duplicated(paste(x$study, x$outcome, x$contrast)), ]
  x[order(x$year), ]
}

## ---------- 3. models ----------
mcont <- function(x, subgroup = NULL, title = "") {
  if (nrow(x) < 2) return(NULL)
  args <- list(n.e = x$e_n, mean.e = x$e_M, sd.e = x$e_S, n.c = x$c_n, mean.c = x$c_M, sd.c = x$c_S, studlab = x$label, data = x,
               sm = "MD", method.tau = "REML", method.random.ci = "HK", method.predict = "HK", prediction = nrow(x) >= 3, common = FALSE, random = TRUE, title = title)
  if (!is.null(subgroup)) args$subgroup <- x[[subgroup]]
  do.call(metacont, args)
}
mbin <- function(x, sm = "RR", title = "", method = "Inverse") {
  if (nrow(x) < 2) return(NULL)
  metabin(event.e = x$e_ev, n.e = x$e_n, event.c = x$c_ev, n.c = x$c_n, studlab = x$label, data = x, sm = sm, method = method,
          method.tau = "REML", method.random.ci = "HK", method.predict = "HK", prediction = nrow(x) >= 3, common = FALSE, random = TRUE, incr = 0.5, title = title)
}
row <- function(m, tag, outcome, contrast) {
  if (is.null(m)) return(NULL)
  isb <- inherits(m, "metabin")
  te <- m$TE.random; lo <- m$lower.random; hi <- m$upper.random
  data.frame(analysis = tag, outcome = outcome, contrast = contrast, k = m$k, n = sum(if (isb) m$n.e + m$n.c else m$n.e + m$n.c, na.rm = TRUE),
             est = if (isb && m$sm %in% c("RR", "OR")) exp(te) else te, lo = if (isb && m$sm %in% c("RR", "OR")) exp(lo) else lo, hi = if (isb && m$sm %in% c("RR", "OR")) exp(hi) else hi,
             pval = m$pval.random, I2 = 100 * m$I2, tau2 = m$tau2,
             pi_lo = if (!is.null(m$lower.predict) && !is.na(m$lower.predict)) (if (isb && m$sm %in% c("RR", "OR")) exp(m$lower.predict) else m$lower.predict) else NA,
             pi_hi = if (!is.null(m$upper.predict) && !is.na(m$upper.predict)) (if (isb && m$sm %in% c("RR", "OR")) exp(m$upper.predict) else m$upper.predict) else NA)
}
RES <- list(); MODELS <- list()
cont_out <- c("LOS", "VD", "FF", "PN"); bin_out <- c("SEPSIS", "DEATH", "HERNIA", "NEC")
cons <- c("DC_vs_FC", "SL_vs_FC")
for (o in cont_out) for (cc in cons) {
  x <- sel(P, o, cc); m <- mcont(x, title = paste(o, cc)); MODELS[[paste(o, cc, "primary")]] <- list(m = m, x = x)
  RES[[length(RES) + 1]] <- row(m, "Primary (all-comer, Box-Cox)", o, cc)
  # sensitivity set
  sens <- list(
    "Wan conversion (Hawkins excluded)" = sel(PW, o, cc, drop = "Hawkins"),
    "Simple-stratum data only" = sel(P, o, cc, mode = "simple"),
    "Randomised trials only" = sel(P, o, cc, design = "RCT"),
    "Non-randomised only" = sel(P, o, cc, design = "NRS"),
    "Excluding approximated n (Gurien, Hawkins)" = sel(P, o, cc, drop = approx_n),
    "Excluding converted medians (reported mean/SD only)" = { y <- sel(P, o, cc); y[y$e_how == 0 & y$c_how == 0, ] }
  )
  if (cc == "SL_vs_FC") sens[["Including flap/plastic closure (Emami, Orion)"]] <- sel(P, o, cc, keep_flap = TRUE)
  for (nm in names(sens)) RES[[length(RES) + 1]] <- row(mcont(sens[[nm]]), nm, o, cc)
}
for (o in bin_out) for (cc in cons) {
  x <- sel(P, o, cc); m <- mbin(x, title = paste(o, cc)); MODELS[[paste(o, cc, "primary")]] <- list(m = m, x = x)
  RES[[length(RES) + 1]] <- row(m, "Primary RR (inverse variance, HK)", o, cc)
  RES[[length(RES) + 1]] <- row(mbin(sel(P, o, cc, mode = "simple"), title = ""), "Simple-stratum data only", o, cc)
  RES[[length(RES) + 1]] <- row(mbin(sel(P, o, cc, design = "RCT")), "Randomised trials only", o, cc)
  if (cc == "SL_vs_FC") RES[[length(RES) + 1]] <- row(mbin(sel(P, o, cc, keep_flap = TRUE)), "Including flap/plastic closure", o, cc)
}
res <- do.call(rbind, RES); res[, c("est", "lo", "hi", "pval", "I2", "tau2", "pi_lo", "pi_hi")] <- round(res[, c("est", "lo", "hi", "pval", "I2", "tau2", "pi_lo", "pi_hi")], 3)
write.csv(res, file.path(OUT, "results_pairwise_and_sensitivity.csv"), row.names = FALSE)
cat("\n===== PRIMARY RESULTS =====\n"); print(res[grepl("^Primary", res$analysis), ], row.names = FALSE)

## ---------- 4. subgroup analyses (population, design) ----------
SUB <- list()
for (o in c("LOS", "VD")) {
  x <- MODELS[[paste(o, "DC_vs_FC", "primary")]]$x
  for (v in c("population", "design")) { m <- mcont(x, subgroup = v, title = paste(o, "by", v)); SUB[[paste(o, v)]] <- m }
}
cat("\n===== SUBGROUP TESTS (DC vs FC) =====\n")
for (nm in names(SUB)) { m <- SUB[[nm]]; if (!is.null(m)) cat(nm, ": subgroup test p =", signif(m$pval.Q.b.random, 3), "\n") }

## ---------- 5. leave-one-out, funnel, Egger, meta-regression ----------
for (key in c("LOS DC_vs_FC primary", "VD DC_vs_FC primary", "LOS SL_vs_FC primary")) {
  m <- MODELS[[key]]$m; if (is.null(m)) next
  mi <- metainf(m, pooled = "random")
  cat("\n--- leave-one-out", key, "range of pooled MD:", round(range(mi$TE), 2), " p range:", round(range(mi$pval), 3), "\n")
  if (m$k >= 10) { b <- metabias(m, method.bias = "linreg"); cat("Egger", key, ": p =", round(b$p.value, 3), "\n") }
}
m <- MODELS[["LOS DC_vs_FC primary"]]$m; x <- MODELS[["LOS DC_vs_FC primary"]]$x
cat("\n--- meta-regression LOS DC vs FC (single moderators; k =", m$k, ")\n")
for (mod in c("year")) { x$year_c <- x$year - 2005; mm <- tryCatch(metareg(update(m, data = x), ~ year_c), error = function(e) NULL); if (!is.null(mm)) print(mm) }

## ---------- 6. multilevel sensitivity (dependent effects, 3-arm studies) ----------
ml <- function(o) {
  xs <- do.call(rbind, lapply(cons, function(cc) { z <- sel(P, o, cc, keep_flap = FALSE); z }))
  es <- escalc(measure = "MD", m1i = xs$e_M, sd1i = xs$e_S, n1i = xs$e_n, m2i = xs$c_M, sd2i = xs$c_S, n2i = xs$c_n, data = xs)
  es$esid <- seq_len(nrow(es)); es$cl <- es$study
  r <- tryCatch(rma.mv(yi, vi, mods = ~ factor(contrast) - 1, random = ~ 1 | cl / esid, data = es, method = "REML", test = "t"), error = function(e) NULL)
  if (!is.null(r)) { rr <- robust(r, cluster = es$cl); cat("\n--- multilevel", o, ": ", paste(levels(factor(es$contrast)), round(coef(rr), 2), collapse = " | "), " | sigma2 (study, effect) =", round(r$sigma2, 2), "\n") ; print(round(cbind(est = coef(rr), lo = rr$ci.lb, hi = rr$ci.ub), 2)) }
  r
}
ML <- lapply(c("LOS", "VD"), ml)

## ---------- 7. network meta-analysis (secondary) ----------
nma_one <- function(o) {
  xc <- rbind(sel(P, o, "DC_vs_FC"), sel(P, o, "SL_vs_FC"), sel(P, o, "SL_vs_DC"))
  arms <- rbind(
    data.frame(study = xc$label, treat = xc$c_node, n = xc$c_n, mean = xc$c_M, sd = xc$c_S, stringsAsFactors = FALSE),
    data.frame(study = xc$label, treat = xc$e_node, n = xc$e_n, mean = xc$e_M, sd = xc$e_S, stringsAsFactors = FALSE))
  arms <- arms[!duplicated(paste(arms$study, arms$treat)), ]
  pw <- pairwise(treat = treat, n = n, mean = mean, sd = sd, studlab = study, data = arms, sm = "MD")
  nm <- netmeta(pw, reference.group = "FC", common = FALSE, random = TRUE, sm = "MD")
  list(nm = nm, arms = arms)
}
NMA <- list()
for (o in c("LOS", "VD", "FF", "PN")) {
  r <- tryCatch(nma_one(o), error = function(e) { cat("NMA", o, "failed:", conditionMessage(e), "\n"); NULL })
  if (!is.null(r)) { NMA[[o]] <- r; nm <- r$nm
    cat("\n===== NMA", o, "k =", nm$k, " designs =", nm$d, " treatments =", nm$n, " tau2 =", round(nm$tau2, 2), "\n")
    print(round(cbind(MD = nm$TE.random[, "FC"], lo = nm$lower.random[, "FC"], hi = nm$upper.random[, "FC"])[c("DC", "SL"), ], 2))
    ns <- tryCatch(netsplit(nm), error = function(e) NULL); if (!is.null(ns)) print(ns, digits = 2) }
}
saveRDS(list(MODELS = MODELS, SUB = SUB, NMA = lapply(NMA, function(z) z$nm), res = res), file.path(OUT, "models.rds"))
write.csv(P$cont[, c("label", "outcome", "stratum", "contrast", "e_n", "e_M", "e_S", "c_n", "c_M", "c_S", "e_how", "c_how", "design", "population")], file.path(OUT, "analysis_dataset_continuous.csv"), row.names = FALSE)
write.csv(P$bin[, c("label", "outcome", "stratum", "contrast", "e_n", "e_ev", "c_n", "c_ev", "design", "population")], file.path(OUT, "analysis_dataset_binary.csv"), row.names = FALSE)
cat("\nDONE\n")
