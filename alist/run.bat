#!/bin/bash

export HTTPCLIENT=httpcomponents-client-4.2.5

export CLASSPATH=$HTTPCLIENT/lib/commons-logging-1.1.1.jar:$HTTPCLIENT/lib/httpcore-4.2.4.jar:$HTTPCLIENT/lib/httpclient-4.2.5.jar:$CLASSPATH

java AList startups 1 100 > startups.out

java AList users 1 100 > users.out

