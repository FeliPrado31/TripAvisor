import React, { useState, useEffect, useCallback } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Icon } from 'react-native-elements'
import { firebaseApp } from '../../utils/firebase'
import { useFocusEffect } from '@react-navigation/native'

// components
import ListRestaurants from '../../components/Restaurants/ListRestaurants'


export default function Restaurants(props) {

  const { navigation } = props

  const [user, setUser] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [totalRestaurants, setTotalRestaurants] = useState(0)
  const [startRestaurants, setStartRestaurants] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const limitRestaurants = 10;
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((userInfo) => setUser(userInfo))
  }, [])


  useFocusEffect(
    useCallback(
      () => {

        firebaseApp.firestore().collection("restaurants").get().then((snap) => {
          setTotalRestaurants(snap.size)
        })

        const resultRestaurants = []

        firebaseApp.firestore().collection("restaurants").orderBy("createAt", "desc").limit(limitRestaurants).get().then((res) => {
          setStartRestaurants(res.docs[res.docs.length - 1])
          res.forEach(doc => {
            const restaurant = doc.data()
            restaurant.id = doc.id
            resultRestaurants.push(restaurant)
          });
          setRestaurants(resultRestaurants)
        })
      },
      [],
    )
  )


  const handlerLoadMore = () => {
    const resultRestaurant = []

    restaurants.length < totalRestaurants && setIsLoading(true)

    firebaseApp.firestore().collection("restaurants").orderBy("createAt", "desc").startAfter(startRestaurants.data().createAt).limit(limitRestaurants).get().then(res => {
      if (res.docs.length > 0) {
        setStartRestaurants(res.docs[res.docs.length - 1])
      } else {
        setIsLoading(false)
      }

      res.forEach((doc) => {
        const restaurant = doc.data()
        restaurant.id = doc.id
        resultRestaurant.push(restaurant)
      })

      setRestaurants([...restaurants, ...resultRestaurant])
    })
  }


  return (
    <View style={style.viewBody}>
      <ListRestaurants restaurants={restaurants} handlerLoadMore={handlerLoadMore} isLoading={isLoading} />
      {
        user &&
        <Icon
          type="material-community"
          name="plus"
          color="#00a680"
          reverse
          containerStyle={style.btnContainer}
          onPress={() => navigation.navigate("add-restaurant")}
        />
      }
    </View>
  );
}


const style = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  }, btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    // shadowColor: "black",
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.5
  }
})