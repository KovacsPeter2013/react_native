import React, { useContext, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import AuthHeader from "../../../components/AuthHeader";
import { styles } from "./styles";
import Input from "../../../components/Input";

import Button from "../../../components/Button";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../../../../App";



const Signin = () => {

  const [values, setValues]   = useState({});

  const {setUser} = useContext(UserContext);

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

      const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
      }

      const onSubmit = async() => {
        
         try{        
             const response = await axios.post('http://192.168.0.22/reactnativeAPI/userLogin.php', {
                 method: 'post',          
                 data: values,
               });
               const userEmail = response.data.user_fetch?.[0]?.email;
               const userToken = response.data.user_fetch?.[0]?.token;        
               //console.log(response)
               
          

               if (typeof userEmail === 'undefined') {
                 Alert.alert('Helytelen bejelentkezési adatok!');
                }else{
                  
                  await AsyncStorage.setItem('auth_token', response.data.user_fetch?.[0]?.token);
               }
               
               // Figyelem. A userToken beadás csak így fog működni {}-jelek között
               setUser({userToken}) 
               
               console.log("userEmail:", userEmail);             
               console.log("userToken:", userToken);             
         
             }catch (e) {
                 console.log(e);
             }              
       
      }

     return(

      <SafeAreaView>
      <ScrollView style={styles.container}>   
        <AuthHeader onBackPress={onBack} title='Belépés' />        
        <Input value={values.email} onChangeText={(v) => onChange('email', v)} label='Email cím' placeholder="Email cím..." />
        <Input value={values.password} onChangeText={(v) => onChange('password', v)} isPassword label='Jelszó' placeholder="*********" />     
      <Button onPress={onSubmit} title={'Belépés'} style={styles.button}/>
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