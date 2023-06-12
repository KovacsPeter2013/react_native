import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const styles = StyleSheet.create({

    container: {
       borderColor: colors.grey,
       borderRadius: 4,
       borderWidth:1,
       width: 22,
       height: 22

    },
    innerContainer: {
        backgroundColor: colors.grey,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkIcon: {
        width: 12,
        height: 9
    }

   
})

export default styles;