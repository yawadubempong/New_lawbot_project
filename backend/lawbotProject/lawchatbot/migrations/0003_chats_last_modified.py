# Generated by Django 5.0.3 on 2024-03-25 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lawchatbot', '0002_rename_chat_chats'),
    ]

    operations = [
        migrations.AddField(
            model_name='chats',
            name='last_modified',
            field=models.DateField(auto_now=True),
        ),
    ]
