import React from 'react';
import Servicio from './ServiceDisplay';
import imagen11 from "../images/imagen11.png"
import adiestramiento from "../images/adiestramiento.png"
import imagen22 from "../images/imagen22.png"
import cuidadoDomestico from "../images/cuidadoDomestico.png"
import imagen33 from "../images/imagen33.png"
import paseo from "../images/paseo.png" // Assuming Servicio is in the same directory

const ServiciosContainer = () => {
  return (
    <div className='servicios-container-all'>
    <div className="servicios-container">
    <div className='servicios-title-div'>
      <h2 className="servicios-title">SERVICIOS</h2>
      </div>
      <div className="servicios-content">
        <Servicio 
          petimage={imagen11} 
          middleimage={adiestramiento} 
          title="Adiestramiento" 
          text="Tus mascotas pasarán la noche en la casa de tu cuidador. Serán tratados como parte de la familia en un ambiente confortable." 
        />
        <Servicio 
          petimage={imagen22} 
          middleimage={cuidadoDomestico} 
          title="Cuidado Doméstico" 
          text="Tu cuidador cuida de tus mascotas y de tu casa. Tus mascotas recibirán toda la atención que necesitan desde la comodidad del hogar." 
        />
        <Servicio 
          petimage={imagen33} 
          middleimage={paseo} 
          title="Paseo" 
          text="Tu perro sale a pasear por tu vecindario. Perfecto para días ajetreados y perros con energía extra para quemar." 
        />
      </div>
    </div>
    </div>
  );
};

export default ServiciosContainer;