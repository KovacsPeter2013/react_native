import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import AuthHeader from "../../../components/AuthHeader";
import { styles } from "./styles";
import Input from "../../../components/Input";

import Button from "../../../components/Button";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";

const Signin = () => {

  

    const onSignup = () => {
        //console.log("Login")
    }



     return(
      <ScrollView style={styles.container}>
   
        <AuthHeader title='Belépés' />
        
        <Input label='Email cím' placeholder="Email cím..." />
        <Input isPassword label='Jelszó' placeholder="*********" />

     
      <Button title={'Belépés'} style={styles.button}/>
      <Separator text={'vagy jelentkezz be'} />
      <GoogleLogin />

        <Text style={styles.footerText}>Nincs még fiókod?

            <Text style={styles.footerLink} onPress={onSignup}> Regisztrálj</Text>
        </Text>

      
      </ScrollView>
          )
    
}

export default React.memo(Signin);