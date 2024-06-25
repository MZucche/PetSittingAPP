import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListarPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/posts/all');
                setPosts(response.data);
            } catch (error) {
                console.error('Error obteniendo las publicaciones:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div>
            <h1>Publicaciones</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h2>{post.petType}</h2>
                        <p>Tipo de servicio: {post.serviceType}</p>
                        <p>Experiencia: {post.experience} años</p>
                        <p>Frecuencia: {post.availabilityFrequency}</p>
                        {post.availabilityFrequency === 'semanal' && (
                            <p>Días disponibles: {post.availabilityDays.join(', ')}</p>
                        )}
                        <p>Fechas: {new Date(post.availabilityDates.startDate).toLocaleDateString()} - {new Date(post.availabilityDates.endDate).toLocaleDateString()}</p>
                        <p>Descripción: {post.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListarPost;
