import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormPermission.css';

const permissionSchema = yup.object().shape({
  codigo: yup.string().required('El código es requerido').max(100),
  nombre: yup.string().required('El nombre es requerido').max(100),
  descripcion: yup.string().max(500),
});

const FormPermission = ({ 
  onSubmit, 
  initialData = null, 
  onCancel 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(permissionSchema),
    defaultValues: initialData || {
      codigo: '',
      nombre: '',
      descripcion: '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="permission-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="codigo">Código*</label>
          <input
            id="codigo"
            {...register('codigo')}
            className={errors.codigo ? 'error' : ''}
          />
          {errors.codigo && <span className="error-message">{errors.codigo.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="nombre">Nombre*</label>
          <input
            id="nombre"
            {...register('nombre')}
            className={errors.nombre ? 'error' : ''}
          />
          {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
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
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
        <button type="submit" className="submit-btn">
          {initialData ? 'Actualizar Permiso' : 'Crear Permiso'}
        </button>
      </div>
    </form>
  );
};

export default FormPermission;