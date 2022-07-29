import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';
import LoginForm from '../../components/LoginForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useContext(UserContext)

  const navigate = useNavigate();

  useEffect(() => {
    if(user.username) {
      navigate('/')
    }
  }, [navigate, user.username])

  const handleSubmit = (e) => {

    e.preventDefault();

    axios
      .post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.userId) {
          setUser(res.data)
          navigate('/');
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
      });
  };

  return (
    <>
      <LoginForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
};

export default Login;
