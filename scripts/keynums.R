.libPaths(c("C:/Users/allam/R/lib", .libPaths())); suppressPackageStartupMessages(library(netmeta))
OUT <- "C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis"
S <- readRDS(file.path(OUT,"models.rds")); rows <- list()
for (o in names(S$NMA)) { n <- S$NMA[[o]]
  for (t in c("DC","SL")) rows[[length(rows)+1]] <- data.frame(outcome=o, treat=t, est=n$TE.random[t,"FC"], lo=n$lower.random[t,"FC"], hi=n$upper.random[t,"FC"], k=n$k, studies_designs=n$d, tau2=n$tau2)
}
r <- do.call(rbind, rows); write.csv(r, file.path(OUT,"nma_key_numbers.csv"), row.names=FALSE); print(r, digits=3)
