import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { UserContext } from '../../context/UserContext';
import LoginForm from '../../components/LoginForm';
import Header from '../../components/Header';
import LoadingSpinner from '../../components/LoadingSpinner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user, setUser, isLoading } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.username) {
      navigate('/');
    }
  }, [navigate, user.username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post('auth/login', { email, password })
      .then((res) => {
        if (res.data.userId) {
          setUser(res.data);
          navigate('/');
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
      });
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    !user.username && (
      <>
        <Header page="login" />
        <LoginForm
          handleSubmit={handleSubmit}
          setEmail={setEmail}
          setPassword={setPassword}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </>
    )
  );
};

export default Login;
