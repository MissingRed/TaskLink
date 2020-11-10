import React, { useEffect, useState, useContext } from "react";
import LinkForm from "./LinkForm";
import { db } from "../Database/Base";
import { AuthContext } from "../Database/Auth";

const Links = () => {
  const [links, SetLinks] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const { currentUser } = useContext(AuthContext);

  const addOrEditLink = async (linkObject) => {
    if (currentId === "") {
      await db.collection(currentUser.uid).doc().set(linkObject);
      alert("Link agregado");
    } else {
      await db.collection(currentUser.uid).doc(currentId).update(linkObject);
      alert("Link Actualizado");
      setCurrentId("");
    }
  };

  const getLinks = async () => {
    db.collection(currentUser.uid).onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        // console.log(doc.id);
        docs.push({ ...doc.data(), id: doc.id });
      });
      SetLinks(docs);
    });
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("Estas seguro de eliminar el enlace?") === true) {
      await db.collection(currentUser.uid).doc(id).delete();
      alert("Link eliminado");
    }
  };

  useEffect(() => {
    getLinks();
  }, []);

  return (
    <>
      <LinkForm {...{ addOrEditLink, currentId, links }} />
      <br />
      <hr />
      <h1>Links</h1>
      <div>
        {links.map((link) => (
          <div key={link.id} className="border">
            <h3>{link.name}</h3>
            <p>{link.description}</p>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              Ir a Sitio Web
            </a>
            <br />
            <br />
            <i className="red" onClick={() => onDeleteLink(link.id)}>
              Eliminar Pagina
            </i>
            <br />
            <br />
            <i className="blue" onClick={() => setCurrentId(link.id)}>
              Actualizar Pagina
            </i>
            <br />
            <br />
          </div>
        ))}
      </div>
    </>
  );
};

export default Links;
