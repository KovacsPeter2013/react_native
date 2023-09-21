import { StyleSheet } from "react-native";
import { colors } from "../../../utils/colors";


export const styles = StyleSheet.create({

    container: {
        padding: 24,        

    },    
    sectionTitle: {
        fontWeight: '500',
        fontSize: 14,
        color: colors.blue,
        marginBottom: 16
    },
    image: {
        width: 100,
        height: 100,
       
    },
    uploadImageContainer: {
        
        width: 100,
        height: 100,
        borderRadius: 8,
        borderWidth: 1,
        color: colors.grey,
        borderStyle: 'dotted',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight:8,
        marginTop: 8
    },
    uploadPlus: {
        color: colors.white,
        fontSize: 28,
        marginTop: -6

    },
    uploadCircle: {
        width: 32,
        height: 32,
        borderRadius: 20,
        backgroundColor: colors.lightGrey,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        paddingBottom: 16
    },
    imageCont: {
        flexDirection: 'row',
        borderRadius: 8,
        marginRight:8
    },
    delete: {
        width:24,
        height:24,
        marginLeft: -10,
        marginTop: -16
    },
    textArea:{
        minHeight: 150,
        paddingTop: 16
    },
    button: {
        marginBottom: 160
    }
    

}) 

