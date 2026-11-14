from .common import *

for database in DATABASES.values():
    database['USER'] = 'zosia'
    database['HOST'] = os.environ.get('DB_HOST_FOR_TEST_DB', '0.0.0.0')
