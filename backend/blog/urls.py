from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoriaViewSet, EtiquetaViewSet, ArticuloViewSet, 
    ComentarioViewSet, VotoArticuloViewSet, NewsletterViewSet
)

router = DefaultRouter()
router.register(r'categorias', CategoriaViewSet)
router.register(r'etiquetas', EtiquetaViewSet)
router.register(r'articulos', ArticuloViewSet)
router.register(r'comentarios', ComentarioViewSet)
router.register(r'votos', VotoArticuloViewSet)
router.register(r'newsletters', NewsletterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]