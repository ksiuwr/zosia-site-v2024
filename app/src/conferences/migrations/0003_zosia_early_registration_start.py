# Generated by Django 3.2.16 on 2022-12-07 21:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conferences', '0002_related_names'),
    ]

    operations = [
        migrations.AddField(
            model_name='zosia',
            name='early_registration_start',
            field=models.DateTimeField(null=True, blank=True,
                                       verbose_name='Registration for early registering users starts'),
        ),
    ]
