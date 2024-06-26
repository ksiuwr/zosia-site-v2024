# Generated by Django 3.2.25 on 2024-04-25 22:55

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='QA',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=150, verbose_name='Question')),
                ('answer', models.CharField(max_length=500, verbose_name='Answer')),
                ('priority', models.PositiveSmallIntegerField(default=0, help_text='Questions are sorted in descending order of priorities', verbose_name='Priority')),
            ],
        ),
    ]
