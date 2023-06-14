import React, { useState } from "react";
import { Pressable, Text, View,Image } from "react-native";
import {styles} from './styles'
import Input from "../Input";


const Header = ({ title, onBackPress, onLogout, showLogout, showSearch, showBack, onSearch, keyword }) => {


    const [showSearchInput, setShowSearchInput] = useState(false);

    const onSearchClick = () =>{
        setShowSearchInput(s => !s)
    }

    return(

        <View style={styles.maincontainer}>
        <View style={styles.container}>
            {showBack ? (
           <Pressable hitSlop={20} onPress={onBackPress}>
              <Image style={styles.icon} source={require('../../assets/back.png')} />
           </Pressable>

            ) : showSearch ? (

            <Pressable hitSlop={20} onPress={onSearchClick}>
                <Image style={styles.icon} source={require('../../assets/search.png')} />
            </Pressable>

            ) : <View style={styles.space} /> }

                {showLogout ? (
                <Pressable hitSlop={20} onPress={onLogout}>
                <Image style={styles.icon} source={require('../../assets/logout.png')} />
                </Pressable>

                ) : <View style={styles.space} /> }
            <Text style={styles.title}>{ title }</Text>
        </View>

            {showSearchInput ? (
                <Input onChangeText={ onSearch } value={keyword} placeholder="Keresés..."/>

            ) : null }        
        </View>
    )
    
}

export default React.memo(Header);