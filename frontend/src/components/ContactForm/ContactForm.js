import React, { useState } from 'react';
import { ContactService } from '../../api/contact';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
  });
  const [status, setStatus] = useState(null);
  const [statusType, setStatusType] = useState('');

  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await ContactService(formData);
        setStatus('Mensaje enviado con éxito');
        setStatusType('success');
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        setStatus('Error al enviar el mensaje');
        setStatusType('error');      }
  };

  return (
    <div className="contact-form-container">
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Escribe tu mensaje"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit">Enviar</button>
    </form>
    {status && <p className={`status-message ${statusType}`}>{status}</p>}
    </div>
  );
};

export default ContactForm;