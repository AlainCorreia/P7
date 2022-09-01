import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const StyledLikeButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  border: 1px solid ${colors.tertiary};
  border-radius: 5px;
  background-color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    border: 1px solid ${colors.primary};
  }

  &:focus {
    outline: 2px solid ${colors.primary};
    border: none;
    padding: 7px 9px;
  }
`;

export const StyledLikeImg = styled.img`
  width: 22px;
  margin-right: 8px;
`;
