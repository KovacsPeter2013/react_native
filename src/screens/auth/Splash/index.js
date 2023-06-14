import React, { useLayoutEffect } from "react";
import { Text,Image, View, Pressable } from "react-native";
import { styles } from "./styles";
import Button from "../../../components/Button";
import { useNavigation } from "@react-navigation/native";





const Splash = () => {


    
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          //headerTitle:"Teszt"
          headerShown: false,
        });
      }, []);


      const onSignUp = () => {  
        navigation.navigate('Regisztráció')
      }

      const onSignIn = () => {  
        navigation.navigate('Bejelentkezés')
      }

     return(
     <View style={styles.container}>
     <Image resizeMode="contain"  style={styles.image} source={require('../../../assets/kep.png')} />

     <View style={styles.titleContainer}>
        <Text style={styles.title}>Itt mindent</Text>
        <Text style={[styles.title, styles.innerTitle]}>Megtalálsz </Text>
        <Text style={styles.title}>amire szükséged van!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={onSignUp}  title="Regisztráció"/>
      </View>

      <Pressable hitSlop={20} onPress={onSignIn}>
          <Text style={styles.footerText}>Bejelentkezés</Text>
      </Pressable>
      </View>
     
          )
    
}

export default Splash;