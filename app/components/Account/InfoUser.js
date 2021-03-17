import React from "react";

import * as firebase from "firebase";
import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

export default function InfoUser(props) {
  const {
    userInfo: { photoURL, displayName, email, uid },
    toastRef,
    setLoadinText,
    setLoading,
  } = props;

  const changeAvatar = async () => {
    const resultPermission = await Permission.askAsync(Permission.CAMERA);
    const resultPermissionCamera = resultPermission.permissions.camera.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria.");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show("Has cerrado la seleccion de imagenes.");
      } else {
        uploadImage(result.uri)
          .then(() => {
            updatePhotoUrl();
          })
          .catch((err) => {
            console.error(err);
            toastRef.current.show("Error al subir el avatar");
          });
      }
    }
  };

  const updatePhotoUrl = async () => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (res) => {
        const update = {
          photoURL: res,
        };

        await firebase.auth().currentUser.updateProfile(update);
        setLoading(false);
      })
      .catch(() => {
        toastRef.current.show("Error al actualizar el avatar");
      });
  };

  const uploadImage = async (uri) => {
    setLoadinText("Actualizando avatar");
    setLoading(true);
    const res = await fetch(uri);
    const blob = await res.blob();
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  return (
    <View style={style.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        containerStyle={style.userInfoAvatar}
        onPress={() => changeAvatar()}
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/img/avatar-default.jpg")
        }
      />
      <View>
        <Text style={style.displayText}>
          {displayName ? displayName : "Anonimo"}
        </Text>
        <Text>{email ? email : "Social Login"}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayText: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
