import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormTag.css';

const tagSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido').max(100),
  slug: yup.string().required('El slug es requerido').max(100),
  tipo: yup.string().required('El tipo es requerido'),
});

const FormTag = ({ 
  onSubmit, 
  initialData = null, 
  onCancel 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(tagSchema),
    defaultValues: initialData || {
      nombre: '',
      slug: '',
      tipo: 'tema',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="tag-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombre">Nombre*</label>
          <input
            id="nombre"
            {...register('nombre')}
            className={errors.nombre ? 'error' : ''}
          />
          {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="slug">Slug*</label>
          <input
            id="slug"
            {...register('slug')}
            className={errors.slug ? 'error' : ''}
          />
          {errors.slug && <span className="error-message">{errors.slug.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tipo">Tipo*</label>
          <select
            id="tipo"
            {...register('tipo')}
            className={errors.tipo ? 'error' : ''}
          >
            <option value="tema">Tema</option>
            <option value="ubicacion">Ubicación</option>
            <option value="persona">Persona</option>
          </select>
          {errors.tipo && <span className="error-message">{errors.tipo.message}</span>}
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
        <button type="submit" className="submit-btn">
          {initialData ? 'Actualizar Etiqueta' : 'Crear Etiqueta'}
        </button>
      </div>
    </form>
  );
};

export default FormTag;