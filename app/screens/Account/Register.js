import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import RegisterForm from "../../components/Account/RegisterForm";

export default function Register() {
  return (
    <View>
      <Image
        source={require("../../../assets/logo.png")}
        style={style.logo}
        resizeMode="contain"
      />
      <View style={style.viewForm}>
        <RegisterForm />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  viewForm: {
    marginRight: 40,
    marginLeft: 40,
  },
});
