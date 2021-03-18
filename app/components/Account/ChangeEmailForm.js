import React, { useState } from 'react'
import * as firebase from 'firebase'
import { View, Text, StyleSheet } from 'react-native'
import { Input, Button } from 'react-native-elements'

import { validateEmail } from '../../utils/validation'

import { reauthenticate } from '../../utils/api'

function defaultValues() {
    return {
        email: "",
        password: ""
    }
}


export default function ChangeEmailForm(props) {
    const { email, setShowModal, toastRef, setReloadUserInfo } = props
    const [formData, setFormData] = useState(defaultValues())
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const updateFields = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const OnSubmit = () => {
        setErrors({})
        if (!formData.email || email === formData.email) {
            setErrors({
                email: "El email no ha cambiado."
            })
        } else if (!validateEmail(formData.email)) {
            setErrors({
                email: "Email incorrecto."
            })
        } else if (!formData.password) {
            setErrors({
                password: "La contraseña no puede estar vacia"
            })
        } else {
            setIsLoading(true)
            reauthenticate(formData.password).then(res => {
                firebase.auth().currentUser.updateEmail(formData.email).then(() => {
                    setIsLoading(false)
                    setReloadUserInfo(true)
                    toastRef.current.show('Email actualizado')
                    setShowModal(false)
                }).catch(() => {
                    setIsLoading(false)
                    setErrors({
                        email: "Error al actualizar el email"
                    })
                })
                console.log(res);
            }).catch(err => {
                setIsLoading(false)
                setErrors({
                    password: "Contraseña incorrecta."
                })
            })
        }
    }



    return (
        <View style={style.view}>
            <Input
                placeholder="Correo Electronico"
                containerStyle={style.input}
                defaultValue={email}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
                onChange={(e) => updateFields(e, 'email')}
                errorMessage={errors.email}
            />
            <Input
                placeholder="Contraseña"
                containerStyle={style.input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword)
                }}
                errorMessage={errors.password}
                onChange={(e) => updateFields(e, 'password')}

            />
            <Button
                title="Cambiar email"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={OnSubmit}
                loading={isLoading}
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
    }, btnContainer: {
        marginTop: 20,
        width: "95%"
    }, btn: {
        backgroundColor: "#00a680"
    }
})