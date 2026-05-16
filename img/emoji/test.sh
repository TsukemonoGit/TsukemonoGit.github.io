#!/bin/bash
SCRIPT_DIR=$(cd $(dirname "$0"); pwd)
ffmpeg -i "$1" -vf "scale=128:-1" "${SCRIPT_DIR}/$2"