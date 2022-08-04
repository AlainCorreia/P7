import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledCard = styled.div`
  margin: 16px auto;
  width: 90%;
  border: 2px solid ${colors.tertiary};
  border-radius: 8px;
  background-color: white;
  padding: 4px;
`

export const StyledPostHeader = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: ${colors.primary};
  border-radius: 8px;
`

export const StyledPostUsername = styled.p`
  font-size: 18px;
  font-weight: 600;
`

export const StyledPostDate = styled.p`
  font-style: italic;
  font-weight: 400;
`

export const StyledPostText = styled.p`
  padding: 20px; 
  font-size: 17px;
`

export const StyledImgContainer = styled.div`
  margin: 0 auto;
  width: 80%;
`

export const StyledImg = styled.img`
  display: block;
  margin: auto;
  width: 100%;
  height: 100%;
  max-width: 760px;
  max-height: 760px;
  object-fit: contain;
`

export const StyledPostFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 8px;
  margin: 12px 0;
`

export const StyledPostButton = styled.button`
  padding: 4px 8px;
  margin-right: 8px;
  background-color: ${colors.tertiary};
  outline: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Lato', sans-serif;

  &:hover {
    box-shadow: 2px 2px 2px ${colors.tertiary};
  }

  &:focus {
    outline: 2px solid #000000;
  }
`;
