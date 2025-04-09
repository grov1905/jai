import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormUser.css';

const userSchema = yup.object().shape({
  username: yup.string().required('El nombre de usuario es requerido').max(150),
  email: yup.string().email('Ingrese un email válido').required('El email es requerido'),
  first_name: yup.string().max(30),
  last_name: yup.string().max(150),
  estado: yup.string().required('El estado es requerido'),
  is_staff: yup.boolean(),
  password: yup.string().when('isCreate', {
    is: true,
    then: yup.string().required('La contraseña es requerida').min(8),
    otherwise: yup.string(),
  }),
  password_confirmation: yup.string().when('password', {
    is: val => val && val.length > 0,
    then: yup.string().oneOf([yup.ref('password')], 'Las contraseñas deben coincidir'),
    otherwise: yup.string(),
  }),
});

const FormUser = ({ 
  onSubmit, 
  initialData = null, 
  onCancel 
}) => {
  const isCreate = !initialData;
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: initialData || {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      estado: 'activo',
      is_staff: false,
      password: '',
      password_confirmation: '',
    },
    context: { isCreate }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="user-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="username">Nombre de usuario*</label>
          <input
            id="username"
            {...register('username')}
            className={errors.username ? 'error' : ''}
            disabled={!isCreate}
          />
          {errors.username && <span className="error-message">{errors.username.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email.message}</span>}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="first_name">Nombre</label>
          <input
            id="first_name"
            {...register('first_name')}
            className={errors.first_name ? 'error' : ''}
          />
          {errors.first_name && <span className="error-message">{errors.first_name.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="last_name">Apellido</label>
          <input
            id="last_name"
            {...register('last_name')}
            className={errors.last_name ? 'error' : ''}
          />
          {errors.last_name && <span className="error-message">{errors.last_name.message}</span>}
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
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="suspendido">Suspendido</option>
          </select>
          {errors.estado && <span className="error-message">{errors.estado.message}</span>}
        </div>
        
        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="is_staff"
            {...register('is_staff')}
          />
          <label htmlFor="is_staff">Es staff</label>
        </div>
      </div>
      
      {isCreate && (
        <>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Contraseña*</label>
              <input
                type="password"
                id="password"
                {...register('password')}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password_confirmation">Confirmar Contraseña</label>
              <input
                type="password"
                id="password_confirmation"
                {...register('password_confirmation')}
                className={errors.password_confirmation ? 'error' : ''}
              />
              {errors.password_confirmation && (
                <span className="error-message">{errors.password_confirmation.message}</span>
              )}
            </div>
          </div>
        </>
      )}
      
      {!isCreate && (
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Nueva Contraseña</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={errors.password ? 'error' : ''}
              placeholder="Dejar en blanco para no cambiar"
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password_confirmation">Confirmar Nueva Contraseña</label>
            <input
              type="password"
              id="password_confirmation"
              {...register('password_confirmation')}
              className={errors.password_confirmation ? 'error' : ''}
            />
            {errors.password_confirmation && (
              <span className="error-message">{errors.password_confirmation.message}</span>
            )}
          </div>
        </div>
      )}
      
      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancelar
        </button>
        <button type="submit" className="submit-btn">
          {initialData ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
};

export default FormUser;