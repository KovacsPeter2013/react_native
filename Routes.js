import React, { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View,Image, ScrollView } from 'react-native';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';
import Signin from './src/screens/auth/Signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/utils/colors';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/app/Home';
import Favorite from './src/screens/app/Favorite';
import Profil from './src/screens/app/Profil';
import ProductDetails from './src/screens/app/ProductDetails';
import Settings from './src/screens/app/Settings';
import CreateListing from './src/screens/app/CreateListing';
import MyListing from './src/screens/app/MyListing';
import { UserContext } from './App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();




const ProfileStack = () => {

  return(
    <Stack.Navigator>
        <Stack.Screen name="Profil"  component={Profil} options={{ headerShown: false }} />
        <Stack.Screen name="Beállítások" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="CreateListing" component={CreateListing} options={{ headerShown: false }} />
        <Stack.Screen name="MyListing" component={MyListing} options={{ headerShown: false }} />
    </Stack.Navigator>
     
  )
}

function MyTabs() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let icon;

        if (route.name === 'Kezdőlap') {
          icon = focused
            ? require('./src/assets/tabs/home_active.png')
            : require('./src/assets/tabs/home.png')
        } else if (route.name === 'ProfileStack') {
          icon = focused 
          ? require('./src/assets/tabs/profile_active.png')
           : require('./src/assets/tabs/profile.png')
        }else if (route.name === 'Kedvencek') {
          icon = focused 
          ? require('./src/assets/tabs/bookmark_active.png')
           : require('./src/assets/tabs/bookmark.png')
        }

    
      return <Image source={icon} style={{ width: 24, height: 24}}/>;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      tabBarShowLabel: false,
      tabBarStyle: {
        borderTopColor : colors.lightGrey,
        backgroundColor: "white"
      
      }
    })}
    
    >
      <Tab.Screen name="Kezdőlap"  component={Home} options={{ headerShown: false}}/>
      <Tab.Screen name="Kedvencek" component={Favorite} options={{ headerShown: false}} />
      <Tab.Screen name="ProfileStack" component={ProfileStack}  options={{ headerShown: false}}/> 
      
    </Tab.Navigator>
  );
}


// Figyelem. A Routes dönti el, hogy a user autentikálva van e vagy sem....
const Routes = (userToken)=> {


  //const isSignedIn = false;
  const { user, setUser } = useContext(UserContext);
  //console.log('Routes:', user);

  useEffect(() => {
    // Figyelem.  Iylen egy önmeghívó funkció:
 // Ez itt arra való, hogy ha a user bezárja és újra megnyitja az appot, akkor ne kelljen újbol bejelentkeznie
    (async() => {
      //const userToken = await AsyncStorage.removeItem('auth_token');
      const userToken = await AsyncStorage.getItem('auth_token');
      console.log('Routes-->>>', userToken);
      setUser({ userToken })
    })()
    
  }, []);



  const addTokenToAxios = (token) => {
    axios.defaults.headers.Authorization = token;
  }


  // Figyelem. Ez az addTokenToAxios() küldi el a tokent az API auth útvonalára, hogy a kapott választ a Profil oldalon 
  // lehessen fel
  useEffect(() => {
    if(user?.userToken){
      addTokenToAxios(user?.userToken)
      console.log('addTokenToAxios-->>>', user?.userToken);
    }
  }, [user]);


  // A navigationcontainer install után felülírja itt ott a megjelenés színeit, ezért
  // kell ez a theme const, hogy manipulálni lehessen a navigationcontainer style-t 
  const theme = {
    colors: { 
      background: colors.white
    }
  }

  return (
  <NavigationContainer theme={theme}>
    <Stack.Navigator>
{/*       Figyelem. Itt döntődik el, hogy van e token lementeve az AsyncStorage-ban, ha van akkor az app bezárása és újranyitása után már nem kéri az újboli bejelentkezést */} 
      {user?.userToken ? (
        <>
          <Stack.Screen name="Tabs" component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Teszt" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Bejelentkezés" component={Signin} options={{ headerShown: false }} />
          <Stack.Screen name="Regisztráció" component={Signup} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>

 );
}
export default React.memo(Routes);
