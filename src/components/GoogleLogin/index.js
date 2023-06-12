
// web client Id 607693431416-eokv9stm7mle8a899niquslu4ajsl0ft.apps.googleusercontent.com
// Android client: 607693431416-a903v3r4thveor4hsgf952aro0th3fj2.apps.googleusercontent.com

import React from "react";
import { TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const GoogleLogin = () => {
    return(
        <TouchableOpacity activeOpacity={0.6} style={styles.container} >
            <Image style={styles.image} source={require('../../assets/google.png')} />
        </TouchableOpacity>
    )
}

export default React.memo(GoogleLogin); 