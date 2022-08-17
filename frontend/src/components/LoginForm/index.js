import React from 'react';
import {
  StyledButton,
  StyledFormContainer,
  StyledFormContent,
  StyledInput,
  StyledFormTitle,
  StyledLabel,
  StyledErrorMessage,
  StyledNavInfo,
  StyledFormLink,
} from '../../styles/shared-styles';

const LoginForm = ({ handleSubmit, setEmail, setPassword, errorMessage, setErrorMessage }) => {
  return (
    <StyledFormContainer>
      <StyledFormTitle id='login'>Connexion</StyledFormTitle>
      <StyledFormContent>
        <form aria-labelledby='login' onSubmit={handleSubmit}>
          <StyledLabel htmlFor='email'>Email</StyledLabel>
          <StyledInput
            id='email'
            type='text'
            name='email'
            placeholder='Email'
            onChange={(e) => [setEmail(e.target.value), setErrorMessage('')]}
          />
          <StyledLabel htmlFor='password'>Mot de passe</StyledLabel>
          <StyledInput
            id='password'
            type='password'
            name='password'
            placeholder='Mot de passe'
            onChange={(e) => [setPassword(e.target.value), setErrorMessage('')]}
          />
          <StyledButton type='submit'>Se connecter</StyledButton>
        </form>
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        <StyledNavInfo>Pas encore de compte ?</StyledNavInfo>
        <StyledFormLink to='/register'>S'enregistrer</StyledFormLink>
      </StyledFormContent>
    </StyledFormContainer>
  );
};

export default LoginForm;
