#!/bin/bash

# this script will only work on linux with inotify-tools installed.
# This is a bashy clone of entr.
# on macOS just use `entr`, it's so good.

# entr doesn't work in docker containers, being tracked by this bug:https://github.com/docker/for-mac/issues/896

set -eu -o pipefail

# This just ensure that we clean up propperly on ctr-c, mostly useful for debugging this script.
sigint_handler()
{
  kill "$PID"
  exit
}

trap sigint_handler SIGINT

while true; do

	if make build; then
		./api 2>&1 &
	  PID=$!
	else
		PID=-1
	fi
  # inotifiywait runs until it hears a file event in this directory or any recursive subdirectories.
  # when it does, we kill the running server and start the loop over again.
  # if this script is looping on end, that likely means that we are touching some file other than
  # ./api on `make build.` you can add other files that should be ignored to the --exclude regex.
  inotifywait --exclude "(api$|\\.sh$)" -e modify -e move -e create -e delete -e attrib -r .
  if [ "$PID" -ne -1 ]; then
	  kill "$PID"
	fi
done
