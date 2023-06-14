import { StyleSheet } from "react-native";
import { colors } from "../../utils/colors";

export const styles = StyleSheet.create({
      maincontainer:{
        paddingHorizontal: 24  
      },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
       // justifyContent: 'space-between',
       justifyContent: 'center',
       paddingHorizontal: 24     

    },
    title: {
      color: colors.black,
      fontSize: 16,
      fontWeight: 'bold',
      
    },
    icon:{
      width: 24,
      height: 24,
   },
    space: {
       width: 24,

    }
 

})

