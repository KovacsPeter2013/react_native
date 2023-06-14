import React, { useLayoutEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AuthHeader from "../../../components/AuthHeader";
import { styles } from "./styles";
import Input from "../../../components/Input";
import CheckBox from "../../../components/Checkbox";
import Button from "../../../components/Button";
import Separator from "../../../components/Separator";
import GoogleLogin from "../../../components/GoogleLogin";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {

    const [checked, setChecked] = useState(null);

  
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

     return(

        <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
        <AuthHeader onBackPress={onBack} title='Regisztráció' />
        <Input label='Felhasználó név' placeholder="Felhasználó név" />
        <Input label='Email cím' placeholder="Email cím..." />
        <Input isPassword label='Jelszó' placeholder="*********" />

        <View style={styles.agreeRow}>
            <CheckBox checked={checked}  onCheck={setChecked}/>
            <Text style={styles.agreeText}>Egyetértek a <Text style={styles.agreeTextBold}>felhasználási feltételekkel</Text></Text>
        </View>
      <Button title={'Regisztráció'} style={styles.button}/>
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