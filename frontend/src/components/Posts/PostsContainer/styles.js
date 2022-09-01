import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const StyledMainContainer = styled.main`
  height: calc(100vh - 74px);
  margin-top: 74px;
  overflow-y: auto;

  @media (max-width: 430px) {
    height: calc(100vh - 64px);
    margin-top: 64px;
  }
`;

export const StyledPostsContainer = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 0;
  background-color: ${(props) =>
    props.posts.length > 0 ? colors.secondary : colors.tertiary};

  @media (max-width: 820px) {
    padding: 12px 0;
  }

  @media (max-width: 430px) {
    padding: 8px 0;
  }
`;
