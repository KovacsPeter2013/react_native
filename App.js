import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View,Image, ScrollView } from 'react-native';
import Splash from './src/screens/auth/Splash';
import Signup from './src/screens/auth/Signup';
import Signin from './src/screens/auth/Signin';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './src/utils/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/screens/app/Home';
import Favorite from './src/screens/app/Favorite';
import Profil from './src/screens/app/Profil';
import ProductDetails from './src/screens/app/ProductDetails';
import Settings from './src/screens/app/Settings';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



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
        } else if (route.name === 'Profil') {
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
      <Tab.Screen name="Kezdőlap" component={Home} options={{ headerShown: false}}/>
      <Tab.Screen name="Kedvencek" component={Favorite} options={{ headerShown: false}} />
      <Tab.Screen name="Profil" component={Profil}  options={{ headerShown: false}}/>
      {/* <Tab.Screen name="Beállítások" component={Settings}  options={{ headerShown: false}}/> */}
      
    </Tab.Navigator>
  );
}


const App = ()=> {

  const isSignedIn = true;
  // A navigationcontainer install után felülírja itt ott a megjelenés színeit, ezért
  // kell ez a theme const, hogy manipulálni lehessen a navigationcontainer style-t 
  const theme = {
    colors: {
      background: colors.white
    }
  }
  /*
  return (
    <SafeAreaProvider>
      {isSignedIn ? (
             <NavigationContainer>
             <MyTabs />
             <Stack.Screen name="ProductDetails" component={ProductDetails} />
           </NavigationContainer>
      ) : (
        <NavigationContainer theme={theme}>
          <Stack.Navigator>
            <Stack.Screen name="Teszt" component={Splash} />
            <Stack.Screen name="Bejelentkezés" component={Signin} />
            <Stack.Screen name="Regisztráció" component={Signup} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </SafeAreaProvider>
  );
*/


  return (
  <SafeAreaProvider>
  <NavigationContainer theme={theme}>
    <Stack.Navigator>
      {isSignedIn ? (
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
</SafeAreaProvider>

 );



}


export default App;
