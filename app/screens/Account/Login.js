import React, { useRef } from "react";
import Toast from "react-native-easy-toast";

import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import LoginForm from "../../components/Account/LoginForm";

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/logo.png")}
        resizeMode="contain"
        style={style.logo}
      />
      <View style={style.viewContainer}>
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={style.divier} />
      <Text>Social Login</Text>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

function CreateAccount(props) {
  const navigation = useNavigation();

  return (
    <Text style={style.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        onPress={() => navigation.navigate("register")}
        style={style.btnRegister}
      >
        Registrate!
      </Text>
    </Text>
  );
}

const style = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold",
  },
  divier: {
    backgroundColor: "#00a680",
    margin: 40,
  },
});
