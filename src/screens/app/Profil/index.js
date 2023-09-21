import React, { useContext, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import  {styles} from "./styles";
import {Text, View } from "react-native";
import Header from "../../../components/Header";
import ListItem from "../../../components/ListItem";
import Button from "../../../components/Button";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProfileContext } from "../../../../App";
import { UserContext } from "../../../../App";

 const Profil = ({ navigation })=>{ 

  const { user, setUser } = useContext(UserContext);
      // Figyelem: Profil törlés:
      //AsyncStorage.removeItem('auth_token');


    const num = 5;

    const { profile, setProfile } = useContext(ProfileContext);

    //console.log('Profil:',profile)
   
    const getProfile = async () => {
        try {
          const userToken = await AsyncStorage.getItem('auth_token');
          const response = await axios.get('http://192.168.0.22/reactnativeAPI/authUser.php', {
            params: {
              auth: userToken
            }
          });
          //console.log(response.data);
      
          if (response.data && response.data.auth_token_fetch && response.data.auth_token_fetch.length > 0) {
            return response.data.auth_token_fetch[0]; // Az első objektumot adja vissza a válaszból
          }
          return null;
        } catch (e) {
          console.log('error :>> ', e);
          return null;
        }
      };

useEffect(() => {
  (async () => {
    const profile = await getProfile();   
    //console.log('Profil------>', profile)
     setProfile(profile);
  })()
}, []);

 
const onLogout = async () => {
  try {
    await AsyncStorage.removeItem('auth_token');
    setUser(null);
    navigation.navigate('Teszt');
  } catch (error) {
    console.log('Hiba a kijelentkezés során: ', error);
  }
}



    const onSettingsPress = () => {
        navigation.navigate('Beállítások');
    }
    const onNewListingPress = () => {
        navigation.navigate('CreateListing');
    }   
    const onMyListingPress = () => {
        navigation.navigate('MyListing');
    }   
    
    const goBack = () => {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex : 1}} >
            <Header title={'Profilom'} showLogout onLogout={onLogout}  onBackPress={goBack} />
            <View style={styles.container}>
                <View style={styles.content}>
                <Text style={styles.name}>{profile?.name}</Text>
                <Text style={styles.email}>{profile?.email}</Text>
                <ListItem onPress={onMyListingPress}  title={'Listáim'} subtitle={`${num} darab terméket listáztál` }/>
                <ListItem onPress={onSettingsPress}  title={'Beállítások'} subtitle='Fiók, FAQ, Kapcsolat'/>
                </View>
                <Button onPress={onNewListingPress} style={{ flex: 0}} title='Lista hozzáadás' />
            </View>
        </SafeAreaView>
    )
}

export default React.memo(Profil);