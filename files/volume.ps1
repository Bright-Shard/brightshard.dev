# Copied from: https://mypowershellnotes.wordpress.com/2020/03/30/use-powershell-to-change-the-volume/
# Smaller version in volume.min.ps1
Param(
	[Parameter(Mandatory=$true)]
	[ValidateRange(0,100)]
	[Int]
	$volume
)

# Calculate number of key presses. 
$keyPresses = [Math]::Ceiling( $volume / 2 )

# Create the Windows Shell object. 
$obj = New-Object -ComObject WScript.Shell

# Set volume to zero. 
1..50 | ForEach-Object {  $obj.SendKeys( [char] 174 )  }

# Set volume to specified level. 
for( $i = 0; $i -lt $keyPresses; $i++ )
{
	$obj.SendKeys( [char] 175 )
}