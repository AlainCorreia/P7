import React, { useContext, useEffect } from 'react';
import { api } from '../../utils/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import PostsContainer from '../../components/Posts/PostsContainer/PostsContainer';
import Header from '../../components/Header/Header';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

function Home() {
  const { user, setUser, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.username && !isLoading) {
      navigate('/login');
    }
  }, [user.username, navigate, isLoading]);

  const handleLogout = () => {
    setUser({});
    api
      .get('auth/logout')
      .then(() => {
        Cookies.remove('jwt');
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Header page='home' logout={handleLogout} />
      <PostsContainer />
    </>
  );
}

export default Home;
