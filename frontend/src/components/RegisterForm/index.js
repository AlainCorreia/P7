import React from 'react';
import {
  StyledButton,
  StyledFormContainer,
  StyledInput,
  StyledFormContent,
  StyledFormTitle,
  StyledLabel,
  StyledErrorMessage,
  StyledFormLink,
  StyledNavInfo,
} from '../../styles/shared-styles';

const RegisterForm = ({
  handleSubmit,
  setUsername,
  setEmail,
  setPassword,
  errorMessage,
  setErrorMessage
}) => {
  return (
    <StyledFormContainer>
      <StyledFormTitle>Créer un compte</StyledFormTitle>
      <StyledFormContent>
        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor='username'>Nom d'utilisateur</StyledLabel>
          <StyledInput
            id='username'
            type='text'
            name='username'
            placeholder="Nom d'utilisateur"
            onChange={(e) => [setUsername(e.target.value), setErrorMessage('')]}
          />
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
          <StyledButton type='submit'>S'enregister</StyledButton>
        </form>
        <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
        <StyledNavInfo>Déjà un compte ?</StyledNavInfo>
        <StyledFormLink to='/login'>Se Connecter</StyledFormLink>
      </StyledFormContent>
    </StyledFormContainer>
  );
};

export default RegisterForm;
