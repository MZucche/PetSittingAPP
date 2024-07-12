import React, { useEffect, useState } from 'react';
import { API_URL } from '../auth/constants'; // Asegúrate de que la ruta sea correcta
import { useAuth } from '../auth/Authprovider'; // Asegúrate de que la ruta sea correcta
import '../styles/petService.css';
import catImage from '../images/cat.png';
import dogImage from '../images/dog.png';
import hamImage from '../images/ham.png';
import birdImage from '../images/bird.png';
import fishImage from '../images/fish.png';

const PetList = () => {
  const { getUser } = useAuth();
  const user = getUser();
  const userId = user.id; // Obtiene el _id del usuario desde el contexto

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setError('User ID is required');
      setLoading(false);
      return;
    }

    const fetchPets = async () => {
      try {
        const response = await fetch(`${API_URL}/getpet?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPets(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the pets data', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPets();
  }, [userId]);

  const deletePet = async (petId) => {
    if (window.confirm('Estas seguro que quieres eliminar esta mascota?')) {
      try {
        const response = await fetch(`${API_URL}/deletepet/${petId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setPets(pets.filter(pet => pet._id !== petId));
      } catch (error) {
        console.error('Error deleting the pet', error);
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getImageForPetType = (petType) => {
    switch (petType) {
      case 'cat':
        return catImage;
      case 'dog':
        return dogImage;
      case 'ham':
        return hamImage;
      case 'bird':
        return birdImage;
      case 'fish':
        return fishImage;
      default:
        return null;
    }
  };

  return (
    <main className='main-filtros-busqueda'>
      <section className='section-busq'>
        {pets.map(pet => (
          <div key={pet._id} className='service-provider'>
            <div className='div-service-provider'>
              <img src={getImageForPetType(pet.petType)} alt={pet.petType} width="60px" height="60px" />
              <span className='span-service-provider'>
                <p><strong>{pet.petName}</strong></p>
                <p>Edad: {pet.petAge}</p>
                <p>Tamaño: {pet.petSize}</p>
              </span>
            </div>
            <button 
                className="icon-button delete-button" 
                onClick={() => deletePet(pet._id)}
                aria-label={`Delete ${pet.petName}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
                </svg>
              </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default PetList;
