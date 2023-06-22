import { useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../auth/xtra";
import Form from "react-bootstrap/Form";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confirmRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const passHandler = () => {
    history.replace("/forgot");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const emailInput = emailRef.current.value;
    const passInput = passRef.current.value;
    const confirmPass = confirmRef.current.value;

    if (passInput === confirmPass) {
      setIsLoading(true);
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfxzHeaC4HkrrkcK-zsZdImlHgRekj73E";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfxzHeaC4HkrrkcK-zsZdImlHgRekj73E";
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passInput,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const dataEmail = data.email;
          const dataId = data.idToken;
          dispatch(authActions.login({ dataEmail, dataId }));
          console.log("login");
          history.replace("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("please fill the correct password");
    }
  };

  return (
    <div className="container">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="card">
          <Form onSubmit={submitHandler} className="card-body">
            <h1 className="card-title">{isLogin ? "Login" : "SignUp"}</h1>
            <div className="form-floating py-1">
              <input
                type="text"
                id="email"
                ref={emailRef}
                required
                placeholder="Enter email"
                className="form-control"
              ></input>
              <label htmlFor="email" className="form-label">
                email
              </label>
            </div>
            <div className="form-floating py-1">
              <input
                type="password"
                id="pass"
                ref={passRef}
                required
                placeholder="Enter password"
                className="form-control"
              ></input>
              <label htmlFor="pass">password</label>
            </div>
            <div className="form-floating py-1">
              <input
                type="password"
                id="confirmPass"
                ref={confirmRef}
                required
                autoComplete="off"
                placeholder="Confirm password"
                className="form-control"
              ></input>
              <label htmlFor="pass">confirm password</label>
            </div>
            <div>
              <Button variant="link" onClick={passHandler}>
                forgot password
              </Button>
            </div>
            <div>
              {!isLoading && (
                <button className="btn btn-primary m-1">
                  {isLogin ? "Login" : "create account"}
                </button>
              )}
              <br />
              {isLoading && <p>Sending request...</p>}
              <button
                className="btn btn-outline-success m-1"
                onClick={switchAuthModeHandler}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
