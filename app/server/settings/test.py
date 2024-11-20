from .common import *

DATABASES['default']['USER'] = 'zosia'
DATABASES['default']['HOST'] = os.environ.get('DB_HOST_FOR_TEST_DB', '0.0.0.0')
