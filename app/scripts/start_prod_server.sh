#!/bin/sh
set -eu

# --timeout 0: Cloud Run barely gives us CPU between requests, so gunicorn would
# kill workers that are only frozen. Cloud Run has its own request timeout.
# --threads: unlike the sync worker, a connection that never sends its request
# doesn't block everyone else. Each thread can hold a DB connection and
# db-f1-micro allows only 25.
exec gunicorn --bind ":$PORT" --threads 4 --timeout 0 server.wsgi:application
