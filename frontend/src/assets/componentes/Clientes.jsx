import React, { useState, useEffect } from 'react';
import { API_URL } from '../auth/constants';
import { useAuth } from '../auth/Authprovider';
import '../styles/petService.css';
import avatar from "../images/avatar.png"

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUser, getAccessToken } = useAuth();
  const [showOptions, setShowOptions] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const toggleContactInfo = () => {
    setShowContactInfo(!showContactInfo);
  };

  useEffect(() => {
    const fetchUserBookings = async () => {
      const user = getUser();

      if (!user || !user.id) {
        setError('Usuario no autenticado. Por favor, inicie sesión.');
        setLoading(false);
        return;
      }

      try {
        const accessToken = getAccessToken();

        const response = await fetch(`${API_URL}/bookings/user-posts/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          const responseData = await response.json();
          throw new Error(responseData.message || 'Error al obtener las reservas');
        }

        const bookingsData = await response.json();

        setBookings(bookingsData);
      } catch (error) {
        console.error('Error en fetchUserBookings:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [getUser, getAccessToken]);

  const handleStatusChange = async (bookingId, newStatus) => {
    const token = getAccessToken();
    try {
        const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus })
        });
        if (response.ok) {
            alert('Estado de la reserva actualizado con éxito');
            setBookings(prevBookings => 
                prevBookings.map(booking => 
                    booking._id === bookingId ? { ...booking, stat: newStatus } : booking
                )
            );
        } else {
            alert('Error al actualizar el estado de la reserva');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar el estado de la reserva');
    }
};



  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  const user = getUser();


  return (
    <div>
      <h2>Mis Reservas</h2>
      {bookings.length === 0 ? (
        <p>No tienes reservas.</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <span className='postststst'>
            <div key={booking._id} className='service-provider'>
            <div className='div-service-provider'>          
                {booking.post.petType && (
                    <img src={avatar} alt="avatar" width="60px" height="60px"/>
                  )}
                <span className='span-service-provider'>

                <p>{user.name} {user.surname}</p>
                <p>{booking.post.serviceType}</p>
                <p>{user.address}</p>
                </span>
            </div>
            <div className='div-service-provider'>
                <span className='span-service-provider'>
                <div className='rating'>
                    {[1, 2, 3, 4, 5].map(index => (
                    <span key={index} className={user.rating >= index ? 'rating-yes' : 'rating-no'}></span>
                    ))}
                </div>
                <p>${booking.post.price}</p>
                </span>
            </div>
            </div>
            <div className='booking-card'>
      <div className='booking-info'>
        <img src={avatar} alt="User avatar" className='user-avatar' />
        <div className='user-details'>
          <p className='user-name'>{booking.user.name} {booking.user.surname}</p>
          <p className='booking-status'>Estado: {booking.stat}</p>
        </div>
      </div>
      <div className='booking-actions'>
        <button onClick={toggleOptions} className='action-button refresh'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
        </button>
        <button className='action-button info'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </button>
      </div>
      {showOptions && (
        <div className='booking-options'>
          <button onClick={() => handleStatusChange(booking._id, 'Aceptado')}>Aceptar</button>
          <button onClick={() => handleStatusChange(booking._id, 'Rechazado')}>Rechazar</button>
          <button onClick={() => handleStatusChange(booking._id, 'Completado')}>Completar</button>
        </div>
      )}
    </div>  
            </span> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserBookings;


