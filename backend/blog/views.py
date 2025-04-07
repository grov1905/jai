from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from django.db.models import Count, Avg, Q
from django.utils import timezone
from .models import (
    Categoria, Etiqueta, Articulo, ArticuloCategoria, ArticuloEtiqueta,
    Comentario, Adjunto, VersionArticulo, ArticuloRelacionado,
    MetadatoSEO, VotoArticulo, HistorialLectura, Newsletter
)
from .serializers import (
    CategoriaSerializer, EtiquetaSerializer, ArticuloSerializer, 
    ArticuloCreateSerializer, ArticuloCategoriaSerializer, ArticuloEtiquetaSerializer,
    ComentarioSerializer, ComentarioCreateSerializer, AdjuntoSerializer,
    VersionArticuloSerializer, ArticuloRelacionadoSerializer, MetadatoSEOSerializer,
    VotoArticuloSerializer, HistorialLecturaSerializer, NewsletterSerializer
)
from users.models import User

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def principales(self, request):
        categorias = Categoria.objects.filter(parent__isnull=True).annotate(
            num_articulos=Count('articulos', filter=Q(articulos__estado='publicado'))
        ).order_by('-num_articulos')[:10]
        serializer = self.get_serializer(categorias, many=True)
        return Response(serializer.data)

class EtiquetaViewSet(viewsets.ModelViewSet):
    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def populares(self, request):
        etiquetas = Etiqueta.objects.annotate(
            num_articulos=Count('articulos', filter=Q(articulos__estado='publicado'))
        ).order_by('-num_articulos')[:20]
        serializer = self.get_serializer(etiquetas, many=True)
        return Response(serializer.data)

class ArticuloViewSet(viewsets.ModelViewSet):
    queryset = Articulo.objects.all()
    serializer_class = ArticuloSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'destacados', 'recientes', 'por_categoria', 'por_etiqueta', 'buscar']:
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ArticuloCreateSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(autor=self.request.user)

    def perform_update(self, serializer):
        articulo = self.get_object()
        # Guardar versión anterior antes de actualizar
        VersionArticulo.objects.create(
            articulo=articulo,
            contenido=articulo.contenido,
            usuario=self.request.user,
            motivo_cambio=f"Actualización vía API - {self.request.data.get('motivo_cambio', 'Sin motivo especificado')}"
        )
        serializer.save()

    @action(detail=False, methods=['get'])
    def destacados(self, request):
        articulos = self.queryset.filter(
            estado='publicado',
            destacado=True,
            fecha_publicacion__lte=timezone.now()
        ).order_by('-fecha_publicacion')[:6]
        serializer = self.get_serializer(articulos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def recientes(self, request):
        articulos = self.queryset.filter(
            estado='publicado',
            fecha_publicacion__lte=timezone.now()
        ).order_by('-fecha_publicacion')[:10]
        serializer = self.get_serializer(articulos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='por-categoria/(?P<slug>[^/.]+)')
    def por_categoria(self, request, slug=None):
        categoria = get_object_or_404(Categoria, slug=slug)
        articulos = self.queryset.filter(
            estado='publicado',
            categorias__in=[categoria],
            fecha_publicacion__lte=timezone.now()
        ).order_by('-fecha_publicacion')
        serializer = self.get_serializer(articulos, many=True)
        return Response({
            'categoria': CategoriaSerializer(categoria).data,
            'articulos': serializer.data
        })

    @action(detail=False, methods=['get'], url_path='por-etiqueta/(?P<slug>[^/.]+)')
    def por_etiqueta(self, request, slug=None):
        etiqueta = get_object_or_404(Etiqueta, slug=slug)
        articulos = self.queryset.filter(
            estado='publicado',
            etiquetas__in=[etiqueta],
            fecha_publicacion__lte=timezone.now()
        ).order_by('-fecha_publicacion')
        serializer = self.get_serializer(articulos, many=True)
        return Response({
            'etiqueta': EtiquetaSerializer(etiqueta).data,
            'articulos': serializer.data
        })

    @action(detail=False, methods=['get'])
    def buscar(self, request):
        query = request.query_params.get('q', '')
        articulos = self.queryset.filter(
            Q(estado='publicado'),
            Q(fecha_publicacion__lte=timezone.now()),
            Q(titulo__icontains=query) | 
            Q(subtitulo__icontains=query) | 
            Q(contenido__icontains=query) |
            Q(resumen__icontains=query)
        ).order_by('-fecha_publicacion')
        serializer = self.get_serializer(articulos, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'], permission_classes=[AllowAny])
    def registrar_lectura(self, request, pk=None):
        articulo = self.get_object()
        user = request.user if request.user.is_authenticated else None
        
        if user:
            historial, created = HistorialLectura.objects.get_or_create(
                usuario=user,
                articulo=articulo,
                defaults={
                    'tiempo_lectura': request.data.get('tiempo_lectura'),
                    'completado': request.data.get('completado', False)
                }
            )
            if not created:
                historial.tiempo_lectura = request.data.get('tiempo_lectura', historial.tiempo_lectura)
                historial.completado = request.data.get('completado', historial.completado)
                historial.save()
            
            return Response({'status': 'lectura registrada'}, status=status.HTTP_200_OK)
        
        return Response({'status': 'lectura anónima no registrada'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['get'], permission_classes=[AllowAny])
    def visitar(self, request, pk=None):
        articulo = self.get_object()
        articulo.visitas += 1
        articulo.save()
        return Response({'visitas': articulo.visitas})

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ComentarioCreateSerializer
        return super().get_serializer_class()

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

    @action(detail=False, methods=['get'], url_path='por-articulo/(?P<articulo_id>[^/.]+)')
    def por_articulo(self, request, articulo_id=None):
        articulo = get_object_or_404(Articulo, pk=articulo_id)
        comentarios = self.queryset.filter(
            articulo=articulo,
            estado='aprobado',
            parent__isnull=True
        ).order_by('-fecha')
        serializer = self.get_serializer(comentarios, many=True)
        return Response(serializer.data)

class VotoArticuloViewSet(viewsets.ModelViewSet):
    queryset = VotoArticulo.objects.all()
    serializer_class = VotoArticuloSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        articulo_id = request.data.get('articulo')
        puntuacion = request.data.get('puntuacion')
        
        if not articulo_id or not puntuacion:
            return Response(
                {'error': 'Se requieren articulo y puntuacion'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        articulo = get_object_or_404(Articulo, pk=articulo_id)
        voto, created = VotoArticulo.objects.update_or_create(
            usuario=request.user,
            articulo=articulo,
            defaults={'puntuacion': puntuacion}
        )
        
        serializer = self.get_serializer(voto)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['get'], url_path='promedio/(?P<articulo_id>[^/.]+)', permission_classes=[AllowAny])
    def promedio(self, request, articulo_id=None):
        articulo = get_object_or_404(Articulo, pk=articulo_id)
        promedio = VotoArticulo.objects.filter(articulo=articulo).aggregate(
            promedio=Avg('puntuacion'),
            total=Count('id')
        )
        return Response(promedio)

class NewsletterViewSet(viewsets.ModelViewSet):
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response(
                {'error': 'El email es requerido'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        newsletter, created = Newsletter.objects.get_or_create(
            email=email,
            defaults={
                'nombre': request.data.get('nombre'),
                'preferencias': request.data.get('preferencias', {}),
                'frecuencia': request.data.get('frecuencia', 'semanal')
            }
        )
        
        if not created:
            newsletter.nombre = request.data.get('nombre', newsletter.nombre)
            newsletter.preferencias = request.data.get('preferencias', newsletter.preferencias)
            newsletter.frecuencia = request.data.get('frecuencia', newsletter.frecuencia)
            newsletter.save()
        
        serializer = self.get_serializer(newsletter)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'], url_path='confirmar/(?P<token>[^/.]+)')
    def confirmar(self, request, pk=None, token=None):
        newsletter = get_object_or_404(Newsletter, pk=pk, token_confirmacion=token)
        newsletter.confirmado = True
        newsletter.token_confirmacion = None
        newsletter.save()
        return Response({'status': 'confirmado'})