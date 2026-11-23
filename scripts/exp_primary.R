.libPaths(c("C:/Users/allam/R/lib", .libPaths()))
S <- readRDS("C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis/models.rds")
out <- list()
for (k in names(S$MODELS)) { if (!grepl(" primary$", k)) next
  x <- S$MODELS[[k]]$x; if (is.null(x) || !nrow(x)) next
  p <- strsplit(sub(" primary$","",k)," ")[[1]]
  if (p[1] %in% c("SEPSIS","DEATH","HERNIA","NEC")) next
  x <- as.data.frame(x); x$key <- k; x$outcome <- p[1]; x$contrast <- p[2]
  out[[k]] <- x[, intersect(c("key","outcome","contrast","study","label","design","e_n","e_M","e_S","c_n","c_M","c_S"), names(x))]
}
all <- do.call(rbind, lapply(out, function(d) d))
write.csv(all, "C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis/harvest_input.csv", row.names=FALSE)
print(names(S$MODELS[[1]]$x)); print(table(all$key))
