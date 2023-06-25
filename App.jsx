import { useSelector } from "react-redux";
import "./App.css";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./component/pages/Login";
import MainHeader from "./component/pages/MainHeader";
import Home from "./component/pages/Home";
import About from "./component/pages/About";
import Product from "./component/pages/Product";
import ForgotPass from "./component/pages/ForgotPass";
import Mail from "./component/pages/Mail";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isAuth);

  return (
    <>
      <div className="app-container">
        <MainHeader />
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            {isLoggedIn && <Home />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/product">
            {isLoggedIn && <Product />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/about">
            {isLoggedIn && <About />}
            {!isLoggedIn && <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/mail">
            <Mail />
          </Route>
          <Route path="/forgot">
            <ForgotPass />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
