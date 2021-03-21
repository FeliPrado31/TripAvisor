import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button, Input } from "react-native-elements";


function defaultValues() {
    return {
        password: "",
        repeatPassword: "",
        confirmPassword: "",
    }
}



export default function ChangePasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState(defaultValues())


    const updateFields = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

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
            />
            <Button
                title="Cambiar contraseña"
                containerStyle={style.btnContainer}
                buttonStyle={style.btn}
            // onPress={OnSubmit}
            // loading={isLoading}
            />
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
    },
    btn: {
        backgroundColor: "#00a680",
    },
});
