""" from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.urls import reverse
import uuid

User = get_user_model()

class Categoria(models.Model):
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    icono = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=20, blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name='subcategorias')
    orden = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['orden', 'nombre']
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

class Etiqueta(models.Model):
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    tipo = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['nombre']
        verbose_name = 'Etiqueta'
        verbose_name_plural = 'Etiquetas'

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

class Articulo(models.Model):
    ESTADO_CHOICES = [
        ('borrador', 'Borrador'),
        ('revision', 'En Revisión'),
        ('publicado', 'Publicado'),
        ('archivado', 'Archivado'),
    ]

    titulo = models.CharField(max_length=255)x
    subtitulo = models.CharField(max_length=255, blank=True, null=True)
    contenido = models.TextField()
    resumen = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    fecha_publicacion = models.DateTimeField(blank=True, null=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    tiempo_lectura = models.IntegerField(blank=True, null=True)  # en minutos
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='borrador')
    imagen_portada_url = models.URLField(max_length=255, blank=True, null=True)
    visitas = models.IntegerField(default=0)
    destacado = models.BooleanField(default=False)
    autor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='articulos')
    categorias = models.ManyToManyField(Categoria, through='ArticuloCategoria', related_name='articulos')
    etiquetas = models.ManyToManyField(Etiqueta, through='ArticuloEtiqueta', related_name='articulos')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fecha_publicacion']
        verbose_name = 'Artículo'
        verbose_name_plural = 'Artículos'

    def __str__(self):
        return self.titulo

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = f"{slugify(self.titulo)}-{uuid.uuid4().hex[:4]}"
        
        # Calcular tiempo de lectura aproximado (200 palabras por minuto)
        word_count = len(self.contenido.split())
        self.tiempo_lectura = max(1, round(word_count / 200))
        
        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('articulo-detail', kwargs={'slug': self.slug})

class ArticuloCategoria(models.Model):
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    es_principal = models.BooleanField(default=False)
    orden = models.IntegerField(default=0)
    fecha_asociacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('articulo', 'categoria')
        ordering = ['-es_principal', 'orden']
        verbose_name = 'Artículo-Categoría'
        verbose_name_plural = 'Artículos-Categorías'

    def __str__(self):
        return f"{self.articulo} - {self.categoria}"

class ArticuloEtiqueta(models.Model):
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE)
    etiqueta = models.ForeignKey(Etiqueta, on_delete=models.CASCADE)
    relevancia = models.FloatField(default=1.0)
    fecha_asociacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('articulo', 'etiqueta')
        ordering = ['-relevancia']
        verbose_name = 'Artículo-Etiqueta'
        verbose_name_plural = 'Artículos-Etiquetas'

    def __str__(self):
        return f"{self.articulo} - {self.etiqueta} (relevancia: {self.relevancia})"

class Comentario(models.Model):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado'),
    ]

    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='comentarios')
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='comentarios')
    contenido = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='respuestas')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fecha']
        verbose_name = 'Comentario'
        verbose_name_plural = 'Comentarios'

    def __str__(self):
        return f"Comentario de {self.usuario} en {self.articulo}"

class Adjunto(models.Model):
    TIPO_CHOICES = [
        ('imagen', 'Imagen'),
        ('documento', 'Documento'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('otro', 'Otro'),
    ]

    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='adjuntos')
    url = models.URLField(max_length=255)
    tipo = models.CharField(max_length=50, choices=TIPO_CHOICES)
    descripcion = models.TextField(blank=True, null=True)
    orden = models.IntegerField(default=0)
    fecha_subida = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['orden']
        verbose_name = 'Adjunto'
        verbose_name_plural = 'Adjuntos'

    def __str__(self):
        return f"{self.get_tipo_display()} para {self.articulo}"

class VersionArticulo(models.Model):
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='versiones')
    contenido = models.TextField()
    fecha_version = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='versiones_articulos')
    motivo_cambio = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha_version']
        verbose_name = 'Versión de Artículo'
        verbose_name_plural = 'Versiones de Artículos'

    def __str__(self):
        return f"Versión del {self.fecha_version} para {self.articulo}"

class ArticuloRelacionado(models.Model):
    TIPO_RELACION_CHOICES = [
        ('similar', 'Similar'),
        ('complementario', 'Complementario'),
        ('serie', 'Serie'),
        ('actualizacion', 'Actualización'),
    ]

    articulo_origen = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='relaciones_salientes')
    articulo_destino = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='relaciones_entrantes')
    tipo_relacion = models.CharField(max_length=50, choices=TIPO_RELACION_CHOICES)
    orden = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('articulo_origen', 'articulo_destino')
        ordering = ['tipo_relacion', 'orden']
        verbose_name = 'Artículo Relacionado'
        verbose_name_plural = 'Artículos Relacionados'

    def __str__(self):
        return f"{self.articulo_origen} → {self.articulo_destino} ({self.get_tipo_relacion_display()})"

class MetadatoSEO(models.Model):
    articulo = models.OneToOneField(Articulo, on_delete=models.CASCADE, related_name='metadatos_seo')
    meta_titulo = models.CharField(max_length=255, blank=True, null=True)
    meta_descripcion = models.CharField(max_length=255, blank=True, null=True)
    palabras_clave = models.TextField(blank=True, null=True)
    schema_markup = models.TextField(blank=True, null=True)
    og_image = models.URLField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Metadato SEO'
        verbose_name_plural = 'Metadatos SEO'

    def __str__(self):
        return f"Metadatos SEO para {self.articulo}"

class VotoArticulo(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votos_articulos')
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='votos')
    puntuacion = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('usuario', 'articulo')
        verbose_name = 'Voto de Artículo'
        verbose_name_plural = 'Votos de Artículos'

    def __str__(self):
        return f"Voto de {self.usuario} para {self.articulo}: {self.puntuacion}/5"

    def clean(self):
        from django.core.exceptions import ValidationError
        if not 1 <= self.puntuacion <= 5:
            raise ValidationError('La puntuación debe estar entre 1 y 5')

class HistorialLectura(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='historial_lectura')
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='lecturas')
    fecha_acceso = models.DateTimeField(auto_now_add=True)
    tiempo_lectura = models.IntegerField(blank=True, null=True)  # en segundos
    completado = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('usuario', 'articulo', 'fecha_acceso')
        ordering = ['-fecha_acceso']
        verbose_name = 'Historial de Lectura'
        verbose_name_plural = 'Historiales de Lectura'

    def __str__(self):
        return f"Lectura de {self.usuario} en {self.articulo}"

class Newsletter(models.Model):
    FRECUENCIA_CHOICES = [
        ('diario', 'Diario'),
        ('semanal', 'Semanal'),
        ('mensual', 'Mensual'),
    ]

    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    fecha_subscripcion = models.DateTimeField(auto_now_add=True)
    token_confirmacion = models.CharField(max_length=100, blank=True, null=True)
    confirmado = models.BooleanField(default=False)
    preferencias = models.JSONField(default=dict, blank=True)
    frecuencia = models.CharField(max_length=10, choices=FRECUENCIA_CHOICES, default='semanal')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Suscriptor de Newsletter'
        verbose_name_plural = 'Suscriptores de Newsletter'

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.token_confirmacion and not self.confirmado:
            self.token_confirmacion = uuid.uuid4().hex
        super().save(*args, **kwargs) """


from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.urls import reverse
from django.utils import timezone  # Añade esta línea con las otras importaciones

import uuid

User = get_user_model()

class Categoria(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    icono = models.CharField(max_length=50, blank=True, null=True)
    color = models.CharField(max_length=20, blank=True, null=True)
    parent = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, related_name='subcategorias')
    orden = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['orden', 'nombre']
        verbose_name = 'Categoría'
        verbose_name_plural = 'Categorías'

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

class Etiqueta(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    nombre = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    descripcion = models.TextField(blank=True, null=True)
    tipo = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['nombre']
        verbose_name = 'Etiqueta'
        verbose_name_plural = 'Etiquetas'

    def __str__(self):
        return self.nombre

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

class Articulo(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    ESTADO_CHOICES = [
        ('borrador', 'Borrador'),
        ('revision', 'En Revisión'),
        ('publicado', 'Publicado'),
        ('archivado', 'Archivado'),
    ]

    titulo = models.CharField(max_length=255)
    subtitulo = models.CharField(max_length=255, blank=True, null=True)
    contenido = models.TextField()
    resumen = models.TextField(blank=True, null=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    fecha_publicacion = models.DateTimeField(blank=True, null=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    tiempo_lectura = models.IntegerField(blank=True, null=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='borrador')
    imagen_portada_url = models.URLField(max_length=255, blank=True, null=True)
    visitas = models.IntegerField(default=0)
    destacado = models.BooleanField(default=False)
    autor = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='articulos')
    categorias = models.ManyToManyField(Categoria, through='ArticuloCategoria', related_name='articulos')
    etiquetas = models.ManyToManyField(Etiqueta, through='ArticuloEtiqueta', related_name='articulos')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fecha_publicacion']
        verbose_name = 'Artículo'
        verbose_name_plural = 'Artículos'

    def __str__(self):
        return self.titulo

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = f"{slugify(self.titulo)}-{uuid.uuid4().hex[:4]}"
        
        word_count = len(self.contenido.split())
        self.tiempo_lectura = max(1, round(word_count / 200))
        
         # Establecer fecha_publicacion si el estado cambia a 'publicado'
        if self.estado == 'publicado' and not self.fecha_publicacion:
            self.fecha_publicacion = timezone.now()
        # Opcional: Limpiar fecha_publicacion si se despublica
        #elif self.estado != 'publicado' and self.fecha_publicacion:
        #    self.fecha_publicacion = None

        super().save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('articulo-detail', kwargs={'slug': self.slug})

class ArticuloCategoria(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    articulo = models.ForeignKey(
        Articulo, 
        on_delete=models.CASCADE,
        db_column='articulo_id'
    )
    categoria = models.ForeignKey(
        Categoria, 
        on_delete=models.CASCADE,
        db_column='categoria_id'
    )
    es_principal = models.BooleanField(default=False)
    orden = models.IntegerField(default=0)
    fecha_asociacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('articulo', 'categoria')
        ordering = ['-es_principal', 'orden']
        verbose_name = 'Artículo-Categoría'
        verbose_name_plural = 'Artículos-Categorías'

    def __str__(self):
        return f"{self.articulo} - {self.categoria}"

class ArticuloEtiqueta(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    articulo = models.ForeignKey(
        Articulo, 
        on_delete=models.CASCADE,
        db_column='articulo_id'
    )
    etiqueta = models.ForeignKey(
        Etiqueta, 
        on_delete=models.CASCADE,
        db_column='etiqueta_id'
    )
    relevancia = models.FloatField(default=1.0)
    fecha_asociacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('articulo', 'etiqueta')
        ordering = ['-relevancia']
        verbose_name = 'Artículo-Etiqueta'
        verbose_name_plural = 'Artículos-Etiquetas'

    def __str__(self):
        return f"{self.articulo} - {self.etiqueta} (relevancia: {self.relevancia})"

class Comentario(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('aprobado', 'Aprobado'),
        ('rechazado', 'Rechazado'),
    ]

    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='comentarios')
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='comentarios')
    contenido = models.TextField()
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='respuestas')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-fecha']
        verbose_name = 'Comentario'
        verbose_name_plural = 'Comentarios'

    def __str__(self):
        return f"Comentario de {self.usuario} en {self.articulo}"

class Adjunto(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    TIPO_CHOICES = [
        ('imagen', 'Imagen'),
        ('documento', 'Documento'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('otro', 'Otro'),
    ]

    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='adjuntos')
    url = models.URLField(max_length=255)
    tipo = models.CharField(max_length=50, choices=TIPO_CHOICES)
    descripcion = models.TextField(blank=True, null=True)
    orden = models.IntegerField(default=0)
    fecha_subida = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['orden']
        verbose_name = 'Adjunto'
        verbose_name_plural = 'Adjuntos'

    def __str__(self):
        return f"{self.get_tipo_display()} para {self.articulo}"

class VersionArticulo(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='versiones')
    contenido = models.TextField()
    fecha_version = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='versiones_articulos')
    motivo_cambio = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-fecha_version']
        verbose_name = 'Versión de Artículo'
        verbose_name_plural = 'Versiones de Artículos'

    def __str__(self):
        return f"Versión del {self.fecha_version} para {self.articulo}"

class ArticuloRelacionado(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    TIPO_RELACION_CHOICES = [
        ('similar', 'Similar'),
        ('complementario', 'Complementario'),
        ('serie', 'Serie'),
        ('actualizacion', 'Actualización'),
    ]

    articulo_origen = models.ForeignKey(
        Articulo, 
        on_delete=models.CASCADE, 
        related_name='relaciones_salientes',
        db_column='articulo_origen_id'
    )
    articulo_destino = models.ForeignKey(
        Articulo, 
        on_delete=models.CASCADE, 
        related_name='relaciones_entrantes',
        db_column='articulo_destino_id'
    )
    tipo_relacion = models.CharField(max_length=50, choices=TIPO_RELACION_CHOICES)
    orden = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('articulo_origen', 'articulo_destino')
        ordering = ['tipo_relacion', 'orden']
        verbose_name = 'Artículo Relacionado'
        verbose_name_plural = 'Artículos Relacionados'

    def __str__(self):
        return f"{self.articulo_origen} → {self.articulo_destino} ({self.get_tipo_relacion_display()})"

class MetadatoSEO(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    articulo = models.OneToOneField(Articulo, on_delete=models.CASCADE, related_name='metadatos_seo')
    meta_titulo = models.CharField(max_length=255, blank=True, null=True)
    meta_descripcion = models.CharField(max_length=255, blank=True, null=True)
    palabras_clave = models.TextField(blank=True, null=True)
    schema_markup = models.TextField(blank=True, null=True)
    og_image = models.URLField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Metadato SEO'
        verbose_name_plural = 'Metadatos SEO'

    def __str__(self):
        return f"Metadatos SEO para {self.articulo}"

class VotoArticulo(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='votos_articulos')
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='votos')
    puntuacion = models.IntegerField()
    fecha = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('usuario', 'articulo')
        verbose_name = 'Voto de Artículo'
        verbose_name_plural = 'Votos de Artículos'

    def __str__(self):
        return f"Voto de {self.usuario} para {self.articulo}: {self.puntuacion}/5"

    def clean(self):
        from django.core.exceptions import ValidationError
        if not 1 <= self.puntuacion <= 5:
            raise ValidationError('La puntuación debe estar entre 1 y 5')

class HistorialLectura(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='historial_lectura')
    articulo = models.ForeignKey(Articulo, on_delete=models.CASCADE, related_name='lecturas')
    fecha_acceso = models.DateTimeField(auto_now_add=True)
    tiempo_lectura = models.IntegerField(blank=True, null=True)
    completado = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('usuario', 'articulo', 'fecha_acceso')
        ordering = ['-fecha_acceso']
        verbose_name = 'Historial de Lectura'
        verbose_name_plural = 'Historiales de Lectura'

    def __str__(self):
        return f"Lectura de {self.usuario} en {self.articulo}"

class Newsletter(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        db_column='id'
    )
    FRECUENCIA_CHOICES = [
        ('diario', 'Diario'),
        ('semanal', 'Semanal'),
        ('mensual', 'Mensual'),
    ]

    email = models.EmailField(unique=True)
    nombre = models.CharField(max_length=100, blank=True, null=True)
    fecha_subscripcion = models.DateTimeField(auto_now_add=True)
    token_confirmacion = models.CharField(max_length=100, blank=True, null=True)
    confirmado = models.BooleanField(default=False)
    preferencias = models.JSONField(default=dict, blank=True)
    frecuencia = models.CharField(max_length=10, choices=FRECUENCIA_CHOICES, default='semanal')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Suscriptor de Newsletter'
        verbose_name_plural = 'Suscriptores de Newsletter'

    def __str__(self):
        return self.email

    def save(self, *args, **kwargs):
        if not self.token_confirmacion and not self.confirmado:
            self.token_confirmacion = uuid.uuid4().hex
        super().save(*args, **kwargs)