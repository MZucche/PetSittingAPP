import React, { useState } from 'react';
import '../styles/EditPet.css'; // Asegúrate de importar tus estilos CSS aquí
import { useAuth } from "../auth/Authprovider"; // Asegúrate de importar tu proveedor de autenticación
import CrearPost from '../componentes/CrearPost'; // Importa el componente CrearPost
import avatar from "../images/avatar.png"; // Importa tu imagen si es necesario
import ServiciosPerfil from './ServiciosPerfil'
import Clientes from './Clientes'

const Servicios = () => {
  const { getUser } = useAuth();
  const user = getUser();

  const [activeTab, setActiveTab] = useState('servicios');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCreatePetPopup, setShowCreatePetPopup] = useState(false);
  const [showCrearPostPopup, setShowCrearPostPopup] = useState(false); // Nuevo estado para mostrar el popup de CrearPost

  const handleEditProfile = () => {
    setShowEditPopup(true);
  };

  const handleEditPets = () => {
    setShowCreatePetPopup(true);
  };

  const handleCrearPost = () => {
    setShowCrearPostPopup(true); // Mostrar el popup al hacer clic en el botón "Crear Post"
  };

  return (
    <div>
      <div className="tabs-container">
        <div className={`tab ${activeTab === 'servicios' ? 'active' : ''}`} onClick={() => setActiveTab('servicios')}>
          SERVICIOS
        </div>
        <div className={`tab ${activeTab === 'clientes' ? 'active' : ''}`} onClick={() => setActiveTab('clientes')}>
          CLIENTES
        </div>
      </div>

      <div className={`container ${activeTab === 'clientes' ? 'clientes-tab' : ''}`}>
        {activeTab === 'servicios' && (
          <div className="servicios">
            <ServiciosPerfil/>
            {/* Botón para mostrar el popup de CrearPost */}
            <button className="edit-btn-pet" onClick={handleCrearPost}>
              Agregar
            </button>

            {/* Fondo borroso y popup de CrearPost */}
            {showCrearPostPopup && (
              <>
                <div className="modal-backdrop" onClick={() => setShowCrearPostPopup(false)}></div>
                <div className="popup crear-post-popup">
                  <div className="popup-content">
                    <CrearPost />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'clientes' && (
          <div className="servicios">
            <Clientes/>
            {/* Contenido de la pestaña de clientes */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Servicios;
