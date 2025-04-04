# Generated by Django 5.1.7 on 2025-03-27 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="user",
            options={"verbose_name": "Usuario", "verbose_name_plural": "Usuarios"},
        ),
        migrations.RemoveField(
            model_name="user",
            name="empresa",
        ),
        migrations.RemoveField(
            model_name="user",
            name="telefono",
        ),
        migrations.AddField(
            model_name="user",
            name="company",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="user",
            name="phone",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterModelTable(
            name="user",
            table="users",
        ),
    ]
