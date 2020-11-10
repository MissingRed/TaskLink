import React, { useContext } from "react";
import app from "../Database/Base.js";
import { AuthContext } from "../Database/Auth";
import Links from "../Components/Links";

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div className="center">
        <img
          src={
            currentUser.photoURL === null
              ? "imagenes/piolon.gif"
              : currentUser.photoURL
          }
          alt="Avatar"
        />
        <h1>
          Bienvenido <span className="delgado">{currentUser.displayName}</span>
        </h1>
        <h1>
          Tu ID es: <span className="delgado">{currentUser.uid}</span>
        </h1>

        <button onClick={() => app.auth().signOut()} className="button">
          Cerrar sesión
        </button>
        <br />
        <br />
        <br />
        <div className="separador">
          <Links />
        </div>
      </div>
    </>
  );
};

export default Home;
