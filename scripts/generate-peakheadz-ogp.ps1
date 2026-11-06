param(
  [string]$OutputPath = (Join-Path $PSScriptRoot "..\public\assets\og\peakheadz-og.png")
)

Add-Type -AssemblyName System.Drawing

$sourcePath = Join-Path $PSScriptRoot "..\public\assets\phzlogo1.png"
$outputDirectory = Split-Path -Parent $OutputPath
[System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null

$bitmap = New-Object System.Drawing.Bitmap 1200, 630
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$logo = [System.Drawing.Image]::FromFile($sourcePath)
$titleFont = New-Object System.Drawing.Font("Segoe UI", 45, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$taglineFont = New-Object System.Drawing.Font("Segoe UI", 27, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$titleBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(234, 234, 234))
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(164, 164, 164))
$dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(47, 111, 237))

try {
  $graphics.Clear([System.Drawing.Color]::FromArgb(10, 10, 10))
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $logoWidth = 190
  $logoHeight = [int][Math]::Round($logoWidth * $logo.Height / $logo.Width)
  $logoX = [int]((1200 - $logoWidth) / 2)
  $graphics.DrawImage($logo, $logoX, 72, $logoWidth, $logoHeight)

  $format = New-Object System.Drawing.StringFormat
  $format.Alignment = [System.Drawing.StringAlignment]::Center
  $format.LineAlignment = [System.Drawing.StringAlignment]::Center
  try {
    $graphics.DrawString("PEAKHEADZ", $titleFont, $titleBrush, (New-Object System.Drawing.RectangleF(0, 270, 1200, 70)), $format)
    $graphics.DrawString("Stay motion.", $taglineFont, $mutedBrush, (New-Object System.Drawing.RectangleF(0, 360, 1200, 46)), $format)
  } finally {
    $format.Dispose()
  }

  foreach ($x in @(566, 594, 622)) {
    $graphics.FillEllipse($dotBrush, $x, 432, 12, 12)
  }

  $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
} finally {
  $dotBrush.Dispose()
  $mutedBrush.Dispose()
  $titleBrush.Dispose()
  $taglineFont.Dispose()
  $titleFont.Dispose()
  $logo.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

Write-Output "Generated $OutputPath (1200x630)"
