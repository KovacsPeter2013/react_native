import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({

    container: {
      marginHorizontal: 8,           
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      color: colors.grey,
      marginBottom: 17
      
    },
    image:{
      width: 38,
      height: 38,
   },
   imageContainer: {
    backgroundColor: colors.lightGrey,
    padding:5,
    borderRadius: 8,
    marginBottom: 8,
    marginTop: 20
   }

})

