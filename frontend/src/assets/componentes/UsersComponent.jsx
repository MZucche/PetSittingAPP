import React, { useEffect, useState } from 'react';
import { API_URL } from '../auth/constants';

const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/getusers`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the users data', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>All Users</h2>
      {users.map(user => (
        <div key={user._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <p><strong>User ID:</strong>{user._id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Surname:</strong> {user.surname}</p>
          <p><strong>Zone:</strong> {user.zone}</p>
          <p><strong>Rating:</strong> {user.rating}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersComponent;
