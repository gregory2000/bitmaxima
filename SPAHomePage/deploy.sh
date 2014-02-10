env=$1
git pull origin $env

date=`date "+%Y%m%d%H%M%S"`
logpath="/var/logs/dev_$date.log"
outpath="/var/logs/dev_$date.out"
errpath="/var/logs/dev_$date.err"

npm install
node_modules/forever/bin/forever stop server.js 2> /dev/null
node_modules/forever/bin/forever start server.js -l $logpath -o $outpath -e $errpath
