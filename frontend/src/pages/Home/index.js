import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PostsContainer from '../../components/PostsContainer';
import Header from '../../components/Header';

function Home() {
  const [user, setUser, isLoading] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if ((!user.username) && !isLoading) {
      navigate('/login');
    }
  }, [user.username, navigate, isLoading]);

  const handleLogout = () => {
    setUser({});
    axios
      .get('http://localhost:5000/api/auth/logout', { withCredentials: true })
      .then((res) => {
        Cookies.remove('jwt');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    isLoading ? <h1>Loading...</h1> :
    <>
      <Header page='home' logout={handleLogout} />
      <main>
        <PostsContainer />
      </main>
    </>
  );
}

export default Home;
