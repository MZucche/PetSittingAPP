import React, { useState } from 'react';

const ContactForm = ({ onSubmit, onCancel }) => {
  const [contactInfo, setContactInfo] = useState({
    availability: '',
    message: '',
  });

  const handleChange = (e) => {
    setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(contactInfo);
  };

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Horarios disponibles para ser contactado:</label>
          <select name="availability" value={contactInfo.availability} onChange={handleChange} required>
            <option value="">Seleccione una opción...</option>
            <option value="07:00 - 10:00">07:00 - 10:00</option>
            <option value="10:00 - 13:00">10:00 - 13:00</option>
            <option value="13:00 - 16:00">13:00 - 16:00</option>
            <option value="16:00 - 19:00">16:00 - 19:00</option>
            <option value="19:00 - 22:00">19:00 - 22:00</option>
          </select>
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea name="message" value={contactInfo.message} onChange={handleChange} required />
        </div>
        <div>
          <button type="submit">Enviar</button>
          <button type="button" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
