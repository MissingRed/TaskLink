import React, { useCallback, useContext } from "react";

import app from "../Database/Base.js";
import { AuthContext } from "../Database/Auth";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import firebase from "firebase/app";

const Register = ({ history }) => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleRegister = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, user } = event.target.elements;
      try {
        await app
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(function (result) {
            return result.user.updateProfile({
              displayName: user.value,
            });
          });
        alert("Cuenta creada con exito");
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
      <h1>Registrase</h1>
      <form onSubmit={handleRegister}>
        <p>Email</p>
        <input type="email" name="email" id="" />
        <p>Usuario</p>
        <input type="text" name="user" id="" />
        <p>Contraseña</p>
        <input type="password" name="password" id="" />
        <br />
        <br />

        <button type="submit" className="button">
          Registrase
        </button>
        <p>o</p>
        <div onClick={googleAuth} className="gmail">
          <h3>Registrarse Con google</h3>
        </div>
      </form>
      <br />
      <NavLink to="/">Iniciar Sesion</NavLink>
    </div>
  );
};

export default Register;
