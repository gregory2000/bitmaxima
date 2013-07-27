#!/bin/bash

export CLASSPATH=external_libs/commons-lang3-3.1/commons-lang3-3.1.jar:$CLASSPATH

java -Xmx2G -DentityExpansionLimit=2500000 Dblp2Csv dblp_test.xml > out.csv
