import styled from 'styled-components';
import colors from '../../utils/style/colors';

export const StyledPostsContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 0 16px;
  background-color: ${(props) => props.posts.length > 0 ? colors.secondary : colors.tertiary};

  @media (max-width: 820px) {
    padding: 72px 0 12px;
  }

  @media (max-width: 430px) {
    padding: 64px 0 12px;
  }
`;
