@ECHO ON

CALL aws s3 cp --region eu-west-2 s3://paulrberg/certificates/foss_ar_sha2.pfx C:/foss_ar_sha2.pfx
cd src
CALL npm install
cd ..
CALL gulp rebuild:32 --verbose
CALL gulp pack:win32:portable --prod --verbose
CALL gulp pack:win32:installer --prod --verbose
CALL gulp pack:win32:nsis --prod --verbose
CALL gulp clean:prev-releases:win32 --verbose
