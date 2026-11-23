.libPaths(c("C:/Users/allam/R/lib", .libPaths()))
library(webshot2)
OUT <- "C:/Users/allam/Downloads/Gastroschisis_Closure_SR/Analysis"
webshot(file.path(OUT,"ROBINS_I_plot.html"), file.path(OUT,"forest","Figure_ROBINS_I.png"), vwidth = 1100, vheight = 1300, zoom = 2, delay = 1)
cat("ok\n")
