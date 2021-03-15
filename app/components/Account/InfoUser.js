import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-elements";

export default function InfoUser(props) {
  const { userInfo } = props;
  return (
    <View style={style.viewUserInfo}>
      <Avatar
        rounded
        icon={{ name: "edit", type: "font-awesome" }}
        size="large"
        containerStyle={style.userInfoAvatar}
      />
      <View>
        <Text style={style.displayText}>Feli Prado</Text>
        <Text>FeliPrado99@gmail.com</Text>
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
