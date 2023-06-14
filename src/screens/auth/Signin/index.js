import React, { useLayoutEffect, useState } from "react";
import { ScrollView, Text } from "react-native";
import AuthHeader from "../../../components/AuthHeader";
import { styles } from "./styles";
import Input from "../../../components/Input";

import Button from "../../../components/Button";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
const Signin = () => {

  

    const onSignUp = () => {
        navigation.navigate('Regisztráció')
    }


    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
          //headerTitle:"Teszt"
          headerShown: false,
        });
      }, []);

     /*       const onSignIn = () => {
        navigation.navigate('Bejelentkezés')
      } */


      const onBack = ()=>{
        navigation.goBack();
      }




     return(

      <SafeAreaView>
      <ScrollView style={styles.container}>   
        <AuthHeader onBackPress={onBack} title='Belépés' />        
        <Input label='Email cím' placeholder="Email cím..." />
        <Input isPassword label='Jelszó' placeholder="*********" />     
      <Button title={'Belépés'} style={styles.button}/>
      <Separator text={'vagy jelentkezz be'} />
      <GoogleLogin />
        <Text style={styles.footerText}>Nincs még fiókod?
            <Text style={styles.footerLink} onPress={onSignUp}> Regisztrálj</Text>
        </Text>      
      </ScrollView>
      </SafeAreaView>
          )
    
}

export default React.memo(Signin);