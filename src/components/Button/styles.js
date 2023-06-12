import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.blue,
        padding: 8,
        paddingHorizontal: 8,
        paddingVertical: 20,
        borderRadius: 8,
        width: '100%'
    },
    title:{
        color: colors.white,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default styles;