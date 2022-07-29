import React, { useState } from 'react';
import axios from 'axios';
import RegisterForm from '../../components/RegisterForm';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: 'http://localhost:5000/api/auth/register',
      withCredentials: true,
      data: { username, email, password },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
      });
  };

  return (
    <RegisterForm
      handleSubmit={handleSubmit}
      setUsername={setUsername}
      setEmail={setEmail}
      setPassword={setPassword}
      errorMessage={errorMessage}
      setErrorMessage={setErrorMessage}
    />
  );
};

export default Register;
