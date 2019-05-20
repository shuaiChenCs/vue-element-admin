@echo off
echo "packaged..."
npm run build
echo "packaged success..."
pscp.exe -r official root@47.112.28.153:/data/www/test