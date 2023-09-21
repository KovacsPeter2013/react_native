import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

const styles = StyleSheet.create({

    container: {
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,     
      borderRadius: 8,      
      borderColor: colors.lightGrey,
      borderWidth: 2,
      marginBottom: 10
    },
    title: {
        color: colors.blue,
        fontSize: 18,
        fontWeight: 'bold',
    },  
    subtitle: {
        color: colors.grey,
        fontSize: 12,
        marginTop: 6

    },
    arrow: {
        width: 32,
        height: 32
    }
})

export default styles;