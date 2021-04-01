import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'

//utils
import { firebaseApp } from '../../utils/firebase'

//componets
import Carousel from '../../components/Carousel'
import Loading from '../../components/Loading'

const screenWidth = Dimensions.get("window").width


export default function Restaurant(props) {
    const { navigation, route } = props
    const { id, name } = route.params
    const [restaurant, setRestaurant] = useState(null)
    let db = firebaseApp.firestore()



    navigation.setOptions({
        title: name
    });

    useEffect(() => {
        db.collection("restaurants").doc(id).get().then((res) => {
            const data = res.data()
            data.id = res.id
            setRestaurant(data)
        })
    }, [])


    if (!restaurant) return <Loading isVisible={true} text="Cargando información..." />

    return (
        <ScrollView vertical style={styles.viewBody}>
            <Carousel arrayImages={restaurant.images} height={250} width={screenWidth} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    }
})
