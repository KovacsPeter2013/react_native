import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./styles";
import { FlatList, ScrollView,Text } from "react-native";
import { products } from "../../../data/products";
import FavoriteItem from "../../../components/FavoriteItem";
import Header from "../../../components/Header";

const Favorite = ({ navigation })=>{
    const renderItem = ({ item }) =>{

        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item})
        }

        return(
            <FavoriteItem onPress={onProductPress}  {...item}/> //{...item}: Kicsomagolja az összes adatot és kirendereli
        )
    }
    return (
        <SafeAreaView>
                <Header title="Kedvencek" />
                <FlatList data={products} renderItem={renderItem}  keyExtractor={(item) => String(item?.id)}/>
           
        </SafeAreaView>
    )
}

export default React.memo(Favorite);