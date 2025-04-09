from rest_framework import serializers
from .models import (
    Categoria, Etiqueta, Articulo, ArticuloCategoria, ArticuloEtiqueta,
    Comentario, Adjunto, VersionArticulo, ArticuloRelacionado,
    MetadatoSEO, VotoArticulo, HistorialLectura, Newsletter
)
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = '__all__'

class ArticuloSerializer(serializers.ModelSerializer):
    autor = UserSerializer(read_only=True)
    categorias = CategoriaSerializer(many=True, read_only=True)
    etiquetas = EtiquetaSerializer(many=True, read_only=True)
    tiempo_lectura_minutos = serializers.SerializerMethodField()
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)

    class Meta:
        model = Articulo
        fields = '__all__'
        read_only_fields = ['slug', 'visitas', 'tiempo_lectura', 'fecha_actualizacion']

    def get_tiempo_lectura_minutos(self, obj):
        return f"{obj.tiempo_lectura} min" if obj.tiempo_lectura else None

class ArticuloCreateSerializer(serializers.ModelSerializer):
    categorias = serializers.ListField(
        child=serializers.UUIDField(),
        write_only=True,
        required=False,
        help_text="Lista de IDs de categorías"
    )
    etiquetas = serializers.ListField(
        child=serializers.UUIDField(),
        write_only=True,
        required=False,
        help_text="Lista de IDs de etiquetas"
    )
    class Meta:
        model = Articulo
        fields = ['titulo', 'subtitulo', 'contenido', 'resumen', 'estado', 'imagen_portada_url', 'destacado','categorias', 'etiquetas']

    def validate_categorias(self, value):
        """Validación para categorías"""
        if value:
            categorias_existentes = Categoria.objects.filter(id__in=value)
            if len(categorias_existentes) != len(value):
                ids_existentes = set(str(c.id) for c in categorias_existentes)
                ids_faltantes = [str(id) for id in value if str(id) not in ids_existentes]
                raise serializers.ValidationError(
                    f"Las siguientes categorías no existen: {', '.join(ids_faltantes)}"
                )
        return value

    def validate_etiquetas(self, value):
        """Validación para etiquetas"""
        if value:
            etiquetas_existentes = Etiqueta.objects.filter(id__in=value)
            if len(etiquetas_existentes) != len(value):
                ids_existentes = set(str(e.id) for e in etiquetas_existentes)
                ids_faltantes = [str(id) for id in value if str(id) not in ids_existentes]
                raise serializers.ValidationError(
                    f"Las siguientes etiquetas no existen: {', '.join(ids_faltantes)}"
                )
        return value


class ArticuloCategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticuloCategoria
        fields = '__all__'

class ArticuloEtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ArticuloEtiqueta
        fields = '__all__'

class ComentarioSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)
    estado_display = serializers.CharField(source='get_estado_display', read_only=True)
    respuestas = serializers.SerializerMethodField()

    class Meta:
        model = Comentario
        fields = '__all__'

    def get_respuestas(self, obj):
        respuestas = obj.respuestas.filter(estado='aprobado').order_by('fecha')
        return ComentarioSerializer(respuestas, many=True).data

class ComentarioCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comentario
        fields = ['contenido', 'parent']

class AdjuntoSerializer(serializers.ModelSerializer):
    tipo_display = serializers.CharField(source='get_tipo_display', read_only=True)

    class Meta:
        model = Adjunto
        fields = '__all__'

class VersionArticuloSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)

    class Meta:
        model = VersionArticulo
        fields = '__all__'

class ArticuloRelacionadoSerializer(serializers.ModelSerializer):
    articulo_origen = ArticuloSerializer(read_only=True)
    articulo_destino = ArticuloSerializer(read_only=True)
    tipo_relacion_display = serializers.CharField(source='get_tipo_relacion_display', read_only=True)

    class Meta:
        model = ArticuloRelacionado
        fields = '__all__'

class MetadatoSEOSerializer(serializers.ModelSerializer):
    class Meta:
        model = MetadatoSEO
        fields = '__all__'

class VotoArticuloSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)

    class Meta:
        model = VotoArticulo
        fields = '__all__'

    def validate_puntuacion(self, value):
        if not 1 <= value <= 5:
            raise serializers.ValidationError("La puntuación debe estar entre 1 y 5")
        return value

class HistorialLecturaSerializer(serializers.ModelSerializer):
    usuario = UserSerializer(read_only=True)

    class Meta:
        model = HistorialLectura
        fields = '__all__'

class NewsletterSerializer(serializers.ModelSerializer):
    frecuencia_display = serializers.CharField(source='get_frecuencia_display', read_only=True)

    class Meta:
        model = Newsletter
        fields = '__all__'