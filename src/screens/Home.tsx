import { isLoggedInVar } from "../apollo";
interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => isLoggedInVar(false)}>Log out now!</button>
    </div>
  );
};

export default Home;
