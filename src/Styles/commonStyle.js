import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { spacing } from './spacing'

const  commonStyle = StyleSheet.create({
    flexRow:{
        flexDirection:"row",
        alignItems:"center",
    },
    justifyALignCenter: {
        justifyContent: "center",
        alignItems: "center",
    },
})
export const APP_PADDING_HORIZONTAL  = spacing.PADDING_16

export default commonStyle