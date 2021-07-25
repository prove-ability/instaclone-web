import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "#fafafa",
  fontColor: "rgb(38,38,38)",
  borderColor: "rgb(219, 219, 219)",
};

export const darkTheme = {
  accent: "#0095f6",
  fontColor: "white",
  bgColor: "#2c2c2c",
  borderColor: "rgb(219, 219, 219)",
};

export const GlobalStyles = createGlobalStyle`
   ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing: border-box;
    }
    body {
      background-color: ${({ theme }) => theme.bgColor};
      font-size: 14px;
      font-family: 'Open Sans', sans-serif;
      color: ${({ theme }) => theme.fontColor}
    }
    a {
      text-decoration: none;
      color:inherit;
    }
`;
