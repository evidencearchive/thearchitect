# PowerShell script to generate a JWT token for testing
# This uses the same secret as your backend

# JWT Secret - MUST match the one in your backend
$JWT_SECRET = "decoding-death-premium-secret"

# Player information
$playerEmail = "test_player_1741299383627_2@decodingtests.com"
$premiumTier = "investigator-toolkit"

# Create JWT Header
$header = @{
    alg = "HS256"
    typ = "JWT"
} | ConvertTo-Json -Compress
$encodedHeader = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($header)).Replace('+', '-').Replace('/', '_').TrimEnd('=')

# Create JWT Payload
$issuedAt = [Math]::Floor([decimal](Get-Date(Get-Date).ToUniversalTime()-UFormat "%s"))
$expiryTime = $issuedAt + 86400  # 24 hours

$payload = @{
    playerEmail = $playerEmail
    premiumTier = $premiumTier
    iat = $issuedAt
    exp = $expiryTime
} | ConvertTo-Json -Compress
$encodedPayload = [Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes($payload)).Replace('+', '-').Replace('/', '_').TrimEnd('=')

# Create signature
$toSign = "$encodedHeader.$encodedPayload"
$hmacsha = New-Object System.Security.Cryptography.HMACSHA256
$hmacsha.key = [Text.Encoding]::UTF8.GetBytes($JWT_SECRET)
$signature = [Convert]::ToBase64String($hmacsha.ComputeHash([Text.Encoding]::UTF8.GetBytes($toSign))).Replace('+', '-').Replace('/', '_').TrimEnd('=')

# Final JWT token
$token = "$encodedHeader.$encodedPayload.$signature"

# Output the token
Write-Host "`n=== JWT Token for Evidence Archive Testing ===`n"
Write-Host "Player: $playerEmail"
Write-Host "Premium Tier: $premiumTier"
Write-Host "`nToken:"
Write-Host $token
Write-Host "`nUse this token in the test-link.html page to access the evidence archive."
Write-Host "==============================================`n"
