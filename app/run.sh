#!/bin/sh
set -eu

python3 ./manage.py migrate
gunicorn --bind ":$PORT" --workers 2 server.wsgi:application
