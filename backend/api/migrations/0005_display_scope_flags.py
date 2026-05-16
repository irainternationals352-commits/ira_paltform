from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_visibility_flags'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='show_on_home',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='service',
            name='show_in_listing',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='country',
            name='show_on_home',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='country',
            name='show_in_listing',
            field=models.BooleanField(default=True),
        ),
    ]
