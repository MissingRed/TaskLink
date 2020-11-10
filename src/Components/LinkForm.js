import React, { useState, useEffect, useContext } from "react";
import { db } from "../Database/Base";
import { AuthContext } from "../Database/Auth";

const LinkForm = (props) => {
  const { currentUser } = useContext(AuthContext);
  const initStateValue = {
    id: currentUser.uid,
    url: "",
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initStateValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentUser.emailVerified) {
      if (
        window.confirm(
          "Por favor verifica tu correo electronico Para agregar links | Precione Aceptar para enviar correo de verificacion"
        ) === true
      ) {
        currentUser
          .sendEmailVerification()
          .then(function () {
            alert("Correo enviado, por favor valida tu bandeja de entreda");
          })
          .catch(function (error) {
            alert(error);
          });
      }
    } else {
      props.addOrEditLink(values);
      setValues({ ...initStateValue });
    }
  };

  const getLinkById = async (id) => {
    const doc = await db.collection(currentUser.uid).doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initStateValue });
    } else {
      getLinkById(props.currentId);
    }
  }, [props.currentId]);

  return (
    <>
      <h1>Agregar Pagina</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="https://someurl.com"
          name="url"
          onChange={handleInputChange}
          value={values.url}
        />
        <br />
        <br />

        <input
          type="text"
          placeholder="Nombre de la pagina"
          name="name"
          onChange={handleInputChange}
          value={values.name}
        />
        <br />
        <br />

        <textarea
          name="description"
          cols="30"
          rows="10"
          placeholder="Descripcion de la pagina"
          onChange={handleInputChange}
          value={values.description}
        ></textarea>
        <br />
        <br />
        <button className="button">
          {props.currentId === "" ? "Guardar Link" : "Actualizar"}
        </button>
      </form>
    </>
  );
};

export default LinkForm;
