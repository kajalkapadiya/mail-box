import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  const history = useHistory();
  const addMail = () => {
    history.replace("/mail");
  };
  return (
    <button className="btn btn-primary" onClick={addMail}>
      Compose
    </button>
  );
};

export default Home;
