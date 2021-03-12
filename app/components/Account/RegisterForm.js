import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

export default function RegisterForm() {
  return (
    <View style={style.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={style.inputForm}
        password={true}
        secureTextEntry={true}
      />
      <Input placeholder="Contraseña" containerStyle={style.inputForm} />
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={style.inputForm}
        password={true}
        secureTextEntry={true}
      />
      <Button
        title="Unirse"
        containerStyle={style.btnContainerRegister}
        buttonStyle={style.btnRegister}
      />
    </View>
  );
}

const style = StyleSheet.create({
  formContainer: {
    // felx: 1,
    // alignItems: "center",
    // justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    width: "95%",
    marginTop: 20,
  },
  btnRegister: {
    backgroundColor: "#00a680",
  },
});
