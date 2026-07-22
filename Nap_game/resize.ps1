Add-Type -AssemblyName System.Drawing
$dir = "c:\Users\Admin\Desktop\TTTN\Nap_game\src\assets\images\Chon_goi_nap"
$files = Get-ChildItem -Path $dir -Filter "*.png"
foreach ($file in $files) {
    if ($file.Length -gt 150000) {
        $imgPath = $file.FullName
        $tempPath = $imgPath + ".tmp.png"
        $img = [System.Drawing.Image]::FromFile($imgPath)
        if ($img.Width -gt 500) {
            $newWidth = 500
            $newHeight = [int]($img.Height * ($newWidth / $img.Width))
            $newImg = New-Object System.Drawing.Bitmap $newWidth, $newHeight
            $graph = [System.Drawing.Graphics]::FromImage($newImg)
            $graph.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graph.DrawImage($img, 0, 0, $newWidth, $newHeight)
            $graph.Dispose()
            $img.Dispose()
            $newImg.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
            $newImg.Dispose()
            Remove-Item $imgPath
            Rename-Item $tempPath $file.Name
            Write-Host "Resized $($file.Name)"
        } else {
            $img.Dispose()
        }
    }
}
