# Generated by Django 3.2.16 on 2023-01-29 13:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import organizers.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('conferences', '0005_place_town'),
    ]

    operations = [
        migrations.CreateModel(
            name='OrganizerContact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=20, validators=[organizers.models.validate_phone_number], verbose_name='Phone number')),
                ('user', models.OneToOneField(limit_choices_to={'is_staff': True}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User')),
                ('zosia', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='conferences.zosia', verbose_name='ZOSIA')),
            ],
        ),
    ]