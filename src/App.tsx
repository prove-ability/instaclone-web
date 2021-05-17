import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { isLoggedInVar, darkModeVar } from "./apollo";
import { darkTheme, lightTheme, GlobalStyles } from "./styles";
import { login, loginVariables } from "./__generated__/login";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  // const onCompleted =
  const [loginMutation] = useMutation<login, loginVariables>(LOGIN_MUTATION, {
    variables: {
      username: "test",
      password: "test",
    },
    onCompleted: (data) => data.login.token,
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? <Home /> : <Login />}
          </Route>
          <Route>
            {/* <Redirect to="/" /> */}
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
