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
    RolPermissionsView,
    PasswordResetView
)

router = DefaultRouter()
router.register(r'usuarios', UserViewSet, basename='user')
router.register(r'roles', RolViewSet, basename='role')
router.register(r'permissions', PermisoViewSet, basename='permission')
router.register(r'user-roles', UsuarioRolViewSet, basename='user-role')
router.register(r'role-permissions', RolPermisoViewSet, basename='role-permission')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('me/', CurrentUserView.as_view(), name='current-user'),
    path('usuarios/<int:pk>/roles/', UserRolesView.as_view(), name='user-roles'),
    path('roles/<int:rol_id>/permissions/', RolPermissionsView.as_view(), name='role-permissions'),
    path('forgot-password/', PasswordResetView.as_view(), name='password-reset')


]