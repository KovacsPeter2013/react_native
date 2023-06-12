import React, { useState } from "react"
import { TextInput, View,Text, Pressable,Image } from "react-native"
import { styles } from "./styles"




const Input = ( { label, placeholder, isPassword } ) =>{

    // Jelszó mező 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onEyepress = ()=>{
        setIsPasswordVisible(!isPasswordVisible);
    }


    return(

        <View style={styles.container}>
            <Text style={styles.label}>{ label }</Text>
            <View style={styles.inputContaier}>
              <TextInput secureTextEntry={isPassword && !isPasswordVisible} placeholder={placeholder} style={styles.input}/>
           
              {isPassword ? ( // Ha ez a feltétel vizsgálat nincs, akkor az összes mezőben megjelenik a jelszó szem
              <Pressable onPress={onEyepress}>
                    <Image 
                    style={styles.eye} 
                    source={isPasswordVisible ? require('../../assets/eye.png') :require('../../assets/eye_close.png')  }/>
              </Pressable>
              ) : null}
            </View>
        </View>
    )
}

export default Input;