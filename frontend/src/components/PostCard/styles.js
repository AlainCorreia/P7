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
  font-weight: 300;
`

export const StyledPostText = styled.p`
  padding: 20px; 
  font-size: 17px;
`

export const StyledImgContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 760px;
  max-height: 760px;
`

export const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`