import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const StyledPostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  padding: 8px 8px 4px;
  border-top: 1px solid ${colors.tertiary};
`;

export const StyledPostButton = styled.button`
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
  background-color: ${colors.tertiary};
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-size: 16px;

  & > span {
    margin-left: 8px;
  }

  &:hover {
    box-shadow: 2px 2px 2px ${colors.tertiary};
  }

  &:focus {
    outline: 2px solid #000000;
  }
`;

export const StyledButtonIcon = styled.img`
  width: 16px;
  max-height: 16px;
`;
export const StyledButtonContainer = styled.div`
  display: flex;
`;
