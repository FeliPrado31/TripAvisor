import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, Input } from 'react-native-elements'

export default function ChangePasswordForm() {
    return (
        <View style={style.view}>
            <Input placeholder="Contraseña actual" containerStyle={style.Input} password={true} secureTextEntry={true} rightIcon={{
                type: "material-community",
                name: "eye-outline",
                color: "#c2c22"
            }} />
            <Input placeholder="Nueva contraseña" containerStyle={style.Input} password={true} secureTextEntry={true} rightIcon={{
                type: "material-community",
                name: "eye-outline",
                color: "#c2c22"
            }} />
            <Input placeholder="Repetir contraseña" containerStyle={style.Input} password={true} secureTextEntry={true} rightIcon={{
                type: "material-community",
                name: "eye-outline",
                color: "#c2c22"
            }} />
            <Button
                title="Cambiar contraseña"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
            // onPress={OnSubmit}
            // loading={isLoading}
            />
        </View>
    )
}

const style = StyleSheet.create({
    view: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    }, input: {
        marginBottom: 10
    }, btn: {
        backgroundColor: "#00a680"
    }
})
