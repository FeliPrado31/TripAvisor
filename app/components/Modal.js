import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Modal(props) {
    const { visible, setIsVisible, children } = props

    const closeModal = () => {
        setIsVisible(false)
    }

    return (
        <Overlay isVisible={visible} overlayStyle={style.overlay} onBackdropPress={closeModal}>
            {children}
        </Overlay>
    )
}


const style = StyleSheet.create({
    overlay: {
        height: "auto",
        width: "90%"
    }
})