import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import RegisterForm from '../../components/RegisterForm';
import Header from '../../components/Header';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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

  return (
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
  );
};

export default Register;
