
$Url = "http://localhost:5076/api/Dashboard/stats"
try {
    $Response = Invoke-RestMethod -Uri $Url -Method Get
    Write-Host "API Data:"
    $Response | ConvertTo-Json
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
