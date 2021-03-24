import React, { useState } from 'react'
import { View, ScrollView, Alert, StyleSheet, Dimensions } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'

export default function AddRestaurantForm(props) {
    const { toastRef, setIsloading, navigation } = props

    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurntDescription, setRestaurntDescription] = useState("")

    const addResturant = () => {

    }


    return (
        <ScrollView style={style.scrollView}>
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurntDescription={setRestaurntDescription}
            />
            <UploadImage />
            <Button title="Crear restaurante" onPress={addResturant} buttonStyle={style.btnAddRestaurant} />
        </ScrollView>
    )
}

function FormAdd(props) {
    const { setRestaurantName, setRestaurantAddress, setRestaurntDescription } = props
    return (
        <View style={style.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
                containerStyle={style.input}
                onChange={(e) => setRestaurantName(e.nativeEvent.text)}
            />
            <Input
                placeholder="Dirección"
                containerStyle={style.input}
                onChange={(e) => setRestaurantAddress(e.nativeEvent.text)}

            />
            <Input
                placeholder="Descripción del restaurante"
                multiline={true}
                containerStyle={style.textArea}
                onChange={(e) => setRestaurntDescription(e.nativeEvent.text)}

            />
        </View>
    )
}

function UploadImage(props) {
    const imageSelect = () => {

    }


    return (
        <View style={style.viewImage}>
            <Icon
                type="material-community"
                name="camera"
                color="#7a7a7a"
                containerStyle={style.containerIcon}
                onPress={imageSelect}
            />
        </View>
    )

}

const style = StyleSheet.create({
    scrollView: {
        height: "100%"
    }, viewForm: {
        marginLeft: 10,
        marginRight: 10
    }, input: {
        marginBottom: 10,
    }, textArea: {
        height: 100,
        width: "100%",
        padding: 0,
        margin: 0
    }, btnAddRestaurant: {
        backgroundColor: "#00a680",
        margin: 20
    }, viewImage: {
        flexDirection: "row",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30
    }, containerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    }
})