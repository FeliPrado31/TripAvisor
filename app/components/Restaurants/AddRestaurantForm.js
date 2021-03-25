import React, { useState } from 'react'

import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

import { View, ScrollView, Alert, StyleSheet, Dimensions } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import { map, size, filter } from 'lodash'

const widthScreen = Dimensions.get("window").width

export default function AddRestaurantForm(props) {
    const { toastRef, setIsloading, navigation } = props

    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurntDescription, setRestaurntDescription] = useState("")
    const [imagesSelected, setImagesSelected] = useState([])

    const addResturant = () => {

    }


    return (
        <ScrollView style={style.scrollView}>
            <ImageRestaurant imageRestaurant={imagesSelected[0]} />
            <FormAdd
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurntDescription={setRestaurntDescription}
            />
            <UploadImage toastRef={toastRef} setImagesSelected={setImagesSelected} imagesSelected={imagesSelected} />
            <Button title="Crear restaurante" onPress={addResturant} buttonStyle={style.btnAddRestaurant} />
        </ScrollView>
    )
}

function ImageRestaurant(props) {
    const { imagenRestaurant } = props

    return (
        <View style={style.viewPhoto}>
            <Image source={imageRestaurant ? { uri: imageRestaurant } : require('../../../assets/img/no-image.png')} style={{ width: widthScreen, height: 200 }} />
        </View>
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
    const { toastRef, setImagesSelected, imagesSelected } = props

    const imageSelect = async () => {
        const resultPermissions = await Permissions.askAsync(
            Permissions.CAMERA
        )

        if (resultPermissions === "denied") {
            toastRef.current.show("Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir ha ajustes y activarlos manualmente.", 5000)
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })

            if (result.cancelled) {
                toastRef.current.show("Has cerrado la galeria sin seleccionar ninguna imagen.", 3000)
            } else {
                setImagesSelected([...imagesSelected, result.uri])
            }
        }


    }

    const removeImage = (image) => {
        Alert.alert(
            "Eliminar imagen",
            "Quieres eliminar esta imagen?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        setImagesSelected(filter(imagesSelected, (imageUrl) => imageUrl !== image))
                    }

                }
            ],
            { cancelable: false }
        )

    }



    return (
        <View style={style.viewImage}>
            {size(imageSelect) < 5 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={style.containerIcon}
                    onPress={imageSelect}
                />
            )}

            {map(imagesSelected, (imageRestaurant, index) => (
                <Avatar
                    key={index}
                    style={style.miniatureStyle}
                    source={{ uri: imageRestaurant }}
                    onPress={() => removeImage(imageRestaurant)}
                />
            ))}
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
    }, miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    }, viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    }
})