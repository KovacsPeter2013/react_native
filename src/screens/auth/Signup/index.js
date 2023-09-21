import React, { useContext, useLayoutEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import AuthHeader from "../../../components/AuthHeader";
import { styles } from "./styles";
import Input from "../../../components/Input";
import CheckBox from "../../../components/Checkbox";
import Button from "../../../components/Button";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import request from "../../../utils/request";
import axios from "axios";
import { UserContext } from "../../../../App";
import Routes from "../../../../Routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Signup = () => {

    const [checked, setChecked] = useState(null);
    const [values, setValues]   = useState({});
    const {user, setUser} = useContext(UserContext);


    
    const onSignIn = () => {
        navigation.navigate('Bejelentkezés')
    }
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({         
          headerShown: false,
        });
      }, []);


      const onBack = ()=>{
        navigation.goBack();
      }


      // Komment. Amikor meghívjuk ezt a "onChange" függvényt, akkor a kódrészletben található "setValues" 
      //függvényt hívja meg egy új objektummal. Az új objektum az eredeti "v" objektumot másolja, 
      //majd a "key" nevű tulajdonságot beállítja az átadott "value" értékre.

      //Azaz az "onChange" függvény meghívásakor az állapotban található "values" objektum egy másolatát hozza létre,
       //majd a "key" nevű tulajdonság értékét frissíti az átadott "value" értékre. 
       //Ezáltal a függvény lehetővé teszi a komponensben található értékek dinamikus frissítését 
       //az "onChange" esemény bekövetkeztekor.

      const onChange = (key, value) => {
        setValues(v => ({...v, [key]: value}))
      }

      const onSubmit = async () => {
        try {
          if (!values?.fullName || !values?.email || !values?.password || !values?.confirmpassword) {
            Alert.alert('Az összes mező kitöltése kötelező!');
            return;
          }
          if (values?.password !== values?.confirmpassword) { 
            Alert.alert('A jelszavak nem egyeznek!');
            return;
          }
          if(!checked){
            Alert.alert('Felhasználási feltételek elfogadása kötelező!');
            return;

          }
      
          const response = await axios.post('http://192.168.0.22/reactnativeAPI/index.php', {
            method: 'post',          
            data: values,
          });
      
          const userToken = response.data.token_fetch?.[0]?.token;
          //console.log("userToken:", userToken);
          
          if (typeof userToken !== 'undefined') {

            await AsyncStorage.setItem('auth_token', userToken);
            
            setUser({ userToken });
          
           // console.log('Van token');
          } else {
            //console.log('Nincs token');
          }
        } catch (error) {
          console.log('Hiba', error);
        }
      };
      
      
      


     return(

        <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        <AuthHeader onBackPress={onBack} title='Regisztráció' />
        {/*Komment.
        onChangeText: Ez a tulajdonság egy függvényt vár, amely meghívódik, amikor a felhasználó
        megváltoztatja a beviteli mező értékét. Az arrow function (v) => onChange('name', v) hozzá van rendelve ehhez a tulajdonsághoz.
        Amikor a beviteli mező értéke megváltozik, a függvény meghívja az onChange függvényt
         a 'name' kulcs és az új érték (v) átadásával. */}
        <Input value={values.fullName} onChangeText={(v) => onChange('fullName', v)} label='Felhasználó név' placeholder="Felhasználó név" />
        <Input value={values.email} onChangeText={(v) => onChange('email', v)} label='Email cím' placeholder="Email cím..." />
        <Input value={values.password} onChangeText={(v) => onChange('password', v)} isPassword label='Jelszó' placeholder="*********" />
        <Input value={values.confirmpassword} onChangeText={(v) => onChange('confirmpassword', v)} isPassword label='Jelszó megerősítése' placeholder="*********" />

        <View style={styles.agreeRow}>
            <CheckBox checked={checked}  onCheck={setChecked}/>
            <Text style={styles.agreeText}>Egyetértek a <Text style={styles.agreeTextBold}>felhasználási feltételekkel</Text></Text>
        </View>
      <Button onPress={onSubmit} title={'Regisztráció'} style={styles.button}/>
      <Separator text={'vagy jelentkezz be'} />
      <GoogleLogin />
        <Text style={styles.footerText}>Van már fiókod?
            <Text style={styles.footerLink} onPress={onSignIn}>Jelentkezz be</Text>
        </Text>
        

      </View>
      </ScrollView>
      </SafeAreaView>
          )
    
}

export default Signup;