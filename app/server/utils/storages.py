from storages.backends.gcloud import GoogleCloudStorage
from django.contrib.staticfiles.storage import ManifestStaticFilesStorage

class GCSManifestStaticFilesStorage(ManifestStaticFilesStorage):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.base_storage = GoogleCloudStorage(*args, **kwargs)

    def file_hash(self, name, content=None):
        return super(GCSManifestStaticFilesStorage, self).file_hash(name, content)
