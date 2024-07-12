import React, { useState, useEffect } from 'react';
import { useAuth } from '../auth/Authprovider';
import { API_URL } from '../auth/constants';
import '../styles/petService.css';
import avatar from "../images/avatar.png"



const ServiciosPerfil = () => {
  const { isAuthenticated, getAccessToken, getUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const user = getUser();
        if (!isAuthenticated || !user || !user.id) {
          throw new Error('Usuario no autenticado. Por favor, inicie sesión.');
        }

        const accessToken = getAccessToken();
        const response = await fetch(`${API_URL}/posts/${user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los posts del usuario');
        }

        const postData = await response.json();

        if (!Array.isArray(postData)) {
          throw new Error('La respuesta del servidor no es un array válido');
        }

        setPosts(postData);
      } catch (error) {
        console.error('Error en fetchUserPosts:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPosts();
  }, [isAuthenticated, getAccessToken, getUser]);

  const handleStatusChange = async (postId, newState) => {
    const token = getAccessToken();
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/state`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ state: newState })
      });
      if (response.ok) {
        alert('Estado del post actualizado con éxito');
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post._id === postId ? { ...post, State: newState } : post
          )
        );
      } else {
        alert('Error al actualizar el estado del post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el estado del post');
    }
  };

  const handleDeletePost = async (postId) => {
    if (!window.confirm('¿Estás seguro de que quieres borrar este post?')) {
      return;
    }

    const token = getAccessToken();
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        alert('Post eliminado con éxito');
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      } else {
        alert('Error al eliminar el post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el post');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const user = getUser();

  return (
    <div>
      <h2>Tus Posts</h2>
      <ul>
        {posts.map(service => (
        <span className='postststst'>
        <div key={service._id} className='service-provider'>
        <div className='div-service-provider'>          
            {service.petType && (
                <img src={avatar} alt="avatar" width="60px" height="60px"/>
              )}
            <span className='span-service-provider'>

            <p>{user.name}</p>
            <p>{service.serviceType}</p>
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
            <p>${service.price}</p>
            <p>{service.State}</p>
            </span>
        </div>
        </div>
        <div className='div-buttons-nxnx'>
            <button onClick={() => handleStatusChange(service._id, 'Pausada')} className="icon-button pause-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
              </svg>
            </button>
            <button onClick={() => handleStatusChange(service._id, 'Activa')} className="icon-button activate-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
              </svg>
            </button>
            <button onClick={() => handleDeletePost(service._id)} className="icon-button delete-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
              </svg>
            </button>
          </div>    
        </span> 
    ))}
      </ul>
    </div>
  );
};

export default ServiciosPerfil;
