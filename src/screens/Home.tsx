import { logUserOut } from "../apollo";

// import { isLoggedInVar } from "../apollo";
import { useHistory } from "react-router-dom";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const history = useHistory();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => logUserOut(history)}>Log out now!</button>
    </div>
  );
};

export default Home;
