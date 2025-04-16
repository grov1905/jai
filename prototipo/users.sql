-- 1. Activar la extensión pgcrypto (requerida para crypt())
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Limpieza inicial (opcional, descomentar si necesitas limpiar las tablas)
 TRUNCATE TABLE users_rolpermiso CASCADE;
 TRUNCATE TABLE users_usuario_rol CASCADE;
 TRUNCATE TABLE users_user CASCADE;
 TRUNCATE TABLE users_permiso CASCADE;
 TRUNCATE TABLE users_rol CASCADE;

-- 3. Insertar roles (users_rol)
INSERT INTO users_rol (nombre, descripcion, nivel_prioridad) VALUES
('Administrador', 'Acceso completo al sistema', 1),
('Editor', 'Puede editar contenido', 2),
('Autor', 'Puede crear contenido', 3),
('Lector', 'Puede leer contenido', 4),
('Invitado', 'Acceso limitado', 5);

-- 4. Insertar permisos (users_permiso)
INSERT INTO users_permiso (codigo, nombre, descripcion) VALUES
('crear_usuario', 'Crear usuarios', 'Permite crear nuevos usuarios'),
('editar_usuario', 'Editar usuarios', 'Permite modificar usuarios'),
('eliminar_usuario', 'Eliminar usuarios', 'Permite eliminar usuarios'),
('crear_contenido', 'Crear contenido', 'Permite crear nuevo contenido'),
('editar_contenido', 'Editar contenido', 'Permite modificar contenido');

-- 5. Insertar usuarios (users_user) - Versión CORREGIDA
INSERT INTO users_user (
    password,
    username,
    first_name,
    last_name,
    email,
    is_staff,
    is_active,
    is_superuser,
    date_joined,
    last_login,
    avatar_url,
    biografia,
    estado,
    phone,
    company
) VALUES
(
    crypt('AdminPass123', gen_salt('bf')), 
    'admin',
    'Juan',
    'Pérez',
    'admin@jaiexperts.com',
    TRUE,
    TRUE,
    TRUE,
    NOW(),
    NOW(),
    'https://example.com/avatars/admin.jpg',
    'Administrador principal del sistema',
    'activo',
    '+51987654321',
    'JAI Experts'
),
(
    crypt('EditorPass123', gen_salt('bf')),
    'editor',
    'María',
    'Gómez',
    'editor@jaiexperts.com',
    TRUE,
    TRUE,
    FALSE,
    NOW(),
    NOW() - INTERVAL '2 days',
    'https://example.com/avatars/maria.jpg',
    'Editora de contenido',
    'activo',
    '+51987654322',
    'JAI Experts'
),
(
    crypt('AutorPass123', gen_salt('bf')),
    'autor',
    'Carlos',
    'Ruiz',
    'autor@jaiexperts.com',
    FALSE,
    TRUE,
    FALSE,
    NOW(),
    NOW() - INTERVAL '1 week',
    NULL,
    'Autor de artículos',
    'activo',
    NULL,
    NULL
),
(
    crypt('LectorPass123', gen_salt('bf')),
    'lector',
    'Ana',
    'Torres',
    'lector@jaiexperts.com',
    FALSE,
    TRUE,
    FALSE,
    NOW(),
    NOW() - INTERVAL '3 days',
    'https://example.com/avatars/ana.jpg',
    'Lectora frecuente',
    'activo',
    '+51987654323',
    NULL
),
(
    crypt('InvitadoPass123', gen_salt('bf')),
    'invitado',
    'Pedro',
    'Sánchez',
    'invitado@jaiexperts.com',
    FALSE,
    FALSE,
    FALSE,
    NOW(),
    NOW() - INTERVAL '1 month',
    NULL,
    'Usuario invitado',
    'inactivo',
    NULL,
    NULL
);

-- 6. Asignar roles a usuarios (users_usuario_rol)
INSERT INTO users_usuariorol (usuario_id, rol_id, fecha_asignacion) VALUES
(1, 15, NOW()),
(2, 16, NOW()),
(3, 17, NOW()),
(4, 18, NOW()),
(5, 19, NOW());

-- 7. Asignar permisos a roles (users_rol_permiso)
INSERT INTO users_rolpermiso (rol_id, permiso_id) VALUES
(15, 11), (15, 12), (15, 13), (15, 14), (15, 15),
(16, 14), (16, 15),
(17, 14),
(18, 15);

-- 8. Consulta de verificación
SELECT 
    u.id,
    u.username,
    u.email,
    u.first_name || ' ' || u.last_name AS nombre_completo,
    u.estado,
    r.nombre AS rol,
    COUNT(p.id) AS total_permisos
FROM 
    users_user u
    JOIN users_usuariorol ur ON u.id = ur.usuario_id
    JOIN users_rol r ON ur.rol_id = r.id
    LEFT JOIN users_rolpermiso rp ON r.id = rp.rol_id
    LEFT JOIN users_permiso p ON rp.permiso_id = p.id
GROUP BY 
    u.id, u.username, u.email, u.first_name, u.last_name, u.estado, r.nombre
ORDER BY 
    u.id;