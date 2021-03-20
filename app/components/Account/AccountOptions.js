import React, { useState } from 'react'

import { View, Text, StyleSheet } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'

import Modal from '../Modal'
import ChangeDisplayNameForm from '../Account/ChangeDisplayNameForm'
import ChangeEmailForm from '../Account/ChangeEmailForm'
import ChangePasswordForm from '../Account/ChangePasswordForm'




export default function AccountOptions(props) {
    const { userInfo, toastRef, setReloadUserInfo } = props

    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)


    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm displayName={userInfo.displayName} setShowModal={setShowModal} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo} />
                )
                setShowModal(true)
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm email={userInfo.email} setShowModal={setShowModal} toastRef={toastRef} setReloadUserInfo={setReloadUserInfo} />
                )
                setShowModal(true)
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm setShowModal={setShowModal} toastRef={toastRef} />
                )
                setShowModal(true)
                break;

            default:
                setRenderComponent(null)
                break;
        }
    }

    const menuOptions = generateOptions(selectedComponent)

    return (
        <View style={style.viewContainer}>
            {map(menuOptions, (item, index) => (
                <ListItem
                    key={index}
                    containerStyle={style.menuItem}
                    onPress={item.onPress}
                >
                    <ListItem.Content>
                        <Icon type={item.iconType} name={item.iconNameLeft} color={item.iconColorLeft} />
                        <ListItem.Title>{item.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))}
            <Modal visible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
            </Modal>
        </View>
    )
}

function generateOptions(selectedComponent) {
    return [
        {
            title: "Cambiar nombre",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            onPress: () => selectedComponent("displayName")
        }, {
            title: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            onPress: () => selectedComponent("email")
        }, {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            onPress: () => selectedComponent("password")
        }
    ]
}


const style = StyleSheet.create({
    viewContainer: {

    },
    menuItem: {
        // flex: 1,
        // alignItems: "center",
        // justifyContent: "center",
        // alignItems: "center",
        // justifyContent: "center",
        // flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#e3e3e3"
    }
})


