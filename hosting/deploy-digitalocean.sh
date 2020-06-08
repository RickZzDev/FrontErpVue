#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

cd $DIR
env-cmd -e test-server npm run build

tar cajf /tmp/folha_frontend.tar.bz2 \
        -C $DIR/../dist/ .

scp /tmp/folha_frontend.tar.bz2 tmpfolha:/tmp/

REMOTE_SCRIPT="rm -rf /home/folha/folha_frontend/;
mkdir -p /home/folha/folha_frontend/;
tar xajf /tmp/folha_frontend.tar.bz2 -C /home/folha/folha_frontend/;
"
ssh tmpfolha $REMOTE_SCRIPT
