import React, { useState, useEffect } from 'react'
import MapView from 'react-native-maps'
import uuid from 'random-uuid-v4'


import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'


import { View, ScrollView, Alert, StyleSheet, Dimensions } from 'react-native'
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements'
import { map, size, filter } from 'lodash'

import Modal from '../Modal'

//firebase
import { firebaseApp } from '../../utils/firebase'
// import firebase from 'firebase/app'


const widthScreen = Dimensions.get("window").width

export default function AddRestaurantForm(props) {
    const { toastRef, setIsloading, navigation } = props

    const [restaurantName, setRestaurantName] = useState("")
    const [restaurantAddress, setRestaurantAddress] = useState("")
    const [restaurntDescription, setRestaurntDescription] = useState("")
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestaurant, setLocationRestaurant] = useState(null)

    const addResturant = () => {
        if (!restaurantName || !restaurantAddress || !restaurntDescription) {
            toastRef.current.show("Todos los campos del formulario son obligatorios")
        } else if (size(imagesSelected) === 0) {
            toastRef.current.show("El restaurante tiene que tener almenos una foto")
        } else if (!locationRestaurant) {
            toastRef.current.show("Tienes que localizar el restaurante en el mapa")
        } else {
            setIsloading(true)
            uploadImageStorage().then(res => {
                firebaseApp.firestore().collection("restaurants").add({
                    name: restaurantName,
                    address: restaurantAddress,
                    description: restaurntDescription,
                    location: locationRestaurant,
                    images: res,
                    rating: 0,
                    ratingTotal: 0,
                    quantityVoting: 0,
                    createAt: new Date(),
                    createBy: firebaseApp.auth().currentUser.uid
                }).then(() => {
                    setIsloading(false)
                    navigation.navigate("restaurants")

                }).catch(() => {
                    setIsloading(false)
                    toastRef.current.show("Error al crear el restaurante, intentalo más tarde.")
                })
            })
        }
    }

    /**
     * Function to upload images to firebase storage
     */
    const uploadImageStorage = async () => {
        const imageBlob = []

        await Promise.all(
            map(imagesSelected, async (image) => {
                const response = await fetch(image)
                const blob = await response.blob()
                const ref = firebaseApp.storage().ref("restaurants").child(uuid())
                await ref.put(blob).then(res => {
                    await firebaseApp.storage().ref(`restaurants/${res.metadata.name}`)
                        .getDownloadURL().then((photoUrl) => {
                            imageBlob.push(photoUrl)
                        })
                })
            })
        )


        return imageBlob
    }



    return (
        <ScrollView style={style.scrollView}>
            <ImageRestaurant imageRestaurant={imagesSelected[0]} />
            <FormAdd
                locationRestaurant={locationRestaurant}
                setRestaurantName={setRestaurantName}
                setRestaurantAddress={setRestaurantAddress}
                setRestaurntDescription={setRestaurntDescription}
                setIsVisibleMap={setIsVisibleMap}
            />
            <UploadImage toastRef={toastRef} setImagesSelected={setImagesSelected} imagesSelected={imagesSelected} />
            <Button title="Crear restaurante" onPress={addResturant} buttonStyle={style.btnAddRestaurant} />
            <Map isVisibleMap={isVisibleMap} setIsVisibleMap={setIsVisibleMap} setLocationRestaurant={setLocationRestaurant} toastRef={toastRef} />
        </ScrollView>
    )
}

function ImageRestaurant(props) {
    const { imageRestaurant } = props

    return (
        <View style={style.viewPhoto}>
            <Image source={imageRestaurant ? { uri: imageRestaurant } : require('../../../assets/img/no-image.png')} style={{ width: widthScreen, height: 200 }} />
        </View>
    )

}

function Map(props) {
    const { isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef } = props
    const [location, setLocation] = useState(null)

    useEffect(() => {
        (async () => {
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            )
            const statusPermissions = resultPermissions.permissions.location.status

            if (statusPermissions !== "granted") {
                toastRef.current.show("Tienes que aceptar los permisos para crear el restaurante.", 3000)
            } else {
                const loc = await Location.getCurrentPositionAsync({})
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001
                })
            }
        })()
    }, [])


    const confirmLocation = () => {
        setLocationRestaurant(location)
        toastRef.current.show('Localización guardad correctamente.')
        setIsVisibleMap(false)
    }

    return (
        <Modal visible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {location && (
                    <MapView
                        style={style.mapStyle}
                        initialRegion={location}
                        showsUserLocation={true}
                        onRegionChange={(region) => setLocation(region)}
                    >
                        <MapView.Marker
                            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                            draggable
                        />
                    </MapView>
                )}
                <View style={style.viewMapBtn}>
                    <Button title="Guardar ubicación" containerStyle={style.viewMapBtnContainerSave} buttonStyle={style.viewMapBtnSave} onPress={() => confirmLocation()} />
                    <Button title="Cancelar" containerStyle={style.viewMapBtnContainerCancel} buttonStyle={style.viewMapBtnCancel} onPress={() => setIsVisibleMap(false)} />
                </View>
            </View>
        </Modal>
    )

}

function FormAdd(props) {
    const { setRestaurantName, setRestaurantAddress, setRestaurntDescription, setIsVisibleMap, locationRestaurant } = props
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
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRestaurant ? "#00a680" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}

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
            {size(imagesSelected) < 5 && (
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
    }, mapStyle: {
        width: "100%",
        height: 550,
    }, viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    }, viewMapBtnContainerCancel: {
        paddingLeft: 5
    }, viewMapBtnCancel: {
        backgroundColor: "#a60d0d"
    }, viewMapBtnContainerSave: {
        paddingRight: 5
    }, viewMapBtnSave: {
        backgroundColor: "#00a680"
    }
})