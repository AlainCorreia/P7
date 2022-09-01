import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  background-color: ${colors.secondary};
`;

export const StyledButton = styled.button`
  width: calc(100% - 32px);
  margin: 0 auto 16px;;
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${colors.primary};
  color: #ffffff;
  font-weight: 900;
  font-size: 20px;
  font-family: 'Lato', sans-serif;

  &:hover {
    box-shadow: 2px 2px 2px ${colors.tertiary};
  }

  &:focus {
    outline: 2px solid #000000;
  }
`;