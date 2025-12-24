$connectionString = "Server=(localdb)\MSSQLLocalDB;Database=HrManagerDb;Trusted_Connection=True;"
$query = "SELECT Id, EmployeeId, Type, DocumentUrl FROM Contracts"
$connection = New-Object System.Data.SqlClient.SqlConnection($connectionString)
$command = New-Object System.Data.SqlClient.SqlCommand($query, $connection)
$connection.Open()
$adapter = New-Object System.Data.SqlClient.SqlDataAdapter($command)
$dataset = New-Object System.Data.DataSet
$adapter.Fill($dataset)
$dataset.Tables[0] | Export-CSV -Path "c:\Users\ASUS\Desktop\HrManagerApp+Hiring\HR\HR.API\contracts_debug.csv" -NoTypeInformation
$connection.Close()
Write-Host "Done"
