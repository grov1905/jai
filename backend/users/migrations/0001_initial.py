# Generated by Django 5.1.7 on 2025-04-05 17:06

import django.contrib.auth.models
import django.contrib.auth.validators
import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="Permiso",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("codigo", models.CharField(max_length=100, unique=True)),
                ("nombre", models.CharField(max_length=100)),
                ("descripcion", models.TextField(blank=True, null=True)),
            ],
            options={
                "verbose_name": "Permiso",
                "verbose_name_plural": "Permisos",
                "ordering": ["codigo"],
            },
        ),
        migrations.CreateModel(
            name="Rol",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=50, unique=True)),
                ("descripcion", models.TextField(blank=True, null=True)),
                ("nivel_prioridad", models.IntegerField(default=0)),
            ],
            options={
                "verbose_name": "Rol",
                "verbose_name_plural": "Roles",
                "ordering": ["-nivel_prioridad", "nombre"],
            },
        ),
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        error_messages={
                            "unique": "A user with that username already exists."
                        },
                        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
                        max_length=150,
                        unique=True,
                        validators=[
                            django.contrib.auth.validators.UnicodeUsernameValidator()
                        ],
                        verbose_name="username",
                    ),
                ),
                (
                    "first_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="first name"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="last name"
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        blank=True, max_length=254, verbose_name="email address"
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                (
                    "date_joined",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                ("avatar_url", models.URLField(blank=True, max_length=255, null=True)),
                ("biografia", models.TextField(blank=True, null=True)),
                (
                    "estado",
                    models.CharField(
                        choices=[
                            ("activo", "Activo"),
                            ("inactivo", "Inactivo"),
                            ("suspendido", "Suspendido"),
                        ],
                        default="activo",
                        max_length=20,
                    ),
                ),
                ("phone", models.CharField(blank=True, max_length=20, null=True)),
                ("company", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to.",
                        related_name="custom_user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="custom_user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "Usuario",
                "verbose_name_plural": "Usuarios",
            },
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name="RolPermiso",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "permiso",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="users.permiso"
                    ),
                ),
                (
                    "rol",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="users.rol"
                    ),
                ),
            ],
            options={
                "verbose_name": "Permiso de Rol",
                "verbose_name_plural": "Permisos de Roles",
                "unique_together": {("rol", "permiso")},
            },
        ),
        migrations.CreateModel(
            name="UsuarioRol",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("fecha_asignacion", models.DateTimeField(auto_now_add=True)),
                (
                    "rol",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="users.rol"
                    ),
                ),
                (
                    "usuario",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Asignación de Rol",
                "verbose_name_plural": "Asignaciones de Roles",
                "unique_together": {("usuario", "rol")},
            },
        ),
    ]
