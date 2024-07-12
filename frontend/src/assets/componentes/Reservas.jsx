import React, { useState, useEffect } from 'react';
import { API_URL } from '../auth/constants';
import { useAuth } from '../auth/Authprovider';
import '../styles/UserRequestedBookings.css';
import avatar from "../images/avatar.png"

const UserRequestedBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUser, getAccessToken } = useAuth();

  useEffect(() => {
    const fetchUserRequestedBookings = async () => {
      const user = getUser();
      if (!user || !user.id) {
        setError('Usuario no autenticado. Por favor, inicie sesión.');
        setLoading(false);
        return;
      }

      try {
        const accessToken = getAccessToken();
        const response = await fetch(`${API_URL}/bookings/user-requested/${user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener las reservas solicitadas');
        }

        const bookingsData = await response.json();
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error en fetchUserRequestedBookings:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRequestedBookings();
  }, [getUser, getAccessToken]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const updateReviewAndRating = async (bookingId, userId, newRating, newReview) => {
    try {
      const accessToken = getAccessToken();

      const response = await fetch(`${API_URL}/user/update-review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          bookingId,
          userId,
          rating: Number(newRating),
          review: newReview
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error en la respuesta:', errorData);
        throw new Error(errorData.message || 'Error al actualizar la reseña y el rating');
      }

      const data = await response.json();

      // Actualizar el estado local
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking._id === bookingId
            ? {
              ...booking,
              review: {
                message: newReview,
                rating: Number(newRating),
                user: getUser().id // Assuming getUser() returns the current user
              },
              post: {
                ...booking.post,
                userDetails: {
                  ...booking.post.userDetails,
                  rating: data.newAverageRating, // Assuming the backend returns the new average rating
                  reviews: [
                    ...(booking.post.userDetails.reviews || []),
                    {
                      message: newReview,
                      rating: Number(newRating),
                      user: getUser().id
                    }
                  ]
                }
              }
            }
            : booking
        )
      );

    } catch (error) {
      console.error('Error en updateReviewAndRating:', error);
      setError(error.message);
    }
  };

  return (
    <main className="main-filtros-busqueda">
      <section className="section-busq">
        <h2 className="title-xzx">Activos</h2>
        {bookings.filter((booking) => booking.stat === 'Aceptado').length === 0 ? (
          <p className="no-bookings-xzx">No tienes reservas aceptadas.</p>
        ) : (
          bookings
            .filter((booking) => booking.stat === 'Aceptado')
            .map((booking) => (
              <div key={booking._id} className="service-provider">
                <div className="div-service-provider">
                  {booking.post.petType && (
                    <img src={avatar} alt="avatar" width="60px" height="60px" />
                  )}
                  <span className="span-service-provider">
                    <p>{booking.post.userDetails.name} {booking.post.userDetails.surname}</p>
                    <p>{booking.post.serviceType}</p>
                    <p>{booking.post.userDetails.address}</p>
                  </span>
                </div>
                <div className="div-service-provider">
                  <span className="span-service-provider">
                    <div className="rating">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <span
                          key={index}
                          className={
                            booking.post.userDetails.rating >= index ? 'rating-yes' : 'rating-no'
                          }
                        ></span>
                      ))}
                    </div>
                    <p>${booking.post.price}</p>
                  </span>
                </div>
              </div>
            ))
        )}

        <h2 className="title-xzx">Finalizados</h2>
        {bookings.filter((booking) => booking.stat === 'Completado').length === 0 ? (
          <p className="no-bookings-xzx">No tienes reservas completadas.</p>
        ) : (
          bookings
            .filter((booking) => booking.stat === 'Completado')
            .map((booking) => (
              <span key={booking._id}>
                <div className="service-provider">
                  <div className="div-service-provider">
                    {booking.post.petType && (
                      <img src={avatar} alt="avatar" width="60px" height="60px" />
                    )}
                    <span className="span-service-provider">
                      <p>{booking.post.userDetails.name} {booking.post.userDetails.surname}</p>
                      <p>{booking.post.serviceType}</p>
                      <p>{booking.post.userDetails.address}</p>
                    </span>
                  </div>
                  <div className="div-service-provider">
                    <span className="span-service-provider">
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <span
                            key={index}
                            className={
                              booking.post.userDetails.rating >= index ? 'rating-yes' : 'rating-no'
                            }
                          ></span>
                        ))}
                      </div>
                      <p>${booking.post.price}</p>
                      <p>por Dia</p>
                    </span>
                  </div>
                </div>
                <div>
                  {!booking.review || booking.review.rating === undefined ? (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const newRating = e.target.rating.value;
                      const newReview = e.target.review.value;
                      updateReviewAndRating(booking._id, booking.post.userDetails._id, newRating, newReview);
                    }}>
                      <label>
                        Nuevo Rating (0-5):
                        <input type="number" name="rating" min="0" max="5" required />
                      </label>
                      <label>
                        Reseña:
                        <textarea name="review" required></textarea>
                      </label>
                      <button type="submit">Enviar Reseña</button>
                    </form>
                  ) : (
                    <span>
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((index) => (
                          <span
                            key={index}
                            className={
                              booking.review.rating >= index ? 'rating-yes' : 'rating-no'
                            }
                          ></span>
                        ))}
                      </div>
                      <p>{booking.review.message}</p>
                    </span>
                  )}
                </div>
              </span>
            ))
        )}
      </section>
    </main>
  );
};

export default UserRequestedBookings;
