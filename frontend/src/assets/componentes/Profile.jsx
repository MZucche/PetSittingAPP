import React, { useState } from 'react';
import '../styles/EditPet.css';
import { useAuth } from "../auth/Authprovider";
import EditarPerfil from "../componentes/EditarPerfil";
import CrearMascota from '../componentes/CrearMascota';
import Reservas from '../componentes/Reservas';
import avatar from "../images/avatar.png"
import GetPets from "../componentes/GetPets"

const Perfil = () => {
  const { getUser } = useAuth();
  const user = getUser();

  const [activeTab, setActiveTab] = useState('perfil');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCreatePetPopup, setShowCreatePetPopup] = useState(false);

  const handleEditProfile = () => {
    setShowEditPopup(true); // Mostrar el popup al hacer clic en "Editar Perfil"
  };

  const handleEditPets = () => {
    setShowCreatePetPopup(true); // Mostrar el popup al hacer clic en "Editar mascotas"
  };

  return (
    <div>
      <div className="tabs-container">
        <div className={`tab ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>PERFIL</div>
        <div className={`tab ${activeTab === 'contrataciones' ? 'active' : ''}`} onClick={() => setActiveTab('contrataciones')}>CONTRATACIONES</div>
      </div>

      <div className={`container ${activeTab === 'contrataciones' ? 'contrataciones-tab' : ''}`}>
        {activeTab === 'perfil' && (
          <>
            <div className="perfil">
              <div className="perfil-header">
                <img src={avatar} alt="Avatar" className="avatar" />
              </div>
              <div className="perfil-body">
                <div className="perfil-item">
                  <label><strong>Nombre y Apellido</strong></label>
                  <input type="text" value={`${user.name} ${user.surname}`} readOnly />
                </div>
                <div className="perfil-item">
                  <label>Contraseña</label>
                  <input type="password" value="********" readOnly />
                </div>
                <div className="perfil-item">
                  <label>Usuario</label>
                  <input type="text" value={user.username || ""} readOnly />
                </div>
                <div className="perfil-item">
                  <label>Domicilio</label>
                  <input type="text" value={user.address || ""} readOnly />
                </div>
                <button className="edit-btn" onClick={handleEditProfile}>Editar Perfil</button>

                {/* Popup de edición de perfil */}
                {showEditPopup && <EditarPerfil onClose={() => setShowEditPopup(false)} />}
              </div>
            </div>
            <div className="separator"></div>
            <div className="mascotas">
              <h2>MASCOTAS</h2>
              <GetPets />
              <button className="edit-btn-pet" onClick={handleEditPets}>Agregar mascotas</button>

              {/* Popup de creación de mascota */}
              {showCreatePetPopup && <CrearMascota onClose={() => setShowCreatePetPopup(false)} />}
            </div>
          </>
        )}
        {activeTab === 'contrataciones' && (
          <Reservas />
        )}
      </div>
    </div>
  );
};

export default Perfil;
