import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import RegisterForm from '../../components/RegisterForm';
import Header from '../../components/Header';
import { UserContext } from '../../context/UserContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, isLoading } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username) {
      navigate('/');
    }
  }, [navigate, user.username]);

  const handleSubmit = (e) => {
    e.preventDefault();

    api
      .post('auth/register', { username, email, password })
      .then((res) => {
        navigate('/login');
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
        <Header page="register" />
        <RegisterForm
          handleSubmit={handleSubmit}
          setUsername={setUsername}
          setEmail={setEmail}
          setPassword={setPassword}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      </>
    )
  );
};

export default Register;
