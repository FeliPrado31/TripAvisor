import React, { useState } from "react";
import * as firebase from "firebase";

import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { isEmpty, size } from "lodash";
import { useNavigation } from "@react-navigation/native";

import Loading from "../../components/Loading";

import { validateEmail } from "../../utils/validation";

function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setshowPassword] = useState(true);
  const [showPasswordRepeat, setshowPasswordRepeat] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormValue());
  const navigation = useNavigation();

  const onSubmit = () => {
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios.");
    } else if (!validateEmail(formData.email)) {
      console.log(!validateEmail(formData.email), formData.email);
      console.log("email");
    } else if (formData.password !== formData.repeatPassword) {
      console.log("deben de ser iguales");
    } else if (size(formData.password) < 6) {
      console.log("tamaño");
    } else {
      setLoading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((res) => {
          setLoading(false);
          navigation.navigate("account");
        })
        .catch((err) => {
          setLoading(false);
          toastRef.current.show("Error al crear la cuenta!");
        });
    }
  };

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  return (
    <View style={style.formContainer}>
      <Input
        placeholder="Correo electronico"
        containerStyle={style.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={style.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={style.inputForm}
        onChange={(e) => onChange(e, "password")}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            iconStyle={style.iconRight}
            onPress={() => setshowPassword(!showPassword)}
          />
        }
      />
      <Input
        placeholder="Repetir Contraseña"
        onChange={(e) => onChange(e, "repeatPassword")}
        containerStyle={style.inputForm}
        password={true}
        secureTextEntry={showPasswordRepeat ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPasswordRepeat ? "eye-off-outline" : "eye-outline"}
            iconStyle={style.iconRight}
            onPress={() => setshowPasswordRepeat(!showPasswordRepeat)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={style.btnContainerRegister}
        buttonStyle={style.btnRegister}
        onPress={() => onSubmit()}
      />
      <Loading isVisible={loading} text={"Creando cuenta..."} />
    </View>
  );
}

const style = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  iconRight: {
    color: "#c1c1c1",
  },
});
