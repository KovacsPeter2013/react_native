import React, { useState } from "react"
import { TextInput, View,Text, Pressable,Image, Modal, TouchableWithoutFeedback, TouchableOpacity, } from "react-native"
import { styles } from "./styles";



const Input = ( {type, options, label, isPassword, value, onChangeText,style, placeholder, ...props } ) =>{

    // Jelszó mező 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isPickerModalVisible, setPickerModalVisible,] = useState(false);

    const onEyepress = ()=>{
        setIsPasswordVisible(!isPasswordVisible);
    }


 // Figyelem. A map-elt loopban az épp kattintott opt változót használja...   
const onSelect = (opt) => {
    onChangeText(opt);
    setPickerModalVisible(false);
}
    return(

        <View style={styles.container}>
            <Text style={styles.label}>{ label }</Text>
                {type === 'picker' ? (
                <Pressable onPress={() => setPickerModalVisible(true)} style={styles.inputContaier}>
                    
                  {/*   Komment. Ha van value akkor jeleneítsük meg. Ha nincs akkor a placeholder */}
                    {value ? (
                        
                        <Text style={[styles.input, style]}>{value?.title}</Text>         
                        
                        ) : (
                            
                            <Text style={[styles.placeholder, style]}>{placeholder}</Text>         

                    )}
                   
                    <Image 
                        style={styles.arrow} 
                        source={require('../../assets/arrow.png') }
                    />         
                    </Pressable>
                    
                    ) : (
                       
                <View style={styles.inputContaier}>
                        <TextInput
                         placeholder={placeholder}
                         value={value} 
                         onChangeText={onChangeText} 
                         secureTextEntry={isPassword && !isPasswordVisible}           
                         style={[styles.input, style]} 
                         /* Figyelem. {...props} fel van véve ebben a komponensben, mert így olyan bejövő adatot is tud fogadni, ami itt nincs deklarálva felül.
                         Pl a CreateListing-ben van használva ez a komponens és abban van egy ilyen: keyboardType='numeric' */
                         {...props}/> 
                     
                        {isPassword ? ( // Ha ez a feltétel vizsgálat nincs, akkor az összes mezőben megjelenik a jelszó szem
                        <Pressable onPress={onEyepress}>
                              <Image 
                              style={styles.eye} 
                              source={isPasswordVisible ? require('../../assets/eye.png') :require('../../assets/eye_close.png')  }/>
                        </Pressable>
                        ) : null}
                </View> 
                        
                        )}

                        <Modal visible={isPickerModalVisible} transparent>
                            <TouchableOpacity activeOpacity={1} onPress={() => setPickerModalVisible(false)} style={styles.modalWrapper} >
                                <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
                                    <Text style={styles.headerTitle} >Válassz</Text>

                                    {options?.map(opt => {

                                        if(!opt?.id){
                                            return null;
                                        }
                                        // Figyelem.
                                        //„hogy kitaláljuk melyik a selected...” (kiválasztott érték)
                                        const selected = value?.id === opt?.id;
                                        return(
                                        // és utána a stílus manipulálása.
                                        // ha kattingat az option-ökre akkor kék lesz a színe amire épp kattint
                                        <Text onPress={() => onSelect(opt)} style={[styles.optionText, selected ? styles.selectedOption : {}]} key={opt?.title}>{opt?.title}</Text>

                                        )
                                        })}
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </Modal>
        </View>
    )
}

export default Input;