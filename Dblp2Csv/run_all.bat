#!/bin/bash

export CLASSPATH=external_libs/commons-lang3-3.1/commons-lang3-3.1.jar:$CLASSPATH

java -Xmx2G -DentityExpansionLimit=10000000 Dblp2Csv dblp.xml > dblp.csv
