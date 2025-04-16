CREATE TABLE usuario (
    usuario_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    avatar_url VARCHAR(255),
    biografia TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP,
    estado VARCHAR(20) CHECK (estado IN ('activo', 'inactivo', 'suspendido')) DEFAULT 'activo'
);

CREATE TABLE rol (
    rol_id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL,
    descripcion TEXT,
    nivel_prioridad INT DEFAULT 0
);

CREATE TABLE permiso (
    permiso_id SERIAL PRIMARY KEY,
    codigo VARCHAR(100) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

CREATE TABLE usuario_rol (
    usuario_id INT REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    rol_id INT REFERENCES rol(rol_id) ON DELETE CASCADE,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, rol_id)
);

CREATE TABLE rol_permiso (
    rol_id INT REFERENCES rol(rol_id) ON DELETE CASCADE,
    permiso_id INT REFERENCES permiso(permiso_id) ON DELETE CASCADE,
    PRIMARY KEY (rol_id, permiso_id)
);




CREATE TABLE articulo (
    articulo_id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    subtitulo VARCHAR(255),
    contenido TEXT NOT NULL,
    resumen TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    fecha_publicacion TIMESTAMP,
    fecha_actualizacion TIMESTAMP,
    tiempo_lectura INT, -- en minutos
    estado VARCHAR(20) CHECK (estado IN ('borrador', 'revision', 'publicado', 'archivado')) DEFAULT 'borrador',
    imagen_portada_url VARCHAR(255),
    visitas INT DEFAULT 0,
    destacado BOOLEAN DEFAULT FALSE,
    autor_id INT REFERENCES usuario(usuario_id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_autor FOREIGN KEY (autor_id) REFERENCES usuario(usuario_id)

);

CREATE TABLE categoria (
    categoria_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    icono VARCHAR(50),
    color VARCHAR(20),
    parent_id INT REFERENCES categoria(categoria_id) ON DELETE SET NULL,
    orden INT DEFAULT 0
);

CREATE TABLE etiqueta (
    etiqueta_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50) -- ej: 'tema', 'ubicacion', 'persona'
);

CREATE TABLE articulo_categoria (
    articulo_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    categoria_id INT REFERENCES categoria(categoria_id) ON DELETE CASCADE,
    es_principal BOOLEAN DEFAULT FALSE,
    orden INT DEFAULT 0,
    fecha_asociacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (articulo_id, categoria_id)
);

CREATE TABLE articulo_etiqueta (
    articulo_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    etiqueta_id INT REFERENCES etiqueta(etiqueta_id) ON DELETE CASCADE,
    relevancia FLOAT DEFAULT 1.0,
    fecha_asociacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (articulo_id, etiqueta_id)
);




CREATE TABLE comentario (
    comentario_id SERIAL PRIMARY KEY,
    articulo_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    usuario_id INT REFERENCES usuario(usuario_id) ON DELETE SET NULL,
    contenido TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) CHECK (estado IN ('pendiente', 'aprobado', 'rechazado')) DEFAULT 'pendiente',
    parent_id INT REFERENCES comentario(comentario_id) ON DELETE CASCADE -- para respuestas
);

CREATE TABLE adjunto (
    adjunto_id SERIAL PRIMARY KEY,
    articulo_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    url VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL, -- 'imagen', 'documento', 'video'
    descripcion TEXT,
    orden INT DEFAULT 0,
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE version_articulo (
    version_id SERIAL PRIMARY KEY,
    articulo_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    contenido TEXT NOT NULL,
    fecha_version TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INT REFERENCES usuario(usuario_id) ON DELETE SET NULL,
    motivo_cambio VARCHAR(255)
);

CREATE TABLE articulo_relacionado (
    articulo_origen_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    articulo_destino_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    tipo_relacion VARCHAR(50) NOT NULL, -- 'similar', 'complementario', 'serie'
    orden INT DEFAULT 0,
    PRIMARY KEY (articulo_origen_id, articulo_destino_id)
);

CREATE TABLE metadato_seo (
    articulo_id INT PRIMARY KEY REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    meta_titulo VARCHAR(255),
    meta_descripcion VARCHAR(255),
    palabras_clave TEXT,
    schema_markup TEXT,
    og_image VARCHAR(255)
);

CREATE TABLE voto_articulo (
    usuario_id INT REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    articulo_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    puntuacion INT CHECK (puntuacion BETWEEN 1 AND 5),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, articulo_id)
);

CREATE TABLE historial_lectura (
    usuario_id INT REFERENCES usuario(usuario_id) ON DELETE CASCADE,
    articulo_id INT REFERENCES articulo(articulo_id) ON DELETE CASCADE,
    fecha_acceso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tiempo_lectura INT, -- en segundos
    completado BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (usuario_id, articulo_id, fecha_acceso)
);

CREATE TABLE newsletter (
    email VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(100),
    fecha_subscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    token_confirmacion VARCHAR(100),
    confirmado BOOLEAN DEFAULT FALSE,
    preferencias JSONB -- ej: {"categorias": [1, 3], "frecuencia": "semanal"}
);



CREATE INDEX idx_articulo_autor ON articulo(autor_id);
CREATE INDEX idx_articulo_estado ON articulo(estado);
CREATE INDEX idx_articulo_fecha ON articulo(fecha_publicacion);
CREATE INDEX idx_articulo_slug ON articulo(slug);


CREATE VIEW vista_articulos_completos AS
SELECT a.*, 
       STRING_AGG(DISTINCT c.nombre, ', ') AS categorias,
       u.nombre AS autor_nombre
FROM articulo a
LEFT JOIN articulo_categoria ac ON a.articulo_id = ac.articulo_id
LEFT JOIN categoria c ON ac.categoria_id = c.categoria_id
LEFT JOIN usuario u ON a.autor_id = u.usuario_id
GROUP BY a.articulo_id, u.nombre;


CREATE OR REPLACE FUNCTION actualizar_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
   NEW.fecha_actualizacion = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_actualizar_articulo
BEFORE UPDATE ON articulo
FOR EACH ROW EXECUTE FUNCTION actualizar_fecha_actualizacion();