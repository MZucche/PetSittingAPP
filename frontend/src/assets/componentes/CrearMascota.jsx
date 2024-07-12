import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constants';
import { useAuth } from "../auth/Authprovider";
import "../styles/petForm.css";
import dogImage from '../images/dog.png';
import catImage from '../images/cat.png';
import hamImage from '../images/ham.png';
import birdImage from '../images/bird.png';
import fishImage from '../images/fish.png';

const CrearMascota = ({ onClose }) => {
    const [petType, setPetType] = useState('');
    const [petName, setPetName] = useState('');
    const [petAge, setPetAge] = useState('');
    const [petSize, setPetSize] = useState('');

    const { isAuthenticated, getAccessToken, getUser } = useAuth();
    const navigate = useNavigate();

    const handlePetTypeSelect = (type) => {
        setPetType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!isAuthenticated) {
            console.error("Usuario no autenticado, por favor inicie sesión");
            return;
        }
    
        const user = getUser();
    
        try {
            const accessToken = getAccessToken();
    
            const response = await fetch(`${API_URL}/pet`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    petType,
                    petName,
                    petAge,
                    petSize,
                    user: user.id,
                }),
            });
    
            if (response.ok) {
                alert('Mascota agregada con exito');
                onClose(); // Cerrar el popup después de crear la mascota
                navigate('/profile'); // Navegar a la lista de mascotas del usuario
            } else {
                alert("Error al crear la mascota:");
            }
    
        } catch (error) {
            console.error(error);
        }
    };

    const petTypes = [
        { type: 'dog', image: dogImage },
        { type: 'bird', image: birdImage },
        { type: 'ham', image: hamImage },
        { type: 'cat', image: catImage },
        { type: 'fish', image: fishImage },
    ];

    return (
        <>
        <div className="modal-backdrop" onClick={onClose}></div>
        <div className="crear-mascota-popup">
            <form onSubmit={handleSubmit} className="barkboxp">
                <div className="snoutgroupp">
                    <label>Mascota</label>
                    <div className="pawgalleryp">
                        {petTypes.map(({ type, image }) => (
                            <button
                                key={type}
                                type="button"
                                onClick={() => handlePetTypeSelect(type)}
                                className={`furbuttonp ${petType === type ? 'whiskeractivep' : ''}`}
                            >
                                <img src={image} alt={type} />
                            </button>
                        ))}
                    </div>
                </div>
                <div className="snoutgroupp">
                    <label>Nombre</label>
                    <input 
                        type="text" 
                        value={petName} 
                        onChange={(e) => setPetName(e.target.value)} 
                        required 
                        placeholder="Escribir..."
                        className="purrfieldp"
                    />
                </div>
                <div className="snoutgroupp">
                    <label>Edad</label>
                    <div className="tailcomboboxp">
                        <select 
                            value={petAge} 
                            onChange={(e) => setPetAge(e.target.value)} 
                            required
                            className="meowselectp"
                        >
                            <option value="">Seleccionar</option>
                            {[...Array(20)].map((_, i) => (
                                <option key={i} value={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <span>años</span>
                    </div>
                </div>
                <div className="snoutgroupp">
                    <label>Tamaño</label>
                    <select 
                        value={petSize} 
                        onChange={(e) => setPetSize(e.target.value)} 
                        required
                        className="meowselectp"
                    >
                        <option value="">Seleccionar</option>
                        <option value="pequeño">Pequeño</option>
                        <option value="mediano">Mediano</option>
                        <option value="grande">Grande</option>
                    </select>
                </div>
                <div className='submit-button-div-edit'>
                    <button type="submit" className="submit-button-edit">Guardar cambios</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default CrearMascota;
