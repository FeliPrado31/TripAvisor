import React, { useState, useEffect, useCallback } from "react";
import { Rating, Icon } from "react-native-elements";
import { StyleSheet, ScrollView, Dimensions, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

//utils
import { firebaseApp } from "../../utils/firebase";

//componets
import Carousel from "../../components/Carousel";
import Loading from "../../components/Loading";

import ListReviews from "../../components/Restaurants/ListReviews";

const screenWidth = Dimensions.get("window").width;

export default function Restaurant(props) {
  const { navigation, route } = props;
  const { id, name } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [raintg, setRating] = useState(0);
  let db = firebaseApp.firestore();

  navigation.setOptions({
    title: name,
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("restaurants")
        .doc(id)
        .get()
        .then((res) => {
          const data = res.data();
          data.id = res.id;
          setRestaurant(data);
          setRating(data.rating);
        });
    }, [])
  );

  if (!restaurant) return <Loading isVisible={true} text="Cargando..." />;

  return (
    <ScrollView vertical style={styles.viewBody}>
      <View style={styles.viewFavorites}>
        <Icon
          type="material-community"
          name="heart"
          onPress={() => {}}
          color="#00a68"
          size={35}
          underlayColor="transparent"
        />
      </View>
      <Carousel
        arrayImages={restaurant.images}
        height={250}
        width={screenWidth}
      />
      <TitleRestaurant
        name={restaurant.name}
        description={restaurant.description}
        rating={restaurant.rating}
      />
      <ListReviews navigation={navigation} idRestaurant={restaurant.id} />
    </ScrollView>
  );
}

function TitleRestaurant(props) {
  const { name, description, rating } = props;

  return (
    <View style={styles.viewRestaurantTitle}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}>{name}</Text>
        <Rating
          style={styles.rating}
          readonly
          imageSize={20}
          startingValue={parseFloat(rating)}
        />
      </View>
      <Text style={styles.descriptionRestaurant}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  viewRestaurantTitle: {
    padding: 15,
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descriptionRestaurant: {
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  viewFavorites: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15,
  },
});
