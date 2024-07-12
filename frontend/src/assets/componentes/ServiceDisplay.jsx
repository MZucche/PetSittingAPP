import React from 'react';
import '../styles/serviceDisplay.css'; // AsegÃºrate de tener el archivo CSS importado si es necesario

const Servicio = ({ petimage, middleimage, title, text }) => {
    return (
        <div className="servicio-container">
            <div className="img">
                <img src={petimage} alt="Perro" />
            </div>
            <div className="box">
                <img src={middleimage} alt="Imagen1" />
                <p>{title}</p>
                <p>{text}</p>
            </div>
        </div>
    );
}

export default Servicio;