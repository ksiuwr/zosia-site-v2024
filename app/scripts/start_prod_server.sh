#!/bin/sh
set -eu

gunicorn --bind ":$PORT" server.wsgi:application