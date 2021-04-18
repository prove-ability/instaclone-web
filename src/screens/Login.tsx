import styled from "styled-components";

import { darkModeVar } from "../apollo";

interface LoginProps {}

const Title = styled.h1`
  color: ${({ theme }) => theme.fontColor};
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.bgColor};
`;

const Login: React.FC<LoginProps> = () => {
  return (
    <Container>
      <Title>Login</Title>
      <button onClick={() => darkModeVar(true)}>To dark</button>
      <button onClick={() => darkModeVar(false)}>To light</button>
    </Container>
  );
};

export default Login;
