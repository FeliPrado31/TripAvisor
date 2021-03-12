import React from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";

import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";

export default function Account() {
  const [login, setLogin] = React.useState(null);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) return <Loading isVisible={true} text="Cargando" />;

  return login ? <UserLogged /> : <UserGuest />;
}
