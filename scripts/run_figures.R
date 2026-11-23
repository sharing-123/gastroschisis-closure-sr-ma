## Figures in the author's script style (meta::forest, layout RevMan5, HKSJ)
.libPaths(c("C:/Users/allam/R/lib", .libPaths()))
suppressPackageStartupMessages({library(meta); library(grid); library(netmeta)})
OUT <- "C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis"
FD <- file.path(OUT, "forest"); dir.create(FD, showWarnings = FALSE, recursive = TRUE)
S <- readRDS(file.path(OUT, "models.rds"))
nm <- c(LOS = "Length of hospital stay (days)", VD = "Ventilator days", FF = "Time to full enteral feeds (days)", PN = "Parenteral nutrition (days)",
        SEPSIS = "Sepsis / bloodstream infection", DEATH = "Mortality", HERNIA = "Ventral / umbilical hernia", NEC = "Necrotizing enterocolitis")
cn <- c(DC_vs_FC = "Delayed silo-based closure (DC) vs fascial closure (FC)", SL_vs_FC = "Sutureless closure (SL) vs fascial closure (FC)")
ex <- c(DC_vs_FC = "DC", SL_vs_FC = "SL")
fig_no <- 0
draw <- function(m, file, title, left, right, xlab, h) {
  png(file.path(FD, file), width = 14, height = h, units = "in", res = 300)
  forest(m, layout = "RevMan5", fontfamily = "sans", fontsize = 11, spacing = 1.1,
         label.left = left, label.right = right, xlab = xlab,
         text.random = "Total (95% CI)", digits = 2, digits.sd = 2, digits.weight = 1,
         col.square = "green", col.square.lines = "green", col.diamond = "black", col.diamond.lines = "black",
         print.tau2 = TRUE, print.I2 = TRUE, print.pval.Q = TRUE, test.overall.random = TRUE, prediction = (m$k >= 3),
         label.e = ex[cc], label.c = "FC")
  grid.text(title, x = 0.5, y = 0.985, gp = gpar(fontsize = 12, fontface = "bold", fontfamily = "sans"))
  dev.off()
}
for (key in names(S$MODELS)) {
  m <- S$MODELS[[key]]$m; if (is.null(m) || m$k < 2) next
  parts <- strsplit(key, " ")[[1]]; o <- parts[1]; cc <- parts[2]
  isb <- inherits(m, "metabin")
  title <- paste0(nm[o], ": ", cn[cc])
  draw(m, paste0("forest_", o, "_", cc, ".png"), title,
       paste("Favours", ex[cc]), "Favours FC", if (isb) "Risk ratio (random-effects, HKSJ)" else "Mean difference (random-effects, HKSJ)", 2.8 + 0.30 * m$k)
}
## subgroup forest plots (population; design) for LOS and VD, DC vs FC
for (nmx in names(S$SUB)) {
  m <- S$SUB[[nmx]]; if (is.null(m)) next
  png(file.path(FD, paste0("forest_subgroup_", gsub(" ", "_", nmx), ".png")), width = 14, height = 3.6 + 0.30 * m$k, units = "in", res = 300)
  forest(m, layout = "RevMan5", fontfamily = "sans", fontsize = 11, spacing = 1.1, label.left = "Favours DC", label.right = "Favours FC",
         xlab = "Mean difference (days)", text.random = "Total (95% CI)", text.random.w = "Subtotal (95% CI)", digits = 2, digits.sd = 2,
         col.square = "green", col.square.lines = "green", col.diamond = "black", col.diamond.lines = "black", print.tau2 = TRUE, print.I2 = TRUE,
         print.pval.Q = TRUE, test.overall.random = TRUE, test.subgroup.random = TRUE, label.e = "DC", label.c = "FC")
  grid.text(paste0(nm[strsplit(nmx, " ")[[1]][1]], " by ", strsplit(nmx, " ")[[1]][2], " (DC vs FC)"), x = 0.5, y = 0.985, gp = gpar(fontsize = 12, fontface = "bold", fontfamily = "sans"))
  dev.off()
}
## funnel and leave-one-out
m <- S$MODELS[["LOS DC_vs_FC primary"]]$m
png(file.path(FD, "funnel_LOS_DC_vs_FC.png"), width = 7, height = 6, units = "in", res = 300)
funnel(m, studlab = FALSE, contour = c(0.9, 0.95, 0.99), col.contour = c("gray85", "gray75", "gray65"), xlab = "Mean difference in length of stay (days)")
legend("topright", fill = c("gray85", "gray75", "gray65"), legend = c("p<0.10", "p<0.05", "p<0.01"), bty = "n")
dev.off()
mi <- metainf(m, pooled = "random")
png(file.path(FD, "leaveoneout_LOS_DC_vs_FC.png"), width = 11, height = 7.5, units = "in", res = 300)
forest(mi, layout = "RevMan5", fontfamily = "sans", fontsize = 11, xlab = "Pooled mean difference omitting each study (days)", label.left = "Favours DC", label.right = "Favours FC")
grid.text("Leave-one-out analysis: length of stay, DC vs FC", x = 0.5, y = 0.985, gp = gpar(fontsize = 12, fontface = "bold", fontfamily = "sans"))
dev.off()
## network plots
for (o in names(S$NMA)) {
  n <- S$NMA[[o]]
  png(file.path(FD, paste0("nma_graph_", o, ".png")), width = 5, height = 5, units = "in", res = 300)
  netgraph(n, number.of.studies = TRUE, plastic = FALSE, col = "gray40", thickness = "number.of.studies", multiarm = FALSE, points = TRUE, cex.points = 4, col.points = c("steelblue", "seagreen", "firebrick"))
  dev.off()
  png(file.path(FD, paste0("nma_forest_", o, ".png")), width = 9, height = 3.2, units = "in", res = 300)
  forest(n, reference.group = "FC", sortvar = TE, smlab = nm[o], xlab = "Mean difference vs FC (days)", leftlabs = "Strategy")
  dev.off()
}
cat("figures done\n")
