import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import RichTextEditor from '../RichTextEditor/RichTextEditor';
import './FormArticle.css';

const articleSchema = yup.object().shape({
  titulo: yup.string().required('El título es requerido').max(200),
  subtitulo: yup.string().max(300),
  contenido: yup.string().required('El contenido es requerido'),
  resumen: yup.string().required('El resumen es requerido').max(500),
  estado: yup.string().required('El estado es requerido'),
  imagen_portada_url: yup.string().url('Debe ser una URL válida'),
  destacado: yup.boolean(),
  categorias: yup.array().min(1, 'Selecciona al menos una categoría'),
  etiquetas: yup.array(),
});

const FormArticle = ({ 
  onSubmit, 
  initialData = null, 
  categories = [], 
  tags = [], 
  onCancel 
}) => {
  const [content, setContent] = useState(initialData?.contenido || '');
  const [selectedCategories, setSelectedCategories] = useState(
    initialData?.categorias?.map(c => c.id) || []
  );
  const [selectedTags, setSelectedTags] = useState(
    initialData?.etiquetas?.map(t => t.id) || []
  );
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(articleSchema),
    defaultValues: initialData || {
      titulo: '',
      subtitulo: '',
      resumen: '',
      estado: 'borrador',
      imagen_portada_url: '',
      destacado: false,
    }
  });

  useEffect(() => {
    register('contenido');
    register('categorias');
    register('etiquetas');
  }, [register]);

  useEffect(() => {
    setValue('contenido', content);
  }, [content, setValue]);

  useEffect(() => {
    setValue('categorias', selectedCategories);
  }, [selectedCategories, setValue]);

  useEffect(() => {
    setValue('etiquetas', selectedTags);
  }, [selectedTags, setValue]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId) 
        : [...prev, categoryId]
    );
  };

  const handleTagToggle = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId) 
        : [...prev, tagId]
    );
  };

  const submitForm = (data) => {
    onSubmit({
      ...data,
      contenido: content,
      categorias: selectedCategories,
      etiquetas: selectedTags,
    });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="article-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="titulo">Título*</label>
          <input
            id="titulo"
            {...register('titulo')}
            className={errors.titulo ? 'error' : ''}
          />
          {errors.titulo && <span className="error-message">{errors.titulo.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="subtitulo">Subtítulo</label>
          <input
            id="subtitulo"
            {...register('subtitulo')}
            className={errors.subtitulo ? 'error' : ''}
          />
          {errors.subtitulo && <span className="error-message">{errors.subtitulo.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="resumen">Resumen*</label>
          <textarea
            id="resumen"
            {...register('resumen')}
            rows="3"
            className={errors.resumen ? 'error' : ''}
          />
          {errors.resumen && <span className="error-message">{errors.resumen.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Contenido*</label>
          <RichTextEditor 
            value={content} 
            onChange={handleContentChange} 
          />
          {errors.contenido && <span className="error-message">{errors.contenido.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="imagen_portada_url">URL de la imagen de portada</label>
          <input
            id="imagen_portada_url"
            {...register('imagen_portada_url')}
            className={errors.imagen_portada_url ? 'error' : ''}
          />
          {errors.imagen_portada_url && <span className="error-message">{errors.imagen_portada_url.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="estado">Estado*</label>
          <select
            id="estado"
            {...register('estado')}
            className={errors.estado ? 'error' : ''}
          >
            <option value="borrador">Borrador</option>
            <option value="revision">Revisión</option>
            <option value="publicado">Publicado</option>
          </select>
          {errors.estado && <span className="error-message">{errors.estado.message}</span>}
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="destacado"
            {...register('destacado')}
          />
          <label htmlFor="destacado">Destacado</label>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Categorías*</label>
          <div className="checkbox-list">
            {categories.map(category => (
              <div key={category.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCategoryToggle(category.id)}
                />
                <label htmlFor={`category-${category.id}`}>{category.nombre}</label>
              </div>
            ))}
          </div>
          {errors.categorias && <span className="error-message">{errors.categorias.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Etiquetas</label>
          <div className="checkbox-list">
            {tags.map(tag => (
              <div key={tag.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`tag-${tag.id}`}
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleTagToggle(tag.id)}
                />
                <label htmlFor={`tag-${tag.id}`}>{tag.nombre}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
        <button type="submit" className="submit-btn">
          {initialData ? 'Actualizar Artículo' : 'Crear Artículo'}
        </button>
      </div>
    </form>
  );
};

export default FormArticle;