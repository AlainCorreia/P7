import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledNewPostContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 16px 16px;
  font-family: 'Lato', sans-serif;
  background-color: ${colors.secondary};
`;

export const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  outline: none;
  padding: 16px 20px;
  font-family: inherit;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  margin-bottom: 16px;

  &:focus {
    outline: 2px solid ${colors.primary};
  }
`;

export const StyledNewPostImg = styled.img`
  display: block;
  max-width: 400px;
  max-height: 400px;
`;

export const StyledSelectImgButton = styled.button`
  background-color: ${colors.tertiary};
  padding: 12px 16px;
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  font-size: 16px;
  font-family: 'Lato', sans-serif;
  margin: 12px 20px 20px 0;

  &:hover {
    box-shadow: 2px 2px 2px ${colors.tertiary};
  }
`;

export const StyledNewPostInput = styled.input`
  display: none;
`;
