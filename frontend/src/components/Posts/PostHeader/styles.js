import styled from 'styled-components';
import colors from '../../../utils/style/colors';

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
