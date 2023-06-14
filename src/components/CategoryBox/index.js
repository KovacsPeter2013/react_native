import React, { useState } from "react";
import { Pressable, Text, View,Image } from "react-native";
import {styles} from './styles'
import { colors } from "../../utils/colors";


const CategoryBox = ({ title, image, onPress, isFirst, isSelected }) => {


    return(
        <Pressable 
        onPress={onPress} 
        // Figyelem. Feltétel megadás style-ban...
        style={[styles.container, isFirst ? {marginLeft: 24 } : {}]}
        
        >
          {/*   Figyelem. Stílus megjelenés manipulálása, props(isSelected) alapján, feltétel vizsgálattal */}
            <View style={[styles.imageContainer, isSelected ? { backgroundColor: colors.dark} : {}]}>
                <Image style={styles.image} source={{ uri: image}}/>
            </View>
            <Text style={[styles.title, isSelected ? { color:colors.blue, fontWeight:'500'} : {} ]}>{title}</Text>
        </Pressable>

    )
     
}

export default React.memo(CategoryBox);