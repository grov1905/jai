import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormCategory.css';

const categorySchema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido').max(100),
  slug: yup.string().required('El slug es requerido').max(100),
  descripcion: yup.string().max(500),
  parent: yup.number().nullable(),
  orden: yup.number().default(0),
  color: yup.string().matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Debe ser un código de color HEX válido'),
});

const FormCategory = ({ 
  onSubmit, 
  initialData = null, 
  categories = [], 
  onCancel 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(categorySchema),
    defaultValues: initialData || {
      nombre: '',
      slug: '',
      descripcion: '',
      parent: null,
      orden: 0,
      color: '#A2B9D6',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="category-form">
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
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            {...register('descripcion')}
            rows="3"
            className={errors.descripcion ? 'error' : ''}
          />
          {errors.descripcion && <span className="error-message">{errors.descripcion.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="parent">Categoría Padre</label>
          <select
  id="parent"
  {...register('parent', {
    setValueAs: value => value === "" ? null : Number(value)
  })}
  className={errors.parent ? 'error' : ''}
>
  <option value="">Ninguna</option>
  {categories.map(category => (
    <option key={category.id} value={category.id}>{category.nombre}</option>
  ))}
</select>
          {errors.parent && <span className="error-message">{errors.parent.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="orden">Orden</label>
          <input
            type="number"
            id="orden"
            {...register('orden')}
            className={errors.orden ? 'error' : ''}
          />
          {errors.orden && <span className="error-message">{errors.orden.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <div className="color-input">
            <input
              type="color"
              id="color"
              {...register('color')}
              className={errors.color ? 'error' : ''}
            />
            <input
              type="text"
              {...register('color')}
              className={errors.color ? 'error' : ''}
              maxLength={7}
            />
          </div>
          {errors.color && <span className="error-message">{errors.color.message}</span>}
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
        <button type="submit" className="submit-btn">
          {initialData ? 'Actualizar Categoría' : 'Crear Categoría'}
        </button>
      </div>
    </form>
  );
};

export default FormCategory;