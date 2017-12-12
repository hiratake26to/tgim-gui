#!/bin/bash
selector=peco

fpath=$(grep -l -r --include="*.js" -e "TODO" ./src/ | ${selector})
if [ "${fpath}" != "" ]; then vim $fpath; fi
