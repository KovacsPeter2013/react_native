import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { Alert, FlatList, ScrollView, Text } from "react-native";
import { products } from "../../../data/products";
import FavoriteItem from "../../../components/FavoriteItem";
import Header from "../../../components/Header";
import { UserContext } from "../../../../App";
import axios from "axios";
import { ActivityIndicator } from "react-native";
const Favorite = ({ navigation, route }) => {
  
  const { user } = useContext(UserContext);
  //console.log(user.userToken)
  const [favs, setFavs] = useState([]);

   const getAllFavoritesFromServer = async () => {
    try {
      const response = await axios.get(
        "http://192.168.0.22/reactnativeAPI/getAllFavorites.php",
        {
          params: {
            userToken: user.userToken,
          },
        }
      );

      const Favs = response?.data.fav_fetch;
      setFavs(Favs);
    } catch (error) {
      console.error(error);
    }
  };


  // Figyelem így megoldható, hogy a Kedvencek lista frissüljön amikor rámegyünk a kedvencek oldalra, miután a Termékoldalon
  // hozzáadtuk a terméket a kedvencekhez... 
  useEffect(() => {
    const fetchFavorites = async () => {
      await getAllFavoritesFromServer();
    };
  
    fetchFavorites();
  
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFavorites();
    });
  
    return unsubscribe;
  }, [navigation]);





  const renderItem = ({ item }) => {
    const onProductPress = () => {
      navigation.navigate("ProductDetails", { product: item });
    };

    const onRemove = async () => {
      try {
        const response = await axios.post(
          "http://192.168.0.22/reactnativeAPI/deleteFavorite.php",
          {
            userToken: user.userToken,
            productId: item.id,
          }
        );
        //console.log(response);
        const Favs = response?.data.fav_fetch;
        setFavs(Favs);
        await getAllFavoritesFromServer();
      } catch (error) {
        console.error(error);
      }

      //console.log(item.id) // A Termék id-ja....
    };
    const onIconPress = () => {
      Alert.alert("Biztosan törlöd ezt terméket a kedvencek közül?", "", [
        { text: "Igen", onPress: onRemove },
        { text: "Mégsem" },
      ]);
    };

    return (
      <FavoriteItem
        onPress={onProductPress}
        onIconPress={onIconPress}
        {...item}
      /> //{...item}: Kicsomagolja az összes adatot és kirendereli
    );
  };
  return (
    <SafeAreaView>
      <Header title="Kedvencek" />
      <FlatList
        ListEmptyComponent={ ( <Text style={{ textAlign:'center', marginTop: 40}}>Még egyetlen terméket sem adtál a kedvencekhez...</Text> )}
        data={favs}
        renderItem={renderItem}
        keyExtractor={(item) => String(item?.id)}
      />
    </SafeAreaView>
  );
};

export default React.memo(Favorite);
