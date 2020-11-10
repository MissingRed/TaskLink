import React, { useCallback, useContext } from "react";

import "firebase/auth";
import { withRouter, Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Database/Auth";

import app from "../Database/Base.js";
import firebase from "firebase/app";

const Login = ({ history }) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/Home");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const googleAuth = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .catch((err) => {
        alert(err);
      });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/Home" />;
  }
  return (
    <div className="center">
      <h1>Login</h1>
      <br />
      <form onSubmit={handleLogin}>
        <p>Email</p>
        <input type="email" name="email" />
        <p>Contraseña</p>
        <input type="password" name="password" />
        <br />
        <br />
        <button type="submit" className="button">
          Iniciar Sesion
        </button>
        <br />
        <br />
        <NavLink to="/Register">Registrate Ahora!</NavLink>
        <br />
        <br />
        <div onClick={googleAuth} className="gmail">
          <h3>Iniciar Sesion Con google</h3>
        </div>
      </form>
    </div>
  );
};

export default withRouter(Login);
