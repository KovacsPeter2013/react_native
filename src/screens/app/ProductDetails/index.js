import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./styles";
import { ScrollView, Text, Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/Button";

const ProductDetails = ({ route, navigation })=>{

    // A navigation és route között vannak különbségek abban, hogy miket biztosítanak. Navigation funkciókat
    // a rotue meg adatokat...console.log(navigation) vagy console.log(route)
    
    const {product} = route?.params || {};
    
    //console.log(product)

    const onBackPress = () => {
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView style={styles.container}>
                <Image source={{uri: product?.image}}  style={styles.image}/>
                <View style={styles.content}>
                  <Text style={styles.title}>{product?.title}</Text>
                  <Text style={styles.price}>{product?.price}</Text>
                  <Text style={styles.description}>{product?.description}</Text>
                </View>


                <Pressable onPress={onBackPress} style={styles.backContainer}>
                    <Image style={styles.backIcon} source={require('../../../assets/back.png')} />
                </Pressable>
            </ScrollView>

            <View style={styles.footer}>
                <Pressable style={styles.bookmarkContainer}>
                    <Image style={styles.bookmarkIcon} source={require('../../../assets/bookmark_blue.png')} />
                </Pressable>
                <Button title="Kapcsolat az eladóval"/>
            </View>
        </SafeAreaView>
    )
}

export default React.memo(ProductDetails);