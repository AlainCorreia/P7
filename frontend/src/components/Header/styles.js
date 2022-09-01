import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledHeader = styled.header`
  height: 74px;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${colors.primary};

  @media (max-width: 430px) {
    height: 64px;
  }
`;

export const StyledLogo = styled.img`
  width: 260px;

  @media (max-width: 430px) {
    width: 200px;
  }
`;
export const StyledHeaderButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  margin-left: 8px;
  background-color: #ffffff;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${colors.tertiary};

  &:hover {
    box-shadow: 2px 2px 2px ${colors.tertiary};
  }

  &:focus {
    outline: 2px solid #000000;
  }
`;

export const StyledHeaderButtonIcon = styled.img`
  width: 24px;
  max-height: 24px;

  @media (max-width: 430px) {
    width: 20px;
    max-height: 20px;
  }
`;
export const StyledHeaderButtonContainer = styled.nav`
  display: flex;
`;
