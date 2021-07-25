import styled from "styled-components";

const Button = styled.input`
  border: none;
  margin-top: 12px;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${({ disabled }) => (disabled ? "0.2" : "1")};
`;

// interface ButtonProps {
//   type: "submit" | "button" | "reset";
//   value: string;
// }

// const Button: React.FC<ButtonProps> = (props) => {
//   return <SButton {...props} />;
// };

export default Button;
