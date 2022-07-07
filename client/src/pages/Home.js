import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser({});
    axios
      .get('http://localhost:5000/api/auth/logout', { withCredentials: true })
      .then((res) => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get('http://localhost:5000/api/auth/user', { withCredentials: true })
        .then((res) => setUser(res.data))
        .catch((err) => {
          console.log(err);
          navigate('/login');
        });
    };
    fetchUser();
  }, [navigate]);

  return (
    <div>
      <h1>{`Bonjour ${user.username} !`}</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
}

export default Home;
