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
import login_icon from '../../assets/images/arrow-right-to-bracket-solid.svg';
import logout_icon from '../../assets/images/arrow-right-from-bracket-solid.svg';
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
          <StyledHeaderButton onClick={() => navigate('/register')}>
            <StyledHeaderButtonIcon src={signup} alt="S'enregister" />
          </StyledHeaderButton>
        )}
        {page === 'register' && (
          <StyledHeaderButton onClick={() => navigate('/login')}>
            <StyledHeaderButtonIcon src={login_icon} alt="Se connecter" />
          </StyledHeaderButton>
        )}
        {page === 'home' && (
          <>
            <StyledHeaderButton onClick={() => navigate('/newpost')}>
              <StyledHeaderButtonIcon src={pen} alt="Nouveau message" />
            </StyledHeaderButton>
            <StyledHeaderButton onClick={logout}>
              <StyledHeaderButtonIcon src={logout_icon} alt="Déconnexion" />
            </StyledHeaderButton>
          </>
        )}
        {page === 'newpost' && (
          <StyledHeaderButton onClick={() => navigate('/home')}>
            <StyledHeaderButtonIcon src={xmark} alt="Annuler" />
          </StyledHeaderButton>
        )}
      </StyledHeaderButtonContainer>
    </StyledHeader>
  );
};

export default Header;
