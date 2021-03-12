import React from "react";

import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function UserGuest() {
  const navigation = useNavigation();
  return (
    <ScrollView centerContent={true} style={styles.viewBody}>
      <Image
        source={require("../../../assets/img/user-guest.jpg")}
        resizeMode="contain"
        style={styles.image}
      />
      <Text style={styles.title}>Consulta tu perfil de TripVisor</Text>
      <Text style={styles.description}>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y
        archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de
        las industrias desde el año 1500, cuando un impresor (N. del T. persona
        que se dedica a la imprenta) desconocido usó una galería de textos y los
        mezcló de tal manera que logró hacer un libro de textos especimen.{" "}
      </Text>
      <View style={styles.viewBtn}>
        <Button
          buttonStyle={styles.btnStyle}
          containerStyle={styles.btnContainer}
          title="Ver tu perfil"
          onPress={() => navigation.navigate("login")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    marginLeft: 30,
    marginRight: 30,
  },
  image: {
    height: 300,
    width: "100%",
    marginBottom: 40,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
  },
  btnStyle: {
    backgroundColor: "#00a680",
  },
  viewBtn: {
    flex: 1,
    alignItems: "center",
  },
  btnContainer: {
    width: "70%",
  },
});
