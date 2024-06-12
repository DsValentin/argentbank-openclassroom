import "./signin.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setConnexionToken } from "../../store";
import { useState } from "react";

export default function SignIn() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const [signUpModal, setSignUpModal] = useState(false);
  const [loginError, setLoginError] = useState(null);

  async function loginHandleSubmit(e) {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await response.json();
      if (response.status === 200) {
        let token = data.body.token;
        dispatch(setConnexionToken(token));
        if (loginError !== null) {
          setLoginError(null);
        }
      } else if (response.status !== 500) {
        setLoginError("Invalid email or password");
      } else {
        setLoginError("Internal Error, please contact administrator");
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Submit");
  }

  async function signUpHandler(e) {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3001/api/v1/user/signup", {
        method: "POST",
        body: JSON.stringify({
          email: e.target[0].value,
          password: e.target[1].value,
          firstName: e.target[2].value,
          lastName: e.target[3].value,
          userName: e.target[4].value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        dispatch(setSignUpModal(false));
        console.log("User created");
      } else {
        console.log("User not created");
      }
    } catch (error) {
      console.error(error);
    }
    console.log("Submit");
  }

  if (token !== null) {
    window.location.href = "/profile";
  } else {
    return (
      <main className="main">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon" />
          <h1>Sign In</h1>
          <form onSubmit={(e) => loginHandleSubmit(e)}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            {loginError !== null ? <p className="error">{loginError}</p> : null}

            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
          <button
            className="sign-up-button"
            onClick={() => setSignUpModal(true)}
          >
            Sign Up
          </button>
        </section>
        {signUpModal ? (
          <div className="signUpModal">
            <div className="signUpModalCtn">
              <h2>Create your account</h2>
              <form
                className="signUpModalForm input-wrapper"
                onSubmit={(e) => signUpHandler(e)}
              >
                <label htmlFor="email">Email</label>
                <input type="email" placeholder={"eMail"} required />
                <label htmlFor="password">Password</label>
                <input type="password" placeholder={"Password"} required />
                <label htmlFor="first-name">First Name</label>
                <input type="text" placeholder={"First Name"} required />
                <label htmlFor="last-name">Last Name</label>
                <input type="text" placeholder={"Last Name"} required />
                <label htmlFor="username">Username</label>
                <input type="text" placeholder={"Username"} required />
                <button type="submit" className="sign-in-button">
                  Send
                </button>
              </form>
              <button
                className="sign-up-button"
                onClick={() => setSignUpModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </main>
    );
  }
}
