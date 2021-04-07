import React, { useState, useRef, useCallback } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { Image, Icon, Button } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";

//Utils
import { firebaseApp } from "../utils/firebase";

//Componets
import Loading from "../components/Loading";

const db = firebaseApp.firestore()

export default function Favorites(props) {
  const { navigation } = props
  const [restaurants, setRestaurants] = useState(null)
  const [userLogged, setUserLogged] = useState(false)

  firebaseApp.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false)
  })

  useFocusEffect(
    useCallback(
      () => {
        if (userLogged) {
          const idUser = firebaseApp.auth().currentUser.uid
          db.collection("favorites")
            .where("idUser", "==", idUser)
            .get()
            .then((response) => {
              const idRestaurantArr = []
              response.forEach(doc => {
                idRestaurantArr.push(doc.data().idRestaurant)
              });
              getDataRestaurant(idRestaurantArr).then((response) => {
                const restaurants = []
                response.forEach(doc => {
                  const restaurant = doc.data()
                  restaurant.id = doc.id
                  restaurants.push(restaurant)
                })
                setRestaurants(restaurants)
              })
            })
        }
      },
      [userLogged],
    )
  )

  const getDataRestaurant = (idRestaurantArr) => {
    const RestaurantArr = []
    idRestaurantArr.forEach(idRestaurant => {
      const result = db.collection("restaurant").doc(idRestaurant).get()
      RestaurantArr.push(result)
    })


    if (!userLogged) {
      return <UserNoLogged navigation={navigation} />
    }

    if (!restaurants) {
      return <Loading isVisible={true} text="Cargando..." />
    } else if (restaurants?.length === 0) {
      return <NotFoundRestaurant />
    }

    return Promise.all(RestaurantArr)
  }



  return (
    <View style={StyleSheet.viewBody}>
      {
        restaurants ? (<Text>
          <FlatList
            data={restaurants}
            renderItem={(restaurant) => <Restaurant restaurant={restaurant} />}
            keyExtractor={(item, index) => index.toString()}
          />
        </Text>) : (
          <View style={styles.loaderRestaurant}>
            <ActivityIndicator size="large" />
            <Text style={{ textAlign: "center" }}>Cargando...</Text>
          </View>
        )
      }
    </View>
  );
}


function Restaurant(props) {
  const { restaurant } = props
  const { name } = restaurant.item
  return (
    <View>
      <Text>
        Hola
      </Text>
    </View>
  )
}

function NotFoundRestaurant() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon
        type="material-community"
        name="alert-outline"
        size={50}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        No tienes restaurantes en tu lista.
      </Text>
    </View>

  )
}


function UserNoLogged(props) {
  const { navigation } = props;

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon
        type="material-community"
        name="alert-outline"
        size={50}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Necesitas estar logeado para ver esta sección
      </Text>
      <Button
        title="Iniciar sesión"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#00a680" }}
        onPress={() => { navigation.navigate("account", { screen: "login" }) }}
      />
    </View>
  )

}


const style = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  }, loaderRestaurant: {
    marginTop: 10,
    marginBottom: 10
  }
})