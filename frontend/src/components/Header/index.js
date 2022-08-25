import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StyledHeader,
  StyledHeaderButton,
  StyledLogo,
  StyledHeaderButtonIcon,
  StyledHeaderButtonContainer,
} from './styles';
import logo from '../../assets/images/icon-left-font-monochrome-white.svg';
import loginIcon from '../../assets/images/arrow-right-to-bracket-solid.svg';
import logoutIcon from '../../assets/images/arrow-right-from-bracket-solid.svg';
import signup from '../../assets/images/user-plus-solid.svg';
import pen from '../../assets/images/pen-to-square-solid.svg';
import xmark from '../../assets/images/xmark-solid.svg';

const Header = ({ page, logout }) => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <StyledLogo src={logo} alt="Logo de Groupomania" />
      <StyledHeaderButtonContainer>
        {page === 'login' && (
          <StyledHeaderButton
            aria-label="S'enregistrer"
            onClick={() => navigate('/register')}
          >
            <StyledHeaderButtonIcon src={signup} alt="S'enregister" />
          </StyledHeaderButton>
        )}
        {page === 'register' && (
          <StyledHeaderButton
            aria-label="Se connecter"
            onClick={() => navigate('/login')}
          >
            <StyledHeaderButtonIcon src={loginIcon} alt="Se connecter" />
          </StyledHeaderButton>
        )}
        {page === 'home' && (
          <>
            <StyledHeaderButton
              aria-label="Nouveau message"
              onClick={() => navigate('/newpost')}
            >
              <StyledHeaderButtonIcon src={pen} alt="Nouveau message" />
            </StyledHeaderButton>
            <StyledHeaderButton aria-label="Déconnexion" onClick={logout}>
              <StyledHeaderButtonIcon src={logoutIcon} alt="Déconnexion" />
            </StyledHeaderButton>
          </>
        )}
        {page === 'newpost' && (
          <StyledHeaderButton
            aria-label="Annuler"
            onClick={() => navigate('/home')}
          >
            <StyledHeaderButtonIcon src={xmark} alt="Annuler" />
          </StyledHeaderButton>
        )}
      </StyledHeaderButtonContainer>
    </StyledHeader>
  );
};

export default Header;
