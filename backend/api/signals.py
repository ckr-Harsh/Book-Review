from django.db.models.signals import post_migrate
from django.core.management import call_command
from django.apps import AppConfig
import os

def load_dummy_data(sender, **kwargs):
    # Only load if no books exist
    from api.models import Book
    if not Book.objects.exists():
        fixture_path = os.path.join(os.path.dirname(__file__), '../../dummy_data.json')
        call_command('loaddata', fixture_path)

class ApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        post_migrate.connect(load_dummy_data, sender=self)