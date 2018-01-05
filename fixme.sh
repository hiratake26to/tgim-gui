#!/bin/bash
selector=peco

fpath=$(grep -l -r --include="*.js" -e "FIXME" ./src/ | ${selector})
if [ "${fpath}" != "" ]; then vim $fpath; fi
