import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./styles";
import { Alert, FlatList, Text } from "react-native";
//import { products } from "../../../data/products";
import FavoriteItem from "../../../components/FavoriteItem";
import Header from "../../../components/Header";
import axios from "axios";
import { UserContext } from "../../../../App";






const MyListing = ({ navigation })=>{

    const [myProducts, setMyProducts] = useState([]);
    const { user } = useContext(UserContext);


    const getAllUserproducts = async () => {
        try {
          const response = await axios.get(
            "http://192.168.0.22/reactnativeAPI/getAllUserproducts.php",
            {
              params: {
                userToken: user.userToken,
              },
            }
          );
            
          //const products = response?.data;
          //console.log('adatok--------------->', response?.data)
          const Products = response?.data.user_products; 
          setMyProducts(Products);

        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        getAllUserproducts()
      }, []);




    const renderItem = ({ item }) =>{

        const onProductPress = () => {
            navigation.navigate('ProductDetails', { product: item})
        }  

        const onRemove = async () => {
            try {
              const response = await axios.post(
                "http://192.168.0.22/reactnativeAPI/deleteListing.php",
                {
                  userToken: user.userToken,
                  productId: item.id,
                }
              );
              console.log(response?.data);
              //const updatedProducts = response?.data.fav_fetch;
              //setMyProducts(updatedProducts);
              //await getAllFavoritesFromServer();
            } catch (error) {
              console.error(error);
            }
      
            console.log('A Termék id-ja....',item.id) // A Termék id-ja....
            getAllUserproducts();
          };

          
          const Question = () => {
            Alert.alert("Biztosan törlöd ezt terméket a listádról?", "", [
              { text: "Igen", onPress: onRemove },
              { text: "Mégsem" },
            ]);
          };
        

        return(
            //{...item}: Kicsomagolja az összes adatot és kirendereli
            <FavoriteItem 
            onIconPress={Question}
            icon={require('../../../assets/delete.png')} onPress={onProductPress} 
             {...item}
             /> 
        )
    }

    const goBack = () => {
        navigation.goBack();    
    }
    return (
        <SafeAreaView>
                {/* Komment. Vissza gomb headerben */}
                <Header title="Listám" showBack onBackPress={goBack}/>
                <FlatList ListEmptyComponent={ ( <Text style={{ textAlign:'center', marginTop: 40}}>Még egyetlen terméket sem adtál hozzá...</Text> )}  data={myProducts} renderItem={renderItem}  keyExtractor={(item) => String(item?.id)}/>
           
        </SafeAreaView>
    )
}

export default React.memo(MyListing);