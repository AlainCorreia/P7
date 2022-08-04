import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledHeader, StyledHeaderButton, StyledLogo } from './styles';
import logo from '../../assets/images/icon-left-font-monochrome-white.svg';

const Header = ({ page, logout }) => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <StyledLogo src={logo} alt='Logo de Groupomania' />
      {page === 'login' && (
        <StyledHeaderButton onClick={() => navigate('/register')}>
          S'enregister
        </StyledHeaderButton>
      )}
      {page === 'register' && (
        <StyledHeaderButton onClick={() => navigate('/login')}>
          Se connecter
        </StyledHeaderButton>
      )}
      {page === 'home' && (
        <div>
          <StyledHeaderButton onClick={() => navigate('/newpost')}>
            Nouveau message
          </StyledHeaderButton>
          <StyledHeaderButton onClick={logout}>Déconnexion</StyledHeaderButton>
        </div>
      )}
      {page === 'newpost' && (
        <StyledHeaderButton onClick={() => navigate('/home')}>
          Annuler
        </StyledHeaderButton>
      )}
    </StyledHeader>
  );
};

export default Header;
