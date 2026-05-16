from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_display_scope_flags'),
    ]

    operations = [
        migrations.AddField(
            model_name='university',
            name='show_in_listing',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='program',
            name='show_in_listing',
            field=models.BooleanField(default=True),
        ),
    ]
