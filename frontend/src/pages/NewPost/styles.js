import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledNewPostContainer = styled.section`
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
