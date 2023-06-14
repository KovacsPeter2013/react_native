import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import  {styles} from "./styles";
import { ScrollView,Text } from "react-native";


const Profil = ()=>{
    return (
        <SafeAreaView >
            <ScrollView style={styles.container}>
                <Text>Profil</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Profil);