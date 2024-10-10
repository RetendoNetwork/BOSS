#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: config.sh <config.php>"
    exit 1
fi

PHP_PATH="/c/php/php.exe"

if [ ! -f "$1" ]; then
    echo "The PHP File doesn't exist."
    exit 1
fi

OUTPUT=$($PHP_PATH -f "$1")
if [ $? -ne 0 ]; then
    echo "Error with the PHP File."
    exit 1
fi

echo "$OUTPUT" > "${1%.php}.json"

echo "Converted to ${1%.php}.json"