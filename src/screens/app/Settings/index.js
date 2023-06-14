import React, { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from "./styles";
import { ScrollView,Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Settings = ()=>{
    return (
        <SafeAreaView >
            <ScrollView style={styles.container}>
                <Text>Beállítások</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default React.memo(Settings);