# Renders the PRISMA docx to PNG through Word with a timeout, then kills only the Word process it started.
param([string]$Root='C:\Users\allam\Downloads\Gastroschisis_Closure_SR')
$tmp=Join-Path $env:TEMP 'prisma_render'; New-Item -ItemType Directory -Force $tmp | Out-Null
Copy-Item (Join-Path $Root 'PRISMA Flow Diagram Gastroschisis Closure.docx') "$tmp\prisma.docx" -Force
$before=@(Get-Process WINWORD -ErrorAction SilentlyContinue | ForEach-Object Id)
$job=Start-Job -ScriptBlock { param($t) $w=New-Object -ComObject Word.Application; $w.Visible=$false; $w.DisplayAlerts=0; $d=$w.Documents.Open("$t\prisma.docx",$false,$true); $d.ExportAsFixedFormat("$t\prisma.pdf",17); $d.Close($false); $w.Quit() } -ArgumentList $tmp
if(-not (Wait-Job $job -Timeout 80)){ Stop-Job $job }
$new=@(Get-Process WINWORD -ErrorAction SilentlyContinue | ForEach-Object Id) | Where-Object { $before -notcontains $_ }
foreach($p in $new){ Stop-Process -Id $p -Force -ErrorAction SilentlyContinue }
"$tmp\prisma.pdf"
