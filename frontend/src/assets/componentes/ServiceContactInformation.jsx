import React, { useState } from 'react';
import '../styles/ServiceContactInformation.css';

const FormularioContacto = () => {
  const [nombre, setNombre] = useState('Mariano Solari');
  const [telefono, setTelefono] = useState('1187537866');
  const [email, setEmail] = useState('mariansolari@gmail.com');
  const [horario, setHorario] = useState('17:00hs - 21:00hs');
  const [mensaje, setMensaje] = useState('Estoy interesado en contratar tus servicios para pasear a mi perro. Tengo un perro grande, aunque tranquilo y bien entrenado. Me gustaría discutir cómo manejarías su paseo considerando su tamaño. Espero tu respuesta para coordinar los detalles. Gracias.');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para enviar el formulario
    console.log({ nombre, telefono, email, horario, mensaje });
  };

  return (
    <form className="formulario-contacto" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nombre y Apellido</label>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Teléfono</label>
        <input 
          type="text" 
          value={telefono} 
          onChange={(e) => setTelefono(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Horario disponible</label>
        <input 
          type="text" 
          value={horario} 
          onChange={(e) => setHorario(e.target.value)} 
        />
      </div>
      <div className="form-group mensaje-container">
        <label>Mensaje</label>
        <textarea 
          value={mensaje} 
          onChange={(e) => setMensaje(e.target.value)} 
        />
        <button type="submit">Cerrar</button>
      </div>
    </form>
  );
};

export default FormularioContacto;
