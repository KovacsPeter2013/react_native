import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import {
  ScrollView,
  Text,
  Image,
  View,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "../../../components/Button";
import ImageCarousel from "../../../components/ImageCarousel";
import { ServicesContext, UserContext } from "../../../../App";
import axios from "axios";

const ProductDetails = ({ route, navigation }) => {
  const [bookmarkImage, setBookmarkImage] = useState(
    liked
      ? require("../../../assets/bookmark_filled.png")
      : require("../../../assets/bookmark_blue.png")
  );

  const { services, setServices } = useContext(ServicesContext);
  const [liked, setLiked] = useState();

  // A navigation és route között vannak különbségek abban, hogy miket biztosítanak. Navigation funkciókat
  // a rotue meg adatokat...console.log(navigation) vagy console.log(route)

  const { user, setUser } = useContext(UserContext);
  //console.log(user);
  //console.log(route?.params?.product?.id);
  const { product } = route?.params || {};

  //console.log('ProductDetails--->', product)
  //console.log('ProductDetails User--->', user)

  const onBackPress = () => {
    navigation.goBack();
  };

  const onContact = () => {
    // Telefonhívás:
    // const phone = '1234567'
    //Linking.openURL(`tel:${phone}`);

    //Email:
    const email = "kovacs2013peter@gmail.com";
    Linking.openURL(`mailto:${email}`);
  };

  const bookmark_Is_Liked = async () => {
    try {
      const response = await axios.post(
        "http://192.168.0.22/reactnativeAPI/insertFavorite.php",
        {
          method: "post",
          data: route?.params?.product?.id,
          user,
          check: "checkIsLiked",
        }
      );

      console.log(response?.data);

      if (response?.data.üzenet == "Ez a termek mar lajkolva van") {
        setLiked(true);

        setBookmarkImage(require("../../../assets/bookmark_filled.png"));
      } else {
        setLiked(false);
      }
    } catch (error) {
      console.log("Hiba történt a kedvencek ellenőrzése során:", error);
    }
  };

  bookmark_Is_Liked();

  useEffect(() => {
    //setLiked()
    //console.log('useEffect', liked);
  }, []);

  const addBookmark = async () => {
    const response = await axios.post(
      "http://192.168.0.22/reactnativeAPI/insertFavorite.php",
      {
        method: "post",
        data: route?.params?.product?.id,
        user,
      }
    );
    
    setBookmarkImage(require("../../../assets/bookmark_filled.png"));
  };
  
  console.log('services-------------->',services)
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container}>
        {product?.images?.length ? (
          <ImageCarousel images={product?.images} />
        ) : (
          <Image source={{ uri: product?.image }} style={styles.image} />
        )}
        <View style={styles.content}>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>{product?.price} Ft.</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>

        <Pressable onPress={onBackPress} style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            source={require("../../../assets/back.png")}
          />
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable onPress={addBookmark} style={styles.bookmarkContainer}>
          <Image style={styles.bookmarkIcon} source={bookmarkImage} />
        </Pressable>
        <Button onPress={onContact} title="Kapcsolat az eladóval" />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(ProductDetails);
