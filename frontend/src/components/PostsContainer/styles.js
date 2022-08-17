import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledPostsContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 96px 0 16px;
  background-color: ${colors.secondary};

  @media (max-width: 820px) {
    padding: 72px 0 12px;
  }
`;
