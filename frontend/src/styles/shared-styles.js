import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../utils/style/colors';

export const StyledInput = styled.input`
  outline: none;
  padding: 16px 20px;
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
  border: none;
  margin: 8px 0 16px;

  &:focus {
    outline: 2px solid ${colors.primary};
  }
`;

export const StyledButton = styled.button`
  padding: 16px 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  width: 100%;
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
    outline: 2px solid ${colors.tertiary};
  }
`;

export const StyledFormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  height: 100vh;
  padding: 0 3px;
`;

export const StyledFormContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px black;
  background-color: ${colors.secondary};
  padding: 20px;
  border-radius: 5px;
  max-width: 400px;
`;

export const StyledFormTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: white;
`

export const StyledLabel = styled.label`
  font-size: 18px;
`

export const StyledErrorMessage = styled.div`
  padding: ${(props) =>
      props.page === 'newpost'
        ? '0 0 16px'
        : '16px 0 0'};
  color: ${colors.primary};
  font-size: 18px;
`
export const StyledNavInfo = styled.p`
  padding: 16px 0 4px;
`

export const StyledFormLink = styled(Link)`
  text-decoration: none;
  font-size: 18px;
  color: ${colors.tertiary};

  &:hover {
    font-weight: 700;
  }
`
export const StyledNewPostImg = styled.img`
  display: block;
  width: 400px;
  max-width: 100%;
  max-height: 400px;
`;

export const StyledSelectImgButton = styled.button`
  background-color: ${colors.tertiary};
  padding: 8px 12px;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  margin: 12px 20px 20px 0;

  @media (max-width: 430px) {
    font-size: 15px;
    margin-right: 16px;
  }

  &:hover {
    box-shadow: 2px 2px 2px ${colors.tertiary};
  }
`;

export const StyledNewPostInput = styled.input`
  display: none;
`;