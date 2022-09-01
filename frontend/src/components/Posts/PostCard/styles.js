import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const StyledCard = styled.li`
  list-style: none;
  margin: 16px auto;
  width: 90%;
  border: 2px solid
    ${(props) =>
      props.isDeleteMode || props.isEditMode
        ? colors.primary
        : colors.tertiary};
  border-radius: 4px;
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
  margin-bottom: 20px;
  background-color: ${colors.primary};
  border-radius: 4px;

  @media (max-width: 430px) {
    margin-bottom: 12px;
  }
`;

export const StyledPostUsername = styled.p`
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 430px) {
    font-size: 18px;
  }
`;

export const StyledPostDate = styled.p`
  font-style: italic;
  font-weight: 400;

  @media (max-width: 430px) {
    font-size: 15px;
  }
`;

export const StyledPostText = styled.p`
  padding: 0 20px 20px;
  font-size: 17px;
  text-align: justify;
  white-space: pre-line;

  @media (max-width: 430px) {
    font-size: 16px;
    padding: 0 12px 12px;
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
  max-height: 640px;
  object-fit: contain;

  @media (max-width: 1200px) {
    max-height: 52vw;
  }

  @media (max-width: 960px) {
    max-height: 59vw;
  }

  @media (max-width: 820px) {
    max-height: 68vw;
  }

  @media (max-width: 430px) {
    max-height: 80vw;
  }
`;

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

export const StyledEditInfo = styled.p`
  font-size: 14px;
  font-style: italic;
  text-align: end;
  padding: 8px 8px 0;
  margin-bottom: -8px;
`