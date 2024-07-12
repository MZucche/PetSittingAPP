// EditarPerfil.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../auth/Authprovider";
import { API_URL } from '../auth/constants';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom
import "../styles/EditarPerfil.css";

const EditarPerfil = ({ onClose }) => {

    const navigate = useNavigate();

    const { getUser, getAccessToken } = useAuth();
    const [user, setUser] = React.useState({
        name: '',
        surname: '',
        username: '',
        password: '',
        address: '',
        zone: ''
    });
    const [editing, setEditing] = React.useState({
        name: false,
        surname: false,
        username: false,
        password: false,
        address: false,
        zone: false
    });

    useEffect(() => {
        const currentUser = getUser();
        setUser({
            name: currentUser.name,
            surname: currentUser.surname,
            username: currentUser.username,
            password: '********', // No mostramos la contraseña real por seguridad
            address: currentUser.address,
            zone: currentUser.zone
        });
    }, [getUser]);

    const handleEdit = (field) => {
        setEditing(prev => ({ ...prev, [field]: true }));
    };

    const handleChange = (e, field) => {
        setUser(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = getAccessToken();
        try {
            const response = await fetch(`${API_URL}/editprofile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(user)
            });
            if (response.ok) {
                alert('Perfil actualizado con éxito');
                setEditing({
                    name: false,
                    surname: false,
                    username: false,
                    password: false,
                    address: false,
                    zone: false
                });
                onClose();
                navigate('/profile'); // Cerrar el modal después de guardar cambios
            } else {
                alert('Error al actualizar el perfil');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const labels = {
        name: 'Nombre',
        surname: 'Apellido',
        username: 'Usuario',
        password: 'Contraseña',
        address: 'Dirección',
        zone: 'Zona'
    };

    return (
        <>
            <div className="modal-backdrop" onClick={onClose}></div>
            <div className="profile-edit-container">
                <form onSubmit={handleSubmit}>
                    {Object.entries(user).map(([key, value]) => (
                        <div key={key} className="input-group">
                            <label>{labels[key]}</label>
                            <input
                                type={key === 'password' ? 'password' : 'text'}
                                value={value}
                                onChange={(e) => handleChange(e, key)}
                                readOnly={!editing[key]}
                            />
                            {key === 'password' && (
                                <Link to="/forgottenpassword" className="forgot-password-link">Haz click para cambiar la contraseña</Link>
                            )}
                            {key !== 'username' && (
                                <button type="button" className="edit-button" onClick={() => handleEdit(key)}>✏️</button>
                            )}
                        </div>
                    ))}
                    <div className='submit-button-div-edit'>
                        <button type="submit" className="submit-button-edit">Guardar cambios</button>
                    </div>
                </form>
            </div>
        </>
    );

};

export default EditarPerfil;
