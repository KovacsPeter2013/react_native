import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./styles";
import { Linking, ScrollView,Text,Image, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../../components/Header";
import ListItem from "../../../components/ListItem";
import EditableBox from "../../../components/EditableBox";
import Button from "../../../components/Button";
import { ProfileContext } from "../../../../App";
import axios from "axios";

const Settings = ({ navigation })=>{

    
    const onItemPress = () =>{
        Linking.openURL('https://google.com');     
    }
    const [editing, setEditing]= useState(false);
    


// Figyelem. Így lehet megszerezni az adatokat másik oldalon a context-ből:
const {profile, setProfile} = useContext(ProfileContext);

//const teszt = profile;
//console.log("ez van a usercontexben---->>>>", teszt);
const[values, setValues] = useState({ _id: profile?._id, name: profile?.name, email: profile?.email });

const updateProfile = async() => {

    try{
        const response = await axios.post('http://192.168.0.22/reactnativeAPI/profileEdit.php', {
            method: 'post',          
            data: values,
          });
          //console.log("Frissített adatok", response?.data.user_updated_details[0]);
          setProfile(response?.data.user_updated_details[0]);
          
        }catch(error){
            console.log('Profil update hiba', error);
        }

    }
    
const onSave = async() => {

    updateProfile();
    //console.log('lefut????????????????????')
    setEditing(false);
}


    const onChange = (key, value) => {

        setValues(v => ({...v, [key]:value})) // Figyelem. A kulcs beállítása az új értékre
    }
    //console.log(values) Itt lehet csekkolni mi történik


    const goBack = () => {
        navigation.goBack();
    }
    const onEditPress = () => {
        setEditing(true);
    }

    return (
        <SafeAreaView >
            <Header showBack={true} onBackPress={goBack} title="Beállítások"/>
            <ScrollView style={styles.container}>
                <View style={styles.sectionHeader}>
                <Text  style={styles.sectionTitle}>Személyes adatok</Text>
                <Pressable onPress={onEditPress}>
                    <Image style={styles.icon} source={require('../../../assets/edit.png')} />
                </Pressable>
                </View>
                <EditableBox label="Név" value={values.name}  onChangeText={(v) => onChange('name', v)} editable={editing}/>{/*  Figyelem. editing: Tehát megkapja az editing state-et. Vagy igaz vagy hamis */}
                <EditableBox label="Email" value={values.email} />

                {editing ? (
                    <Button onPress={onSave} title="Mentés"  style={styles.button}/>

                ) : null}


                <Text  style={[styles.sectionTitle, {marginTop:40}]}>Help center</Text>
                {/* Itt még nincs vertikálisan középen */}
               <ListItem onPress={onItemPress} style={styles.item} title='FAQ'/>
               <ListItem onPress={onItemPress} style={styles.item} title='Kapcsolat'/>
               <ListItem onPress={onItemPress} style={styles.item} title='Felhasználási Feltételek'/>
               <View style={{ height : 300}} ></View>
            </ScrollView>
        </SafeAreaView>
    )   
}

export default React.memo(Settings);