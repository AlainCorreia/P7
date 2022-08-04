import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${colors.primary};
`

export const StyledLogo = styled.img`
  width: 320px;
`
export const StyledHeaderButton = styled.button`
  padding: 4px 8px;
  margin-right: 8px;
  background-color: #ffffff;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: ${colors.tertiary};
  font-size: 16px;
  font-weight: 600;
  font-family: 'Lato', sans-serif;

  &:hover {
    color: #000000;
    box-shadow: 2px 2px 2px ${colors.tertiary};
  }

  &:focus {
    outline: 2px solid #000000;
  }
`;
