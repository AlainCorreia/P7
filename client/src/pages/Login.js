import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/user/login', { email, password }, {withCredentials: true})
      .then((res) => {
        if (res.data.userId) {
          navigate('/');
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.error);
      });
  };

  return (
    <div>
      <p>Connexion</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor='password'>Mot de passe</label>
        <input
          type='password'
          name='password'
          placeholder='Mot de passe'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type='submit'>Se connecter</button>
      </form>
      <div>{errorMessage}</div>
      <span>Pas encore de compte ?</span>
      <Link to='/register'>S'enregistrer</Link>
    </div>
  );
}

export default Login;
