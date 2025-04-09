import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import './FormRole.css';

const roleSchema = yup.object().shape({
  nombre: yup.string().required('El nombre es requerido').max(100),
  descripcion: yup.string().max(500),
  nivel_prioridad: yup.number().required('El nivel es requerido').min(0),
  permisos: yup.array().min(1, 'Selecciona al menos un permiso'),
});

const FormRole = ({ 
  onSubmit, 
  initialData = null, 
  permissions = [], 
  onCancel 
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState(
    initialData?.permisos?.map(p => p.id) || []
  );
  
  const { 
    register, 
    handleSubmit, 
    setValue, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(roleSchema),
    defaultValues: initialData || {
      nombre: '',
      descripcion: '',
      nivel_prioridad: 0,
      permisos: [],
    }
  });

  useEffect(() => {
    register('permisos');
  }, [register]);

  useEffect(() => {
    setValue('permisos', selectedPermissions);
  }, [selectedPermissions, setValue]);

  const handlePermissionToggle = (permissionId) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(id => id !== permissionId) 
        : [...prev, permissionId]
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="role-form">
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
          <label htmlFor="nivel_prioridad">Nivel de Prioridad*</label>
          <input
            type="number"
            id="nivel_prioridad"
            {...register('nivel_prioridad')}
            className={errors.nivel_prioridad ? 'error' : ''}
            min="0"
          />
          {errors.nivel_prioridad && <span className="error-message">{errors.nivel_prioridad.message}</span>}
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
          <label>Permisos*</label>
          <div className="checkbox-list">
            {permissions.map(permission => (
              <div key={permission.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`permission-${permission.id}`}
                  checked={selectedPermissions.includes(permission.id)}
                  onChange={() => handlePermissionToggle(permission.id)}
                />
                <label htmlFor={`permission-${permission.id}`}>
                  {permission.nombre} <small>({permission.codigo})</small>
                </label>
              </div>
            ))}
          </div>
          {errors.permisos && <span className="error-message">{errors.permisos.message}</span>}
        </div>
      </div>
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
        <button type="submit" className="submit-btn">
          {initialData ? 'Actualizar Rol' : 'Crear Rol'}
        </button>
      </div>
    </form>
  );
};

export default FormRole;