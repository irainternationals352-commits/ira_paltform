from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_program'),
    ]

    operations = [
        migrations.AddField(
            model_name='service',
            name='is_visible',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='country',
            name='is_visible',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='country',
            name='show_in_footer',
            field=models.BooleanField(default=True),
        ),
    ]
