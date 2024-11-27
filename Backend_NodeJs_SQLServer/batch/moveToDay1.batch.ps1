$Uri = "http://10.22.252.31/cash-api/batch/moveToCashConfirmDay1"
$Token = "21bd12dc183f740ee76f27b78eb39c8ad972a757"
$Params = @{
    Uri = $Uri
    Method = "Post"
    Headers = @{ 'Token' = $Token }
   
}
Invoke-RestMethod @Params