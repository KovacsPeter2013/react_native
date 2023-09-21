import React, { useContext, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./styles";
import {  ScrollView, Text, TouchableOpacity, Image, View, Pressable, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import Header from "../../../components/Header";
import * as ImagePicker from 'expo-image-picker';
import Input from "../../../components/Input";
import {categories} from '../../../data/categories';
import Button from "../../../components/Button";
import axios from "axios";
import { ServicesContext, UserContext } from "../../../../App";




const CreateListing = ({ navigation})=>{

    const [image, setImage] = useState([]);
    const [values, setValues] = useState({}); // Figyelem. {} azaz object
    const [loading, setLoading] = useState(false);  

    const {services, setServices} = useContext(ServicesContext);

    const {user} = useContext(UserContext);

    //console.log('Felhasználó--->', user?.userToken);

    const goBack = () => {
        navigation.goBack();
    }


    const pickImage = async () => {
        setLoading(true)
        let result = await ImagePicker.launchImageLibraryAsync();
        console.log(result);
        
        if (result?.assets?.length) {
            setImage(list => ([...list, ...result?.assets]));
            setLoading(false)
        }
    };

    const onDeleteImage = (selectedImage) => {
        setImage(list => list.filter(image => image.uri !== selectedImage.uri));
    }

  const onChange = (value, key) => {
    setValues((val) => ({ ...val, [key]: value}))
  }




  const onSubmit = async () => {
    const formData = new FormData();
    image.forEach((img, index) => {
        formData.append(`image${index + 1}`, {
          uri: img.uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      });



    const response = await axios.post(
      "http://192.168.0.22/reactnativeAPI/insertProduct.php", 
      {
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data',
          },
        ...values,
        category: values,
        token: user.userToken,
        body: formData  
      }
    );
    console.log(response?.data)
    //setServices(response?.data)
    //setValues({})
    navigation.navigate('MyListing')
  };




    return (
        <SafeAreaView >
            <Header showBack={true} onBackPress={goBack} title="Lista Készítése"/>
            <KeyboardAvoidingView behavior="height">
            <ScrollView style={styles.container}>
                <Text  style={styles.sectionTitle}>Fotók feltöltése</Text>
                <View style={styles.imageRow}>
                    <TouchableOpacity disabled={loading} onPress={pickImage} style={styles.uploadImageContainer} >
                        <View  style={styles.uploadCircle} >
                            <Text  style={styles.uploadPlus}>+</Text>
                        </View>             
                    </TouchableOpacity>
                    
                    {image?.map(selectedImage => (
                        <View style={styles.imageCont}  key={selectedImage.uri}>
                            <Image source={{uri: selectedImage.uri}} style={styles.image} />
                            <Pressable hitSlop={20} onPress={() => onDeleteImage(selectedImage)}>
                                <Image  source={require('../../../assets/close.png')} style={styles.delete} />
                            </Pressable>
                        </View>
                    ))} 
                    {loading ? (
                        <ActivityIndicator />
                    ) : null}
                </View>  

                <Input placeholder='Lista címe' label="Cím" value={values.title}  onChangeText={(v) => onChange(v, 'title')} />
                <Input options={categories}  placeholder='Válassz kategóriát'  label="Kategória" value={values.category}   onChangeText={(v) => onChange(v, 'category')} type='picker'/>
                <Input placeholder='Add meg az árat' label="Ár" value={values.price}  onChangeText={(v) => onChange(v, 'price')} keyboardType='numeric'/>
                <Input style={styles.textArea}   placeholder='Bővebben...' label="Leírás"  value={values.description}  onChangeText={(v) => onChange(v, 'description')}  multiline  />

                 <Button onPress={onSubmit} title='Mentés' style={styles.button} />       

               <View style={{ height : 200}} />
            </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )   
}

export default React.memo(CreateListing);
