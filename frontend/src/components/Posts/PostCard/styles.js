import styled from 'styled-components';
import colors from '../../../utils/style/colors';

export const StyledCard = styled.li`
  list-style: none;
  margin: 16px auto;
  width: 90%;
  border: 2px solid
    ${(props) =>
      props.state.isDeleteMode || props.state.isEditMode
        ? colors.primary
        : colors.tertiary};
  border-radius: 4px;
  background-color: #ffffff;
  padding: 4px;

  @media (max-width: 820px) {
    width: 94%;
  }
`;
