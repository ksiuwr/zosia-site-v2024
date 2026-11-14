#!/bin/sh
set -eu

python manage.py migrate_sites
