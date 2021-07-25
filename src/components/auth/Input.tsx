import styled from "styled-components";

interface InputProps {
  hasError?: boolean;
}

const Input = styled.input<InputProps>`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid
    ${({ hasError, theme }) => (hasError ? "tomato" : theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

// interface InputProps {
//   type: "text" | "password";
//   placeholder: string;
// }

// const Input: React.FC<InputProps> = (props) => {
//   return <SInput {...props} />;
// };

export default Input;
