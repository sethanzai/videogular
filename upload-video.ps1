$scriptpath = $MyInvocation.MyCommand.Path
$dir = Split-Path $scriptpath
Set-Location $dir


[System.Windows.MessageBox]::Show('Please select video file.')
Add-Type -AssemblyName System.Windows.Forms
$FileBrowser = New-Object System.Windows.Forms.OpenFileDialog -Property @{
    Multiselect = $false # Multiple files can be chosen
	Filter = 'Video files (*.avi, *.m4v, *.mp4, *.mov)| *.avi; *.m4v; *.mp4; *mov' # Specified file types
}
 
[void]$FileBrowser.ShowDialog()

$filePath = $FileBrowser.FileName
$parentDirectory = Split-Path($filePath) -Parent
$file = [io.path]::GetFileName($file)

Robocopy  "$parentDirectory" "$dir\content\"$file /mir /r:2 /w:3 /XF desktop.ini 
Remove-Item $dir\content\videoList.txt

$videoList = Get-ChildItem("$dir\content") -name
$videoList | Out-File "$dir\videoList.txt"