import React from "react";
import {TouchableOpacity, View, Image } from "react-native";
import styles from './styles';


// Figyelem. Így kívülről is be lehet adni az onPress-t
const CheckBox = ({ checked, onCheck }) => {

    
   
    return(
    <TouchableOpacity activeOpacity={0.6} onPress={() => onCheck(!checked)} style={styles.container}>
       {checked ? (
    <View style={styles.innerContainer}>
        <Image style={styles.checkIcon} source={require('../../assets/checkbox.png')} />
    </View>
       ) : null}
    </TouchableOpacity>
    )
    
}

export default React.memo(CheckBox);