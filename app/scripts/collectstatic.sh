#!/bin/sh
set -eu

python manage.py collectstatic --verbosity 2 --no-input