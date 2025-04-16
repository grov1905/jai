-- Insertar usuarios (necesarios como autores)


-- Insertar categorías
INSERT INTO blog_categoria (id, nombre, slug, descripcion, icono, color, orden, created_at, updated_at, parent_id) VALUES
(1, 'Tecnología', 'tecnologia', 'Artículos sobre tecnología y innovación', 'computer', '#3b82f6', 1, NOW(), NOW(), NULL),
(2, 'Inteligencia Artificial', 'inteligencia-artificial', 'Avances en IA y machine learning', 'robot', '#ef4444', 2, NOW(), NOW(), 1),
(3, 'Negocios', 'negocios', 'Noticias y análisis de negocios', 'briefcase', '#10b981', 3, NOW(), NOW(), NULL),
(4, 'Eventos', 'eventos', 'Próximos eventos y conferencias', 'calendar', '#f59e0b', 4, NOW(), NOW(), NULL),
(5, 'Desarrollo Web', 'desarrollo-web', 'Tutoriales y noticias sobre desarrollo web', 'code', '#8b5cf6', 5, NOW(), NOW(), 1);

-- Insertar etiquetas
INSERT INTO blog_etiqueta (id, nombre, slug, descripcion, tipo, created_at, updated_at) VALUES
(1, 'ChatGPT', 'chatgpt', 'Artículos relacionados con ChatGPT', 'tema', NOW(), NOW()),
(2, 'Conferencia', 'conferencia', 'Eventos tipo conferencia', 'evento', NOW(), NOW()),
(3, 'JavaScript', 'javascript', 'Contenido sobre JavaScript', 'tecnologia', NOW(), NOW()),
(4, 'Startups', 'startups', 'Empresas emergentes y emprendimiento', 'negocio', NOW(), NOW()),
(5, 'Google', 'google', 'Noticias sobre Google', 'empresa', NOW(), NOW()),
(6, 'React', 'react', 'Biblioteca de JavaScript para interfaces', 'tecnologia', NOW(), NOW()),
(7, 'Finanzas', 'finanzas', 'Temas financieros y económicos', 'negocio', NOW(), NOW()),
(8, 'Workshop', 'workshop', 'Eventos tipo taller práctico', 'evento', NOW(), NOW()),
(9, 'Python', 'python', 'Lenguaje de programación Python', 'tecnologia', NOW(), NOW()),
(10, 'Innovación', 'innovacion', 'Temas sobre innovación tecnológica', 'tema', NOW(), NOW());

-- Insertar artículos (10 artículos del último mes)
INSERT INTO blog_articulo (id, titulo, subtitulo, contenido, resumen, slug, fecha_publicacion, fecha_actualizacion, tiempo_lectura, estado, imagen_portada_url, visitas, destacado, created_at, updated_at, autor_id) VALUES
(1, 'Avances revolucionarios en ChatGPT-5', 'OpenAI presenta su nuevo modelo de lenguaje', 'Contenido detallado sobre las nuevas capacidades de ChatGPT-5...', 'Resumen de las características principales de ChatGPT-5', 'avances-chatgpt5', NOW() - INTERVAL '15 days', NOW() - INTERVAL '14 days', 8, 'publicado', 'https://example.com/images/chatgpt5.jpg', 1250, true, NOW() - INTERVAL '15 days', NOW() - INTERVAL '14 days', 1),
(2, 'Guía completa de React 18', 'Nuevas características y mejoras', 'Tutorial detallado sobre las novedades de React 18...', 'Resumen de las principales características de React 18', 'guia-react18', NOW() - INTERVAL '12 days', NOW() - INTERVAL '10 days', 12, 'publicado', 'https://example.com/images/react18.jpg', 980, true, NOW() - INTERVAL '12 days', NOW() - INTERVAL '10 days', 2),
(3, 'Conferencia anual de IA en Barcelona', 'Evento reunirá a los mayores expertos en inteligencia artificial', 'Detalles sobre la próxima conferencia de IA...', 'Resumen del evento y ponentes confirmados', 'conferencia-ia-barcelona', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', 5, 'publicado', 'https://example.com/images/ia-conference.jpg', 750, false, NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days', 3),
(4, 'Las startups tecnológicas que están cambiando el mundo', '10 empresas emergentes que están revolucionando sus industrias', 'Análisis de startups innovadoras...', 'Listado de startups prometedoras', 'startups-cambiando-mundo', NOW() - INTERVAL '8 days', NOW() - INTERVAL '7 days', 10, 'publicado', 'https://example.com/images/startups.jpg', 620, false, NOW() - INTERVAL '8 days', NOW() - INTERVAL '7 days', 1),
(5, 'Workshop práctico de Python para análisis de datos', 'Aprende a usar Python para análisis de datos en este taller intensivo', 'Descripción del workshop y temas a cubrir...', 'Información sobre el workshop de Python', 'workshop-python-datos', NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days', 6, 'publicado', 'https://example.com/images/python-workshop.jpg', 430, false, NOW() - INTERVAL '25 days', NOW() - INTERVAL '25 days', 2),
(6, 'Google anuncia nuevas herramientas para desarrolladores', 'Nuevas APIs y servicios en la Google Cloud', 'Detalles sobre los nuevos lanzamientos de Google...', 'Resumen de las nuevas herramientas para devs', 'google-nuevas-herramientas', NOW() - INTERVAL '18 days', NOW() - INTERVAL '17 days', 7, 'publicado', 'https://example.com/images/google-tools.jpg', 890, false, NOW() - INTERVAL '18 days', NOW() - INTERVAL '17 days', 3),
(7, 'Tendencias en fintech para 2023', 'Cómo la tecnología está transformando las finanzas', 'Análisis de las principales tendencias fintech...', 'Resumen de tendencias en tecnología financiera', 'tendencias-fintech-2023', NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days', 9, 'publicado', 'https://example.com/images/fintech.jpg', 540, false, NOW() - INTERVAL '10 days', NOW() - INTERVAL '9 days', 1),
(8, 'JavaScript vs TypeScript: ¿Cuál elegir en 2023?', 'Comparativa detallada entre ambos lenguajes', 'Análisis técnico comparando JavaScript y TypeScript...', 'Resumen de las diferencias clave', 'javascript-vs-typescript', NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', 11, 'publicado', 'https://example.com/images/js-ts.jpg', 710, true, NOW() - INTERVAL '5 days', NOW() - INTERVAL '4 days', 2),
(9, 'Innovación en energías renovables', 'Tecnologías emergentes para un futuro sostenible', 'Reportaje sobre las últimas innovaciones en energías limpias...', 'Resumen de avances en energías renovables', 'innovacion-energias-renovables', NOW() - INTERVAL '22 days', NOW() - INTERVAL '21 days', 8, 'publicado', 'https://example.com/images/energias.jpg', 680, false, NOW() - INTERVAL '22 days', NOW() - INTERVAL '21 days', 3),
(10, 'Cómo prepararse para la próxima recesión económica', 'Consejos de expertos para proteger tus finanzas', 'Guía práctica para navegar en tiempos económicos difíciles...', 'Resumen de estrategias financieras', 'preparacion-recesion', NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', 10, 'publicado', 'https://example.com/images/recesion.jpg', 920, false, NOW() - INTERVAL '2 days', NOW() - INTERVAL '1 day', 1);

-- Asociar artículos a categorías
INSERT INTO blog_articulocategoria (id, es_principal, orden, fecha_asociacion, articulo_id, categoria_id) VALUES
(1, true, 1, NOW(), 1, 2),
(2, true, 1, NOW(), 2, 5),
(3, true, 1, NOW(), 3, 4),
(4, false, 2, NOW(), 3, 2),
(5, true, 1, NOW(), 4, 3),
(6, false, 2, NOW(), 4, 1),
(7, true, 1, NOW(), 5, 1),
(8, false, 2, NOW(), 5, 5),
(9, true, 1, NOW(), 6, 1),
(10, true, 1, NOW(), 7, 3),
(11, true, 1, NOW(), 8, 5),
(12, true, 1, NOW(), 9, 1),
(13, true, 1, NOW(), 10, 3);

-- Asociar artículos a etiquetas (versión corregida)
INSERT INTO blog_articuloetiqueta (id, relevancia, fecha_asociacion, articulo_id, etiqueta_id) VALUES
(1, 1.0, NOW(), 1, 1),
(2, 0.8, NOW(), 1, 10),
(3, 1.0, NOW(), 2, 3),
(4, 0.9, NOW(), 2, 6),
(5, 1.0, NOW(), 3, 2),
(6, 0.7, NOW(), 3, 10),
(7, 1.0, NOW(), 4, 4),
(8, 0.8, NOW(), 4, 10),
(9, 1.0, NOW(), 5, 8),
(10, 0.9, NOW(), 5, 9),
(11, 1.0, NOW(), 6, 5),
(12, 1.0, NOW(), 7, 7),
(13, 1.0, NOW(), 8, 3),
(14, 1.0, NOW(), 9, 10),
(15, 1.0, NOW(), 10, 7);

-- Insertar metadatos SEO para los artículos
INSERT INTO blog_metadatoseo (id, meta_titulo, meta_descripcion, palabras_clave, schema_markup, og_image, created_at, updated_at, articulo_id) VALUES
(1, 'Novedades de ChatGPT-5 | TuSitioWeb', 'Descubre las revolucionarias capacidades del nuevo ChatGPT-5 de OpenAI', 'chatgpt, ia, openai, inteligencia artificial', NULL, 'https://example.com/images/chatgpt5-og.jpg', NOW(), NOW(), 1),
(2, 'Guía React 18 | Tutorial completo | TuSitioWeb', 'Aprende todas las novedades de React 18 con esta guía completa', 'react, javascript, frontend, desarrollo web', NULL, 'https://example.com/images/react18-og.jpg', NOW(), NOW(), 2),
(3, 'Conferencia IA Barcelona 2023 | TuSitioWeb', 'Evento con los mayores expertos en inteligencia artificial', 'conferencia, ia, inteligencia artificial, barcelona', NULL, 'https://example.com/images/ia-conference-og.jpg', NOW(), NOW(), 3),
(4, 'Startups tecnológicas innovadoras | TuSitioWeb', 'Descubre las startups que están cambiando el mundo', 'startups, tecnología, innovación, emprendimiento', NULL, 'https://example.com/images/startups-og.jpg', NOW(), NOW(), 4),
(5, 'Workshop Python para análisis de datos | TuSitioWeb', 'Taller práctico para aprender análisis de datos con Python', 'python, workshop, análisis datos, programación', NULL, 'https://example.com/images/python-workshop-og.jpg', NOW(), NOW(), 5),
(6, 'Nuevas herramientas Google para devs | TuSitioWeb', 'Google anuncia nuevas APIs y servicios para desarrolladores', 'google, desarrollo, apis, cloud', NULL, 'https://example.com/images/google-tools-og.jpg', NOW(), NOW(), 6),
(7, 'Tendencias Fintech 2023 | TuSitioWeb', 'Las principales tendencias en tecnología financiera para este año', 'fintech, finanzas, tecnología, bancos', NULL, 'https://example.com/images/fintech-og.jpg', NOW(), NOW(), 7),
(8, 'JavaScript vs TypeScript 2023 | TuSitioWeb', 'Comparativa detallada: ¿cuál elegir este año?', 'javascript, typescript, frontend, desarrollo web', NULL, 'https://example.com/images/js-ts-og.jpg', NOW(), NOW(), 8),
(9, 'Innovación en energías renovables | TuSitioWeb', 'Tecnologías emergentes para un futuro sostenible', 'energías, renovables, sostenibilidad, innovación', NULL, 'https://example.com/images/energias-og.jpg', NOW(), NOW(), 9),
(10, 'Cómo prepararse para la recesión | TuSitioWeb', 'Consejos expertos para proteger tus finanzas', 'recesión, economía, finanzas, consejos', NULL, 'https://example.com/images/recesion-og.jpg', NOW(), NOW(), 10);

-- Insertar artículos relacionados
INSERT INTO blog_articulorelacionado (id, tipo_relacion, orden, created_at, updated_at, articulo_destino_id, articulo_origen_id) VALUES
(1, 'similar', 1, NOW(), NOW(), 3, 1),
(2, 'complementario', 1, NOW(), NOW(), 8, 2),
(3, 'similar', 1, NOW(), NOW(), 7, 4),
(4, 'complementario', 1, NOW(), NOW(), 9, 5),
(5, 'similar', 1, NOW(), NOW(), 2, 6);

-- Insertar comentarios
INSERT INTO blog_comentario (id, contenido, fecha, estado, created_at, updated_at, articulo_id, parent_id, usuario_id) VALUES
(1, 'Excelente artículo, muy informativo sobre las nuevas capacidades', NOW() - INTERVAL '14 days', 'aprobado', NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', 1, NULL, 2),
(2, '¿Cuándo estará disponible para el público general?', NOW() - INTERVAL '14 days', 'aprobado', NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', 1, NULL, 3),
(3, 'Según OpenAI, en el tercer trimestre de 2023', NOW() - INTERVAL '13 days', 'aprobado', NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days', 1, 2, 1),
(4, 'Muy buena guía, me ayudó mucho con las nuevas features', NOW() - INTERVAL '9 days', 'aprobado', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days', 2, NULL, 1),
(5, 'Falta mencionar algunas startups prometedoras de Latam', NOW() - INTERVAL '7 days', 'aprobado', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', 4, NULL, 2),
(6, 'Yo prefiero TypeScript para proyectos grandes', NOW() - INTERVAL '4 days', 'aprobado', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', 8, NULL, 3),
(7, 'Muy útiles los consejos, gracias por el artículo', NOW() - INTERVAL '1 day', 'aprobado', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', 10, NULL, 1);

-- Insertar adjuntos
INSERT INTO blog_adjunto (id, url, tipo, descripcion, orden, fecha_subida, created_at, updated_at, articulo_id) VALUES
(1, 'https://example.com/docs/chatgpt5-whitepaper.pdf', 'documento', 'Whitepaper técnico de ChatGPT-5', 1, NOW(), NOW(), NOW(), 1),
(2, 'https://example.com/videos/react18-demo.mp4', 'video', 'Demo de las nuevas características', 1, NOW(), NOW(), NOW(), 2),
(3, 'https://example.com/docs/python-workshop-material.zip', 'documento', 'Material del workshop en PDF', 1, NOW(), NOW(), NOW(), 5),
(4, 'https://example.com/images/fintech-infographic.png', 'imagen', 'Infografía de tendencias Fintech', 1, NOW(), NOW(), NOW(), 7);

-- Insertar versiones de artículos
INSERT INTO blog_versionarticulo (id, contenido, fecha_version, motivo_cambio, created_at, articulo_id, usuario_id) VALUES
(1, 'Contenido original del artículo sobre ChatGPT-5...', NOW() - INTERVAL '15 days', 'Publicación inicial', NOW() - INTERVAL '15 days', 1, 1),
(2, 'Contenido actualizado con nueva información sobre API...', NOW() - INTERVAL '14 days', 'Actualización con detalles de API', NOW() - INTERVAL '14 days', 1, 1),
(3, 'Contenido original de la guía de React 18...', NOW() - INTERVAL '12 days', 'Publicación inicial', NOW() - INTERVAL '12 days', 2, 2),
(4, 'Contenido corregido con ejemplos adicionales...', NOW() - INTERVAL '10 days', 'Agregar ejemplos prácticos', NOW() - INTERVAL '10 days', 2, 2);

-- Insertar votos
INSERT INTO blog_votoarticulo (id, puntuacion, fecha, created_at, updated_at, articulo_id, usuario_id) VALUES
(1, 5, NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days', 2, 1),
(2, 4, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', 1, 2),
(3, 5, NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days', 1, 3),
(4, 5, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', 8, 2),
(5, 4, NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', 10, 1);

-- Insertar historial de lectura
INSERT INTO blog_historiallectura (id, fecha_acceso, tiempo_lectura, completado, created_at, updated_at, articulo_id, usuario_id) VALUES
(1, NOW() - INTERVAL '14 days', 480, true, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', 1, 1),
(2, NOW() - INTERVAL '14 days', 420, true, NOW() - INTERVAL '14 days', NOW() - INTERVAL '14 days', 1, 2),
(3, NOW() - INTERVAL '13 days', 360, true, NOW() - INTERVAL '13 days', NOW() - INTERVAL '13 days', 1, 3),
(4, NOW() - INTERVAL '9 days', 720, true, NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days', 2, 1),
(5, NOW() - INTERVAL '7 days', 600, false, NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', 4, 2),
(6, NOW() - INTERVAL '4 days', 660, true, NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', 8, 3);

-- Insertar suscriptores al newsletter
INSERT INTO blog_newsletter (id, email, nombre, fecha_subscripcion, token_confirmacion, confirmado, preferencias, frecuencia, created_at, updated_at) VALUES
(1, 'suscriptor1@example.com', 'Ana Martínez', NOW() - INTERVAL '30 days', 'token1', true, '{"categorias": [1, 2]}', 'diaria', NOW() - INTERVAL '30 days', NOW() - INTERVAL '30 days'),
(2, 'suscriptor2@example.com', 'Luis Rodríguez', NOW() - INTERVAL '20 days', 'token2', true, '{"categorias": [3]}', 'semanal', NOW() - INTERVAL '20 days', NOW() - INTERVAL '20 days'),
(3, 'suscriptor3@example.com', NULL, NOW() - INTERVAL '10 days', 'token3', false, '{"categorias": []}', 'mensual', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days');

-- Actualizar secuencias para que no haya conflictos con nuevos inserts
SELECT setval('blog_adjunto_id_seq', (SELECT MAX(id) FROM blog_adjunto));
SELECT setval('blog_articulo_id_seq', (SELECT MAX(id) FROM blog_articulo));
SELECT setval('blog_articulocategoria_id_seq', (SELECT MAX(id) FROM blog_articulocategoria));
SELECT setval('blog_articuloetiqueta_id_seq', (SELECT MAX(id) FROM blog_articuloetiqueta));
SELECT setval('blog_articulorelacionado_id_seq', (SELECT MAX(id) FROM blog_articulorelacionado));
SELECT setval('blog_categoria_id_seq', (SELECT MAX(id) FROM blog_categoria));
SELECT setval('blog_comentario_id_seq', (SELECT MAX(id) FROM blog_comentario));
SELECT setval('blog_etiqueta_id_seq', (SELECT MAX(id) FROM blog_etiqueta));
SELECT setval('blog_historiallectura_id_seq', (SELECT MAX(id) FROM blog_historiallectura));
SELECT setval('blog_metadatoseo_id_seq', (SELECT MAX(id) FROM blog_metadatoseo));
SELECT setval('blog_newsletter_id_seq', (SELECT MAX(id) FROM blog_newsletter));
SELECT setval('blog_versionarticulo_id_seq', (SELECT MAX(id) FROM blog_versionarticulo));
SELECT setval('blog_votoarticulo_id_seq', (SELECT MAX(id) FROM blog_votoarticulo));

