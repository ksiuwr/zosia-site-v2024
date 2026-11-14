from django.db import migrations, models


def remove_duplicate_preferences(apps, schema_editor):
    # A double submitted registration could create two rows for the same user and zosia.
    # Keep the paid one, otherwise the oldest one, which is what the app has been showing.
    UserPreferences = apps.get_model('users', 'UserPreferences')
    preferences = UserPreferences.objects.using(schema_editor.connection.alias)
    seen = set()

    for user_preferences in preferences.order_by('-payment_accepted', 'pk'):
        key = (user_preferences.user_id, user_preferences.zosia_id)
        if key in seen:
            user_preferences.delete()
        else:
            seen.add(key)


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_userpreferences_student_number'),
    ]

    operations = [
        migrations.RunPython(remove_duplicate_preferences, migrations.RunPython.noop),
        migrations.AddConstraint(
            model_name='userpreferences',
            constraint=models.UniqueConstraint(
                fields=('user', 'zosia'),
                name='unique_user_preferences_per_zosia',
            ),
        ),
    ]
