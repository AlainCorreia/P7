import styled from "styled-components";
import { keyframes } from "styled-components";
import colors from "../../utils/style/colors";

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

export const StyledSpinner = styled.span`
    width: 48px;
    height: 48px;
    display: block;
    position: absolute;
    top: 50%;
    left: calc(50% - 24px);
    border: 5px solid ${colors.primary};
    border-bottom-color: ${colors.secondary};
    border-radius: 50%;
    animation: ${spin} .5s linear infinite;
`