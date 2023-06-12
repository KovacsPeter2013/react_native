import React from "react";
import { Text,Image, View, Pressable } from "react-native";
import { styles } from "./styles";
import Button from "../../../components/Button";

const Splash = () => {


     return(
     <View style={styles.container}>
     <Image resizeMode="contain"  style={styles.image} source={require('../../../assets/kep.png')} />

     <View style={styles.titleContainer}>
      <Text style={styles.title}>Itt mindent</Text>
      <Text style={[styles.title, styles.innerTitle]}>Megtalálsz </Text>
      <Text style={styles.title}>amire szükséged van!</Text>
      </View>
      <Button  title="Regisztráció"/>

      <Pressable hitSlop={20} >
          <Text style={styles.footerText}>Bejelentkezés</Text>
      </Pressable>
      </View>
     
          )
    
}

export default Splash;