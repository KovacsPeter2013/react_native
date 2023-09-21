import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./styles";
import { FlatList, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import {categories}  from "../../../data/categories";

import CategoryBox from "../../../components/CategoryBox";
import ProductHomeItem from "../../../components/ProductHomeItem";
import { ServicesContext } from "../../../../App";
import axios from "axios";



const Home = ({ navigation })=>{

    //const navigation = useNavigation();
    const [selectedCategory, setSelectedCategory] = useState();
    const [filteredProduct, setfilteredProduct] = useState(services);
    const [keyword, setkeyword] = useState();    
    const {services, setServices} = useContext(ServicesContext);
    
    //console.log('Services----------->', services);


    const getServices = async () => {
        try {
      
          const response = await axios.get('http://192.168.0.22/reactnativeAPI/getAllProducts.php', {
      
          });
          //console.log(response.data);             
        
          return response.data;
        } catch (e) {
          console.log('error :>> ', e);
        
        }
      };

    useEffect(() => {
        (async() => {
            const data = await getServices();
            setServices(data);
        })()

    }, [])



    // Filterezés kategória kis képekre érintéskor
    useEffect(() => {
        if(selectedCategory && !keyword){
        const updatedProducts = services.filter((product) => product?.category == selectedCategory);
        setfilteredProduct(updatedProducts)
    } else if(selectedCategory && keyword){
        const updatedProducts = services.filter((product) => product?.category == selectedCategory && product?.title?.toLowerCase().includes(keyword?.toLowerCase()) );
        setfilteredProduct(updatedProducts);
    } else if(!selectedCategory && keyword){
        const updatedProducts = services.filter((product) =>  product?.title?.toLowerCase().includes(keyword?.toLowerCase()));
        setfilteredProduct(updatedProducts);
        
    } else if(!keyword && !selectedCategory){        
        setfilteredProduct(services)
        }
    }, [selectedCategory, keyword, services]) // <<<----Figyelem. Azért nem töltötte be kezdéskor a termékeket mert nem vol itt a services

    const renderCategoryItem = ({item, index}) =>{
        return(
            // item?.title: Ha létezik a title...
            // Ezzel a szintaktikával nem fog hibát dobni...
            <CategoryBox
            onPress={() => setSelectedCategory(item?.id)}
            isSelected={item?.id === selectedCategory}
             title={item?.title} 
             image={item?.image} 
             isFirst={ index == 0 } 
             
             />
        )
    }

    const renderProductItem = ({ item }) =>{

        // Figyelem.
        // Itt adódik át a paraméter(a termék adatai) a ProductDetails komponensenk
        const onProductPress = (product) => {
            navigation.navigate('ProductDetails', { product })
        };
        return(
            <ProductHomeItem   onPress={() => onProductPress(item)} {...item}/> // ...item: Kibontja az összes item-et és kirendereli
        )
    }


    return (
        <SafeAreaView >
           {/*  <ScrollView style={styles.container}> */}

                <Header showSearch onSearch={ setkeyword } keyword={ keyword } title='Keresés a termékek között'/>

                <FlatList 
                style={styles.list} 
                horizontal 
                data={categories} 
                renderItem={renderCategoryItem} 
                keyExtractor={(item, index) => String(index)}
                showsHorizontalScrollIndicator = {false}
                />
              
              <FlatList
               style={styles.productList}
               numColumns={2}
               data={filteredProduct}
               renderItem={renderProductItem}
               keyExtractor={(item, index) => String(item.id)}

               // Ez azért kell, mert enélkül nem lehetne teljesen lescrollozni
               // Ez csak egy üres elem
               ListFooterComponent={<View style={{ height : 200}} />}
               />



          {/*   </ScrollView> */}
        </SafeAreaView>
    )
}

export default React.memo(Home);