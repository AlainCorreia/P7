import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        console.log(err);
      });
  };

  return (
    <div>
      <p>Créer un compte</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Nom d'utilisateur</label>
        <input
          type='text'
          name='username'
          placeholder="Nom d'utilisateur"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
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
        <button type='submit'>S'enregister</button>
      </form>
      <span>Déjà un compte ?</span>
      <Link to='/login'>Se Connecter</Link>
    </div>
  );
}

export default Register;
