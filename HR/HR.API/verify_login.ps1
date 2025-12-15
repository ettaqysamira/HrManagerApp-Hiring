$process = Start-Process -FilePath "dotnet" -ArgumentList "run" -WorkingDirectory "c:\Users\ASUS\Desktop\HrManagerApp+Hiring\HR\HR.API" -PassThru -NoNewWindow
Write-Host "Starting API..."
Start-Sleep -Seconds 15

try {
    $body = @{
        login = "samira@ettaqy.com"
        password = "ettaqy2020"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:5076/api/Auth/login" -Method Post -Body $body -ContentType "application/json"
    
    Write-Host "Response Received:"
    Write-Host ($response | ConvertTo-Json -Depth 5)

    if ($response.User.Role -eq "HR") {
        Write-Host "SUCCESS: Role is HR"
    } else {
        Write-Host "FAILURE: Role is NOT HR"
    }
}
catch {
    Write-Host "Error during request:"
    Write-Host $_
}
finally {
    Stop-Process -Id $process.Id -Force
    Write-Host "API Stopped"
}
