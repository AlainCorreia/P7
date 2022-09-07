import styled from 'styled-components';

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

export const StyledEditInfo = styled.p`
  font-size: 14px;
  font-style: italic;
  text-align: end;
  padding: 8px 8px 0;
  margin-bottom: -8px;
`;
