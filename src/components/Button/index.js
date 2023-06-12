import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from './styles';


// Figyelem. Így kívülről is be lehet adni az onPress-t
const Button = ({ title, onPress, style }) => {


     // Memo-t lehet csekkolni így. Ha nincs memo, akkor újra rendereli akkor is ha nincs
     // is szükség rá. Memóval a performance javítható.
    //console.log('Gomb')
    return(
    <TouchableOpacity activeOpacity={0.6} onPress={onPress} style={[styles.container, style]}>
        <Text style={styles.title}>{ title }</Text>
    </TouchableOpacity>
    )
    
}

export default React.memo(Button);