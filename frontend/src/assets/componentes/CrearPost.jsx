import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constants';
import { useAuth } from "../auth/Authprovider";
import "../styles/filtros.css";
import "../styles/filterComponent.css"; // Asegúrate de importar correctamente tus estilos CSS
import catIcon from "../images/cat.png";
import dogIcon from "../images/dog.png";
import hamIcon from "../images/ham.png";
import birdIcon from "../images/bird.png";
import fishIcon from "../images/fish.png";

const CrearPost = () => {
    const [selectedPetType, setSelectedPetType] = useState('');
    const [selectedServiceType, setSelectedServiceType] = useState('');
    const [selectedFrequency, setSelectedFrequency] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState(100);
    const [description, setDescription] = useState('');
    const [experience, setExperience] = useState(1);

    const navigate = useNavigate();

    const { isAuthenticated, getAccessToken, getUser } = useAuth();

    useEffect(() => {
        if (!selectedFrequency.includes('semanal')) {
            setSelectedDays([]);
        }
    }, [selectedFrequency]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            console.error("Usuario no autenticado, por favor inicie sesión");
            return;
        }

        const user = getUser();

        console.log("Pet Type Selected: ", selectedPetType); // Debugging log

        try {
            const accessToken = getAccessToken();

            const response = await fetch(`${API_URL}/post`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    petType: selectedPetType,
                    serviceType: selectedServiceType,
                    experience,
                    availabilityFrequency: selectedFrequency,
                    availabilityDays: selectedDays,
                    price: selectedPrice,
                    description,
                    user: user.id,
                }),
            });

            if (response.ok) {
                alert('Servicio agregado con exito');
                console.log("Se realizó correctamente la publicación");
                navigate('/');
            } else {
                alert('Error, no se pudo agregar el servicio');
            }

        } catch (error) {
            console.error(error);
        }
    };

    const toggleSelectionPet = (petType) => {
        setSelectedPetType((prevPetType) => (prevPetType === petType ? '' : petType));
    };

    const toggleSelectionService = (serviceType) => {
        setSelectedServiceType((prevServiceType) => (prevServiceType === serviceType ? '' : serviceType));
    };

    const handleFrequencyChange = (frequency) => {
        setSelectedFrequency(
            selectedFrequency.includes(frequency)
                ? selectedFrequency.filter(f => f !== frequency)
                : [...selectedFrequency, frequency]
        );
    };

    const handleDayChange = (day) => {
        setSelectedDays(
            selectedDays.includes(day)
                ? selectedDays.filter(d => d !== day)
                : [...selectedDays, day]
        );
    };

    return (
        isAuthenticated ? (
            <form onSubmit={handleSubmit} className="whisker-wrapper-service">
                <div className="paw-print-section">
                    <h3>Mascota</h3>
                    <div className="critter-icons">
                        <img src={catIcon} alt='cat' className={selectedPetType === 'cat' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('cat')} />
                        <img src={dogIcon} alt='dog' className={selectedPetType === 'dog' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('dog')} />
                        <img src={hamIcon} alt='ham' className={selectedPetType === 'ham' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('ham')} />
                        <img src={birdIcon} alt='bird' className={selectedPetType === 'bird' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('bird')} />
                        <img src={fishIcon} alt='fish' className={selectedPetType === 'fish' ? 'fur-selected' : ''} onClick={() => toggleSelectionPet('fish')} />
                    </div>
                </div>

                <div className="paw-print-section">
                    <h3>Servicio</h3>
                    <div className="kibble-buttons">
                        {(selectedPetType === 'dog' || selectedPetType === '') && (
                            <>
                                <button type="button" className={selectedServiceType === 'adiestramiento' ? 'kibble-selected' : ''} onClick={() => toggleSelectionService('adiestramiento')}>Adiestramiento</button>
                                <button type="button" className={selectedServiceType === 'cuidadoDomestico' ? 'kibble-selected' : ''} onClick={() => toggleSelectionService('cuidadoDomestico')}>Cuidado Domestico</button>
                                <button type="button" className={selectedServiceType === 'paseo' ? 'kibble-selected' : ''} onClick={() => toggleSelectionService('paseo')}>Paseo</button>
                            </>
                        )}
                        {selectedPetType === 'cat' && (
                            <>
                                <button type="button" className={selectedServiceType === 'adiestramiento' ? 'kibble-selected' : ''} onClick={() => toggleSelectionService('adiestramiento')}>Adiestramiento</button>
                                <button type="button" className={selectedServiceType === 'cuidadoDomestico' ? 'kibble-selected' : ''} onClick={() => toggleSelectionService('cuidadoDomestico')}>Cuidado Domestico</button>
                            </>
                        )}
                        {selectedPetType !== 'dog' && selectedPetType !== 'cat' && selectedPetType !== '' && (
                            <button type="button" className={selectedServiceType === 'cuidadoDomestico' ? 'kibble-selected' : ''} onClick={() => toggleSelectionService('cuidadoDomestico')}>Cuidado Domestico</button>
                        )}
                    </div>
                </div>

                <div className="paw-print-section">
                    <h3>Frecuencia</h3>
                    <div className="tail-wag-buttons">
                    <div className='day-buttons'>
                        {['unicavez', 'diaria', 'semanal', 'mensual'].map((frequency) => (
                            <button
                                type="button"
                                key={frequency}
                                className={selectedFrequency.includes(frequency) ? 'day-button selected' : 'day-button'}
                                onClick={() => handleFrequencyChange(frequency)}
                            >
                                {frequency}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>

                {selectedFrequency.includes('semanal') && (
                    <div className="paw-print-section">
                        <h3>Días de la Semana</h3>
                        <div className="day-buttons">
                            {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'].map((day) => (
                                <button
                                    type="button"
                                    key={day}
                                    className={selectedDays.includes(day) ? 'day-button selected' : 'day-button'}
                                    onClick={() => handleDayChange(day)}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="paw-print-section">
                    <h3>Precio</h3>
                    <div className="whisker-inputs">
                        <input type="range" min="0" max="100" value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} />
                        <span>${selectedPrice}</span>
                    </div>
                </div>

                <div className="paw-print-section">
                    <h3>Descripción</h3>
                    <div className="whisker-inputs">
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea" placeholder="Descripción"/>
                    </div>
                </div>

                <div className="paw-print-section">
                    <h3>Experiencia</h3>
                    <div className="whisker-inputs">
                        <select value={experience} onChange={(e) => setExperience(e.target.value)}>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button className="fetch-button" type="submit">Crear Publicación</button>
            </form>
        ) : (
            <p>Por favor, inicia sesión para crear una publicación.</p>
        )
    );
};

export default CrearPost;
