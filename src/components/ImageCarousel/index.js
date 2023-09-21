import React, { useState } from "react";
import { FlatList, Text,  Image, View, Dimensions } from "react-native";
import styles from './styles';



const ImageCarousel = ({ images }) => {


    const {width} = Dimensions.get('window');

    const [activeIndex, setActiveIndex] = useState(0);

    const handleScrollEnd = (e) =>{
        //console.log(e.nativeEvent) ezt elvileg a böngésző mutatja. sok adat található itt
        const horizontalOffset = e.nativeEvent.contentOffset.x;
        const index = Math.round(horizontalOffset / width);
        //console.log(index)
        setActiveIndex(index);



    } 
    const renderImage = ({ item }) => {
        return(
        <Image style={styles.image}   source={{ uri: item }}/>
        )
    }
    return(
        <View >
        <FlatList
         pagingEnabled 
         horizontal 
         style={styles.list} 
         data={ images }  
         renderItem={ renderImage } 
         onMomentumScrollEnd={handleScrollEnd}/>

        <View style={styles.pagination}>
            {images?.map((_, i) => (
                <View key={i} style={[ styles.paginationLine, i === activeIndex ? styles.activeLine : {} ]} />
            ))}
        </View>

        </View>
    )    
}

export default React.memo(ImageCarousel);