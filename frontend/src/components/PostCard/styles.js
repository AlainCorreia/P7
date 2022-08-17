import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledCard = styled.li`
  list-style: none;
  margin: 16px auto;
  width: 90%;
  border: 2px solid
    ${(props) =>
      props.isDeleteMode || props.isEditMode
        ? colors.primary
        : colors.tertiary};
  border-radius: 8px;
  background-color: #ffffff;
  padding: 4px;

  @media (max-width: 820px) {
    width: 94%;
  }
`;

export const StyledPostHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: ${colors.primary};
  border-radius: 8px;
`;

export const StyledPostUsername = styled.p`
  font-size: 20px;
  font-weight: 600;
`;

export const StyledPostDate = styled.p`
  font-style: italic;
  font-weight: 400;
`;

export const StyledPostText = styled.p`
  padding: 20px;
  font-size: 17px;
  text-align: justify;

  @media (max-width: 430px) {
    font-size: 16px;
    padding: 12px;
  }
`;

export const StyledImgContainer = styled.div`
  margin: 0 auto;
  max-width: 60%;

  @media (max-width: 960px) {
    max-width: 68%;
  }

  @media (max-width: 820px) {
    max-width: 75%;
  }

  @media (max-width: 430px) {
    max-width: calc(100% - 24px);
  }
`;

export const StyledImg = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
  max-height: 50vw;
  object-fit: contain;

  @media (max-width: 960px) {
    max-height: 60vw; 
  }

  @media (max-width: 820px) {
    max-height: 70vw;
  }

  @media (max-width: 430px) {
    max-height: 80vw;
  }
`;

export const StyledPostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  margin: 20px 0 12px;
`;

export const StyledPostButton = styled.button`
  /* width: 32px; */
  /* height: 32px; */
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
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

export const StyledEditTextArea = styled.textarea`
  resize: none;
  width: 100%;
  padding: 16px;
  font-family: inherit;
  font-size: 17px;
  text-align: justify;
  white-space: normal;
  border: 2px solid ${colors.tertiary};
  border-radius: 5px;
  margin: 16px 0;

  @media (max-width: 430px) {
    font-size: 16px;
    padding: 12px;
  }

  &:focus {
    border: 2px solid ${colors.primary};
    outline: none;
  }
`;

export const StyledLikeButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid ${colors.tertiary};
  border-radius: 5px;
  background-color: #ffffff;
  font-family: 'Lato', sans-serif;
  font-size: 16px;

  &:hover {
    border: 1px solid ${colors.primary};
  }

  &:focus {
    outline: 2px solid ${colors.primary};
    border: none;
    padding: 9px 11px;
  }
`;
export const StyledLikeImg = styled.img`
  width: 22px;
  margin-right: 8px;
`;

export const StyledButtonIcon = styled.img`
  width: 16px;
  max-height: 16px;
`;
export const StyledButtonContainer = styled.div`
  display: flex;
`;
