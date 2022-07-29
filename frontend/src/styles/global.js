import { createGlobalStyle } from 'styled-components';
import colors from '../utils/style/colors';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${colors.tertiary};
    font-family: 'Lato', sans-serif;
  }
`;

export default GlobalStyle;
