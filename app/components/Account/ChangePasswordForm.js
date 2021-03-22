import React, { useState } from "react";
import * as firebase from 'firebase'
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";
import { size } from 'lodash'

import { reauthenticate } from '../../utils/api'


function defaultValues() {
    return {
        password: "",
        repeatPassword: "",
        confirmPassword: "",
    }
}



export default function ChangePasswordForm(props) {
    let isSetErrors = true
    const { setShowModal, toastRef } = props
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValues())
    const [errors, setErrors] = useState({})
    const [isLoading, setLoading] = useState(false)

    const onSubmit = async () => {
        let tmpErrors = {};

        setErrors({})

        if (!formData.password || !formData.repeatPassword || !formData.confirmPassword) {
            tmpErrors = {
                password: "La contraseña no puede estar vacia",
                newPassword: "La contraseña no puede estar vacia",
                repeatPassword: "La contraseña no puede estar vacia",
            }
        } else if (formData.repeatPassword !== formData.confirmPassword) {
            tmpErrors = {
                newPassword: "Las contraseñas no son iguales",
                repeatPassword: "Las contraseñas no son iguales"
            }
        } else if (size(formData.repeatPassword) < 6) {
            tmpErrors = {
                newPassword: "La contraseña tiene que ser mayor a 6 caracteres.",
                repeatPassword: "La contraseña tiene que ser mayor a 6 caracteres.",
            }
        } else {
            setLoading(true)
            await reauthenticate(formData.password).then(async () => {
                await firebase.auth().currentUser.updatePassword(formData.repeatPassword).then(() => {
                    isSetErrors = false
                    setLoading(false)
                    setShowModal(false)
                    firebase.auth().signOut()
                }).catch(() => {
                    tmpErrors = {
                        other: "Error la actualizar la contraseña."
                    }
                    setLoading(false)
                })
            }).catch(() => {
                setLoading(false)
                tmpErrors = {
                    password: "La contraseña no es correcta."
                }
            })
        }

        isSetErrors && setErrors(tmpErrors)
    }

    const updateFields = (e, type) => setFormData({ ...formData, [type]: e.nativeEvent.text })

    return (
        <View style={style.view}>
            <Input
                placeholder="Contraseña actual"
                containerStyle={style.Input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}
                onChange={e => updateFields(e, "password")}
                errorMessage={errors.password}
            />
            <Input
                placeholder="Nueva contraseña"
                containerStyle={style.Input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}
                onChange={e => updateFields(e, "repeatPassword")}
                errorMessage={errors.newPassword}
            />
            <Input
                placeholder="Repetir contraseña"
                containerStyle={style.Input}
                password={true}
                secureTextEntry={showPassword ? false : true}
                rightIcon={{
                    type: "material-community",
                    name: showPassword ? "eye-off-outline" : "eye-outline",
                    color: "#c2c2c2",
                    onPress: () => setShowPassword(!showPassword),
                }}
                onChange={e => updateFields(e, "confirmPassword")}
                errorMessage={errors.repeatPassword}
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
                onPress={onSubmit}
                loading={isLoading}
            />
            <Text>{errors.other}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
    },
    input: {
        marginBottom: 10,

    }, btnContainer: {
        marginTop: 20,
        width: "95%"
    }, btn: {
        backgroundColor: "#00a680",
    },
});
