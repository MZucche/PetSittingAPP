import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../auth/constants';
import { useAuth } from "../auth/Authprovider";
import '../styles/petService.css';
import avatar from "../images/avatar.png"

const PetServiceComponent = ({ filters }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_URL}/services`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the services data', error);
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/getusers`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching the users data', error);
      }
    };

    fetchUsers();
  }, []);

  const handleServiceClick = (service) => {
    console.log("Clicking service:", service);
    if (service && service._id) {
      console.log("Navigating to:", `/post/${service._id}`);
      navigate(`/post/${service._id}`, { state: { service } });
    } else {
      console.error('Service or service._id is undefined:', service);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters, services, users]);

  const applyFilters = () => {
    let filtered = services;

    if (filters.selectedPetType !== '') {
      filtered = filtered.filter(service => service.petType === filters.selectedPetType);
    }

    if (filters.selectedServiceType !== '') {
      filtered = filtered.filter(service => service.serviceType === filters.selectedServiceType);
    }

    if (filters.selectedFrequency.length > 0) {
      filtered = filtered.filter(service =>
        filters.selectedFrequency.every(frecuency => service.availabilityFrequency.includes(frecuency))
      );
    }

    if (filters.selectedFrequency.includes('semanal') && filters.selectedDays.length > 0) {
      filtered = filtered.filter(service =>
        filters.selectedDays.every(day => service.availabilityDays.includes(day))
      );
    }

    if (filters.selectedStartDate !== '') {
      const startDate = new Date(filters.selectedStartDate);
      filtered = filtered.filter(service => new Date(service.availabilityDates.startDate) >= startDate);
    }

    if (filters.selectedZone !== '') {
      filtered = filtered.filter(service => {
        const user = users.find(user => user._id === service.user);
        return user && user.zone === filters.selectedZone;
      });
    }

    if (filters.selectedRating > 0) {
      filtered = filtered.filter(service => {
        const user = users.find(user => user._id === service.user);
        return user && user.rating == filters.selectedRating;
      });
    }

    filtered = filtered.filter(service => service.price <= filters.selectedPrice);

    setFilteredServices(filtered);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className='main-filtros-busqueda'>
      <section className='section-busq'>
        {filteredServices.map(service => (
          <div key={service._id} className='service-provider' onClick={() => handleServiceClick(service)}>
            <div className='div-service-provider'>
              {service.petType && (
                <img src={avatar} alt="avatar" width="60px" height="60px"/>
              )}
              <span className='span-service-provider'>
                <p>{users.find(user => user._id === service.user)?.name || 'Usuario no encontrado'}</p>
                <p>{service.serviceType}</p>
                <p>{users.find(user => user._id === service.user)?.zone || 'Dirección no encontrada'}</p>
              </span>
            </div>
            <div className='div-service-provider'>
              <span className='span-service-provider'>
                <div className='rating'>
                  {[1, 2, 3, 4, 5].map(index => (
                    <span key={index} className={users.find(user => user._id === service.user)?.rating >= index ? 'rating-yes' : 'rating-no'}></span>
                  ))}
                </div>
                <p>${service.price}</p>
                <p>por Dia</p>
              </span>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
};

export default PetServiceComponent;
