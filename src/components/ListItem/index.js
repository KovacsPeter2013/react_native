import React from "react";
import { Text, View , Image, Pressable} from "react-native";
import styles from './styles';



const ListItem = ({ title, subtitle, onPress, style }) => {
    return(
        
        <Pressable onPress={onPress} style={[styles.container, style]}>
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                {!subtitle ? (
                    
                    <Text style={styles.subtitle}>{subtitle}</Text>

                ): null}
           </View>
            <Image source={require('../../assets/arrow.png')} style={styles.arrow} />
        </Pressable>
    )
    
}

export default React.memo(ListItem);