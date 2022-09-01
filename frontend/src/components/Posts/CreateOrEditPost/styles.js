import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const StyledNewPostContainer = styled.section`
  max-width: 1200px;
  padding: ${(props) =>
    props.page === 'newpost' ? '96px 16px 16px' : '0 16px'};
  font-family: 'Lato', sans-serif;

  @media (max-width: 430px) {
    padding: ${(props) => (props.page === 'newpost' ? '96px 16px 16px' : '0')};
  }
`;

export const StyledTextArea = styled.textarea`
  resize: none;
  width: 100%;
  outline: 2px solid ${colors.tertiary};
  padding: 16px 20px;
  font-family: inherit;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  margin-bottom: 16px;

  @media (max-width: 430px) {
    font-size: 16px;
    padding: 12px;
  }

  &:focus {
    outline: 2px solid ${colors.primary};
  }
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
  margin: 12px 20px 10px 0;

  @media (max-width: 430px) {
    font-size: 15px;
    margin-right: 16px;
  }

  &:hover {
    box-shadow: 2px 2px 2px ${colors.tertiary};
  }

  &:focus {
    outline: 2px solid #000000;
  }
`;

export const StyledNewPostInput = styled.input`
  display: none;
`;

export const StyledImgContainer = styled.div`
  width: fit-content;
  max-width: 400px;
`;

export const StyledNewPostImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 400px;
  object-fit: contain;
`;

export const StyledErrorMessage = styled.div`
  padding: ${(props) =>
      props.page === 'newpost'
        ? '0 0 16px'
        : '16px 0 0'};
  color: ${colors.primary};
  font-size: 18px;
`;