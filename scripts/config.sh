#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: $0 <config.php>"
  exit 1
fi

php_file="$1"

if [ ! -f "$php_file" ]; then
  echo "The file $php_file doesn't exist."
  exit 1
fi

output_file="${php_file%.php}.json"

php_output=$(php -r "
include realpath('$php_file');
echo json_encode(\$data, JSON_PRETTY_PRINT);
")

if [ $? -ne 0 ]; then
  echo "Error with the PHP File."
  exit 1
fi

echo "$php_output" > "$output_file"

echo "Converted."