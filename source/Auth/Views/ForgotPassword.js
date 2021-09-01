import React from  'react'
import {
    View, 
    Text, 
    Dimensions, 
    TextInput, 
    Image,
    TouchableOpacity,
    Button
} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import Constants from '../../Core/constants'
import allAction from '../Redux/action';
import {useDispatch, useSelector} from 'react-redux';

const entireScreenWidth = Dimensions.get('screen').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

function ForgotPassword(){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const email = useSelector(state => state.auth.email)

    const onEmailChanged = (text) =>{
        return(
            
            dispatch(allAction.userAuth.emailChanged(text))
        )
    }

    const onResetPassword = () =>{
        return(
            dispatch(allAction.userAuth.ResetPassword(email))
        )
    }

    return(
        <View style={styles.viewContainer}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Image source={Constants.Back_Black} style={styles.backIcon}/>
            </TouchableOpacity>
           
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={styles.BoxContainer}>
                        <Text style={styles.ForgotText}>Forgot Password?</Text>

                        <Text style={styles.text}>Email :</Text>
                            <View style={styles.boxView}>
                                    <TextInput
                                        value = {email}
                                        placeholder="Email Address"
                                        style={{marginStart:10, fontSize:17, color: '#090A0C'}}
                                        onChangeText = {onEmailChanged}
                                    /> 
                            </View>

                            <View style={styles.button}>
                                <Button onPress={onResetPassword}>S E N D</Button>
                            </View> 
                    </View>
                </View>
        </View>
    )
}

const styles = EStyleSheet.create({
    viewContainer:{
        flex: 1,
        backgroundColor:'#FFF',
        opacity:1
    },
    BoxContainer:{
        width: '335rem',
        height: '335rem',
        alignSelf:'center',
        borderRadius:'10rem',
        backgroundColor:'#F6F7FC',
        borderWidth:'1rem',
        borderColor:'#090A0C'
    },
    ForgotText:{
        fontSize:'30rem',
        fontWeight:'bold',
        alignSelf:'center',
        marginVertical:'15rem',
        color:'#090A0C'
    },

    text:{
        fontSize:'17rem',
        marginLeft:'15rem',
        fontWeight:'bold',
        marginTop:'35rem',
        color:'#090A0C'
    },
    boxView:{
        flexDirection:'row',
        alignItems:'center',
        width: '300rem',
        height:'50rem',
        alignSelf:'center',
        backgroundColor:'#FFF',
        borderWidth:'1rem',
        borderColor:'#090A0C',
        borderRadius:'10rem',
        marginVertical:'15rem',
    },
    button:{
        alignSelf:'center',
        marginTop:'40rem'
    },
    backIcon:{
        width:'35rem',
        height:'35rem',
        marginLeft:'15rem',
        marginTop:'30rem'
    }

})

export default ForgotPassword;