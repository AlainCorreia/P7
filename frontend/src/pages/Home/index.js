import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PostsContainer from '../../components/PostsContainer';

function Home() {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username) {
      navigate('/login');
    }
  }, [user.username, navigate]);

  const handleLogout = () => {
    axios
      .get('http://localhost:5000/api/auth/logout', { withCredentials: true })
      .then((res) => {
        setUser({});
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>{`Bonjour ${user.username} !`}</h1>
      <button onClick={handleLogout}>Se déconnecter</button>
      <PostsContainer />
    </div>
  );
}

export default Home;
