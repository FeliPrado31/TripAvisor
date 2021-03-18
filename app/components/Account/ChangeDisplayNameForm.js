import React, { useState } from 'react'

import * as firebase from 'firebase'

import { View, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function ChangeDisplayNameForm(props) {
    const { displayName, setShowModal, toastRef, setReloadUserInfo } = props

    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)


    const onSubmit = () => {
        setError(null)
        if (!newDisplayName) {
            setError("El nombre no puede estar vacio.")
        } else if (displayName === newDisplayName) {
            setError('El nombre no puede ser el igual al actual.')
        } else {
            setIsLoading(true)
            const update = {
                displayName: newDisplayName
            }
            firebase.auth().currentUser.updateProfile(update).then(() => {
                setIsLoading(false)
                setShowModal(false)
                setReloadUserInfo(true)
                console.log('Ok');
            }).catch((err) => {
                setIsLoading(false)
                setShowModal(false)
                toastRef.current.show('Error al actualizar el nombre.')
            })
        }
    }


    return (
        <View style={style.viewContainer}>
            <Input
                placeholder="Nombre y apellido"
                onChange={e => setNewDisplayName(e.nativeEvent.text)}
                containerStyle={style.input}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                defaultValue={displayName || ""}
                errorMessage={error}
            />
            <Button
                title="Cambiar nombre"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
        </View >
    )
}


const style = StyleSheet.create({
    viewContainer: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }, input: {
        marginBottom: 10
    }, btnContainer: {
        width: "95%"
    }, btn: {
        backgroundColor: "#00a680"
    }
})