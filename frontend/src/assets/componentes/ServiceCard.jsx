import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { API_URL } from '../auth/constants';
import { useAuth } from "../auth/Authprovider";
import adiestramiento from "../images/adiestramiento.png";
import cuidadoDomestico from "../images/cuidadoDomestico.png";
import paseo from "../images/paseo.png";
import expIcon from '../images/experienceIcon.png';
import ContactForm from './ContactForm';
import avatar from "../images/avatar.png";
import '../styles/ServiceCard.css';

const ServiceCard = () => {
  const [service, setService] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const serviceDataFromState = location.state?.service;
  const { getAccessToken } = useAuth();

  useEffect(() => {
    const fetchServiceAndUser = async () => {
      setLoading(true);
      try {
        if (serviceDataFromState) {
          setService(serviceDataFromState);
          const userData = await fetchUser(serviceDataFromState.user);
          setUser(userData);
        } else {
          const serviceResponse = await fetch(`${API_URL}/services/${id}`);
          if (!serviceResponse.ok) {
            throw new Error('Error al obtener los datos del servicio');
          }
          const serviceData = await serviceResponse.json();
          setService(serviceData);

          const userData = await fetchUser(serviceData.user);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceAndUser();
  }, [id, serviceDataFromState]);

  const fetchUser = async (userId) => {
    try {
      const token = getAccessToken();
      const response = await fetch(`${API_URL}/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error en la respuesta de la red');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user data', error);
      throw error;
    }
  };

  const currentUser = useAuth().getUser();

  const handleBookingSubmit = async (contactInfo) => {
    const bookingData = {
      post: service,
      message: contactInfo.message,
      availability: contactInfo.availability,
      user: currentUser.id,
      stat: 'Solicitado',
      createdAt: new Date(),
    };

    try {
      const response = await fetch(`${API_URL}/booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify(bookingData),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Unexpected response content-type: ${contentType}. Response text: ${text}`);
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Error al crear la reserva');
      }

      console.log('Booking created successfully:', result);
      setShowContactForm(false);
    } catch (error) {
      console.error('Error creating booking:', error);
      setError(error.message || 'Error al crear la reserva');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!service || !user) {
    return <div>Datos no disponibles.</div>;
  }

  return (
    <span>
      <div className="service-card">
        <div className="profile-section">
          <img src={avatar} alt={user.name} className="profile-image" />
          <div className="profile-info">
            <h2>{`${user.name} ${user.surname}`}</h2>
            <p>{user.zone}</p>
            <p><img className="icon" src={expIcon} alt="" />{service.experience} años de experiencia</p>
          </div>
          <div className="service-type">
            {service.serviceType === 'adiestramiento' && (
              <img src={adiestramiento} alt="adiestramiento" className="service-icon" />
            )}
            {service.serviceType === 'cuidadoDomestico' && (
              <img src={cuidadoDomestico} alt="cuidado domestico" className="service-icon" />
            )}
            {service.serviceType === 'paseo' && (
              <img src={paseo} alt="paseo" className="service-icon" />
            )}
            <span className="service-text">
              {service.serviceType === 'adiestramiento' && 'Adiestramiento'}
              {service.serviceType === 'cuidadoDomestico' && 'Cuidado Domestico'}
              {service.serviceType === 'paseo' && 'Paseo'}
            </span>
          </div>
        </div>
        <div className="description">
          <p>{service.description}</p>
        </div>
        <div className="availability-section">
          <div className="frequency">
            <p>Frecuencia</p>
            <div>
              <span className={service.availabilityFrequency.includes('unicavez') ? 'active' : ''}>Única vez</span>
              <span className={service.availabilityFrequency.includes('diaria') ? 'active' : ''}>Diaria</span>
              <span className={service.availabilityFrequency.includes('semanal') ? 'active' : ''}>Semanal</span>
              <span className={service.availabilityFrequency.includes('mensual') ? 'active' : ''}>Mensual</span>
            </div>
          </div>
          <div className="availability">
            <p>Disponibilidad</p>
            <div>
              <span className={service.availabilityDays.includes('lunes') ? 'active' : ''}>Lun</span>
              <span className={service.availabilityDays.includes('martes') ? 'active' : ''}>Mar</span>
              <span className={service.availabilityDays.includes('miercoles') ? 'active' : ''}>Mié</span>
              <span className={service.availabilityDays.includes('jueves') ? 'active' : ''}>Jue</span>
              <span className={service.availabilityDays.includes('viernes') ? 'active' : ''}>Vie</span>
              <span className={service.availabilityDays.includes('sabado') ? 'active' : ''}>Sáb</span>
              <span className={service.availabilityDays.includes('domingo') ? 'active' : ''}>Dom</span>
            </div>
          </div>
        </div>
        <div className="price-contact">
          <div className="price">
            ${service.price} Por día
          </div>
          <button onClick={() => setShowContactForm(!showContactForm)}>Contactar</button>
        </div>
        <div>
          {showContactForm && (
            <ContactForm onSubmit={handleBookingSubmit} onCancel={() => setShowContactForm(false)} />
          )}
        </div>
        <div>
              {user.reviews.map(review => (
                <div key={review._id}>
                  <p>{review.user.name} {review.user.username}</p>
                  <p>Rating: {review.rating}</p>
                  <p>Mensaje: {review.message}</p>
                  <div className="rating">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <span
                        key={index}
                        className={review.rating >= index ? 'rating-yes' : 'rating-no'}
                      ></span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
      </div>
    </span>
  );
};

export default ServiceCard;
