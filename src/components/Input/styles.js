import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({

    container: {
        marginBottom: 20

    },
     label:{
        marginBottom: 8,
        color: colors.blue,
        fontSize: 14,
        fontWeight: "500"
    
     },
     inputContaier: {
    
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center'

     },
      input:{       
        paddingHorizontal: 10,
        paddingVertical: 14, 
        flex:1,
        
        
      },
      eye: {
         width:22,
         height: 22,
         marginHorizontal:16,
         
      }

})