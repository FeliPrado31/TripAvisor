import React, { useState, useRef, useEffect } from "react";
import * as firebase from "firebase";
import Toast from "react-native-easy-toast";

import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import Loading from "../../components/Loading";
import InfoUser from "../../components/Account/InfoUser";
import AccountOptions from "../../components/Account/AccountOptions";

export default function UserLogged() {
  const toastRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loadinText, setLoadinText] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [reloadUserInfo, setReloadUserInfo] = useState(false)

  useEffect(() => {
    (async () => {
      const user = await firebase.auth().currentUser;
      setUserInfo(user);
    })();
    setReloadUserInfo(false)
  }, [reloadUserInfo]);
  return (
    <View style={style.viewUserInfo}>
      {userInfo && (
        <InfoUser
          userInfo={userInfo}
          toastRef={toastRef}
          setLoadinText={setLoadinText}
          setLoading={setLoading}
        />
      )}

      <AccountOptions userInfo={userInfo} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo}/>
      <Button
        title="Cerrar sesión"
        buttonStyle={style.btnCloseSession}
        titleStyle={style.btnCloseSessionText}
        onPress={() => firebase.auth().signOut()}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text={loadinText} isVisible={loading} />
    </View>
  );
}

const style = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  btnCloseSession: {
    marginTop: 20,
    borderRadius: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e3e3e3",
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
    paddingTop: 10,
    paddingBottom: 10,
  },
  btnCloseSessionText: {
    color: "#00a680",
  },
});
