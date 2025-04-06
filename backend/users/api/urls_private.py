# users/api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from users.api.views import (
    CustomTokenObtainPairView,
    UserViewSet,
    RolViewSet,
    PermisoViewSet,
    UsuarioRolViewSet,
    RolPermisoViewSet,
    CurrentUserView,
    UserRolesView,
    RolPermissionsView
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'roles', RolViewSet, basename='role')
router.register(r'permissions', PermisoViewSet, basename='permission')
router.register(r'user-roles', UsuarioRolViewSet, basename='user-role')
router.register(r'role-permissions', RolPermisoViewSet, basename='role-permission')

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/me/', CurrentUserView.as_view(), name='current-user'),
    path('users/<int:pk>/roles/', UserRolesView.as_view(), name='user-roles'),
    path('roles/<int:rol_id>/permissions/', RolPermissionsView.as_view(), name='role-permissions')
]