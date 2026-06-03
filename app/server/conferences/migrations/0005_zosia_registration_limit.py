from django.core.validators import MinValueValidator
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conferences', '0004_alter_zosia_lecture_registration_end_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='zosia',
            name='registration_limit',
            field=models.IntegerField(
                default=0,
                help_text='Set to 0 for no limit',
                validators=[MinValueValidator(0)],
                verbose_name='Maximum number of registered users',
            ),
        ),
    ]
