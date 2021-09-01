import React,{useState, useEffect} from 'react'
import {
    View, 
    Text, 
    Dimensions, 
    TouchableOpacity, 
    Image, 
    ImageBackground, 
    TextInput,
    Button
} from 'react-native'

import EStyleSheet from 'react-native-extended-stylesheet';
import Constants from '../../Core/constants'
const entireScreenWidth = Dimensions.get('screen').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native'
import {useSelector, useDispatch} from 'react-redux'
import  allAction from '../Redux/action'



function LoginFormScreen(){
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(true)
    
    
    const email = useSelector(state => state.auth.email)
    const password = useSelector(state => state.auth.password)
    
    useEffect(()=>{ 
        setTimeout(()=>{
            setIsVisible(false)
        },5000)
    },[])

    useEffect(()=>{
        GoogleSignin.configure({
            scopes: ['email'],
            webClientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
            offlineAccess: true
          });
    },[])

    const onEmailChanged = (text) =>{
        return(
            dispatch(allAction.userAuth.emailChanged(text))
        )
    }

    const onPasswordChanged = (text) =>{
        return(
            dispatch(allAction.userAuth.passwordChanged(text))
        )
    }

    const  onLoginPress = () =>{
        return(
            dispatch(allAction.userAuth.emailLogin({email, password, navigation}))
        )
    }

    const onGoogleSignIn = () =>{
        return(
            dispatch(allAction.userAuth.GoogleLogin({navigation}))
        )
    }

    const onFacebookSignIn = () =>{
        return(
            dispatch(allAction.userAuth.FacebookLogin({navigation}))
        )
    }

    return(
        
        <View style={styles.viewContainer}>
            {isVisible ? <View style={{width:'100%', height:'100%'}}>
                <ImageBackground source={Constants.Future_Jr} blurRadius = {5} style={{width:'100%', height:'100%',}}>
                    <Image source={Constants.Future_Jr} style={{resizeMode:'contain', width:350,height:'100%', borderRadius:10, alignSelf:'center'}}/>
                </ImageBackground>
                        </View>
            :

            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <View style={styles.loginBoxContainer}>
                        <Text style={styles.loginText}>Login</Text>

                        <Text style={styles.emailAndPasswordText}>Email :</Text>  
                            <View style={styles.boxView}>
                            <TextInput
                                    value = {email}
                                    placeholder="Email Address"
                                    style={{marginStart:10, fontSize:17, color: '#090A0C'}}
                                    onChangeText = {onEmailChanged} 
                                /> 
                            </View>

                        <Text style={styles.emailAndPasswordText}>Password :</Text>  
                            <View style={styles.boxView}>
                            <TextInput
                                    value = {password}
                                    placeholder="Password"
                                    secureTextEntry
                                    style={{marginStart:10, fontSize:17, color: '#090A0C'}}
                                    onChangeText = {onPasswordChanged}
                                /> 
                            </View>
   
                            <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                                <TouchableOpacity onPress={()=> navigation.navigate('Forgot')}>
                                    <Text style={styles.forgotText}>Forgot Password?</Text> 
                                </TouchableOpacity>
                            </View>
                           
                       
                        <View style={styles.button}>
                        
                            <Button onPress={onLoginPress}>L O G I N</Button>
                    
                        </View>

                        <Text style={styles.OR}>OR</Text>

                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-evenly'}}>

                            <TouchableOpacity onPress={onFacebookSignIn}>
                                <View style={styles.boxView2}>
                                    <Image source = {Constants.Facebook} style={styles.icon}/>
                                    <Text style={styles.facebookAndGoogleText}>FACEBOOK</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onGoogleSignIn}>
                                <View style={styles.boxView2}>
                                    <Image source = {Constants.Google} style={styles.icon}/>
                                    <Text style={styles.facebookAndGoogleText}>GOOGLE</Text>
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                        
                    </View>

                </View>
            }
        </View>
    )
}

const styles = EStyleSheet.create({
    viewContainer:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#FFF',
        opacity:1
    },
    loginBoxContainer:{
        width: '335rem',
        height: '520rem',
        alignSelf:'center',
        borderRadius: '10rem',
        backgroundColor:'#F6F7FC',
        borderWidth:'1rem',
        borderColor:'#090A0C'
    },
    loginText:{
        fontSize:'45rem',
        fontWeight:'bold',
        alignSelf:'center',
        marginVertical:'15rem',
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
    boxView2:{
        flexDirection:'row',
        alignItems:'center',
        width: '150rem',
        height:'50rem',
        alignSelf:'center',
        backgroundColor:'#FFF',
        borderWidth:'1rem',
        borderColor:'#090A0C',
        borderRadius:'10rem',
        marginTop:'10rem'
    },
    button:{
        alignSelf:'center',
        marginTop:'30rem'
    },
    icon:{
        width:'30rem',
        height:'30rem',
        marginLeft:'10rem',
    },
    emailAndPasswordText:{
        fontSize:'17rem',
        marginLeft:'10rem',
        fontWeight:'bold',
        color:'#090A0C'
    },
    facebookAndGoogleText:{
        fontSize:'17rem',
        marginLeft:'5rem',
        fontWeight:'bold',
        color:'#090A0C'
    },
    forgotText:{
        fontSize:'15rem',
        marginLeft:'180rem',
        marginTop:'15rem',
        fontWeight:'bold',
        color:'#707070'
    },
    OR:{
        alignSelf:'center',
        color:'#707070', 
        fontSize:'13rem', 
        fontWeight:'bold', 
        marginTop:'15rem'
    }
})

export default LoginFormScreen;
