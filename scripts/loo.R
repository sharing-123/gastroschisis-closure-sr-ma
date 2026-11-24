.libPaths(c("C:/Users/allam/R/lib", .libPaths()))
suppressPackageStartupMessages(library(meta))
S <- readRDS("C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis/models.rds")
m <- S$MODELS[["LOS DC_vs_FC primary"]]$m
mi <- metainf(m, pooled = "random")
lab <- as.character(mi$studlab); te <- mi$TE; lo <- mi$lower; hi <- mi$upper
keep <- lab != "Pooled estimate" & !is.na(te)
lab <- sub("^Omitting ", "", lab[keep]); te <- te[keep]; lo <- lo[keep]; hi <- hi[keep]
ov <- m$TE.random; ovl <- m$lower.random; ovh <- m$upper.random
n <- length(te)
png("C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis/forest/leaveoneout_LOS_DC_vs_FC.png", width = 10, height = 7.2, units = "in", res = 300)
par(mar = c(4.6, 11, 3.2, 12), family = "sans")
xl <- c(-1, 14); y <- n:1
plot(NA, xlim = xl, ylim = c(0.2, n + 1.2), yaxt = "n", xlab = "Pooled mean difference in length of stay when the study is omitted (days)", ylab = "", bty = "n", cex.lab = 1.05)
rect(ovl, 0.4, ovh, n + 0.6, col = "#f2e6d8", border = NA)
abline(v = 0, lwd = 1.4); abline(v = ov, lty = 2, col = "#b04a1f", lwd = 1.4)
segments(lo, y, hi, y, lwd = 1.5, col = "#3b4660"); points(te, y, pch = 15, cex = 1.15, col = "#3b4660")
mtext(paste("Omitting", lab), side = 2, at = y, las = 1, line = 0.6, cex = 0.85, adj = 1)
mtext(sprintf("%.1f (%.1f to %.1f)", te, lo, hi), side = 4, at = y, las = 1, line = 0.8, cex = 0.8, adj = 0)
mtext("Mean difference (95% CI)", side = 4, at = n + 1, las = 1, line = 0.8, cex = 0.85, adj = 0, font = 2)
mtext(sprintf("All 19 studies: %.1f (%.1f to %.1f), dashed line and shaded band", ov, ovl, ovh), side = 3, line = 0.4, cex = 0.9, adj = 0)
title(main = "Leave-one-out analysis: length of stay, DC versus FC", line = 1.8, cex.main = 1.1, adj = 0)
dev.off()
print(c(n, ov))
