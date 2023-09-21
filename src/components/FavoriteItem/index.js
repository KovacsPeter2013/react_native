import React, { useState } from "react";
import { Pressable, Text, View, Image } from "react-native";
import { styles } from "./styles";

const FavoriteItem = ({ title, price, image, onPress, icon, onIconPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image style={styles.image} /* source={{ uri: `${image}` }} */ />

      <View style={styles.content}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Komment. Ha van icon vagy fotó... */}

      <Pressable onPress={onIconPress}>
        <Image
          source={icon || require("../../assets/close.png")}
          style={styles.icon}
        
        />
      </Pressable>
    </Pressable>
  );
};  

export default React.memo(FavoriteItem);
