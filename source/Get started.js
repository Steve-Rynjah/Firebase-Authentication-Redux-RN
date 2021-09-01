import React from 'react'
import { 
   View, 
   Text,
   Image, 
   TouchableOpacity, 
   Dimensions,
   Button
   } from 'react-native'
  
import Constants from './Core/constants'
import {useDispatch, useSelector} from 'react-redux'
import  allAction from './Auth/Redux/action'
import {useNavigation} from '@react-navigation/native'
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('screen').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});


const Getstarted=()=>{

   
   const navigation = useNavigation()
   const dispatch = useDispatch()
   
   const signInMethod = useSelector(state => state.auth.user?.signInMethod)

  const onLogout = () =>{
      dispatch(allAction.userAuth.logoutUser({navigation, signInMethod}))
  }

  return ( 
        <View style={{flex:1,backgroundColor:"#FFF"}}>
            <View style={{flex:1}}>
                    <Image style={{height:"100%",width:"100%"}} source={Constants.Robo}/>
            </View>
          
            <View style={{flex:1}}>
                  <View style={{marginTop:59,alignItems:"center"}}>
                    <Text style={{fontSize:27,fontFamily:"Roboto-Light"}}>WAY LESS ADMIN,</Text>
                    <Text style={{fontSize:27,fontFamily:"Roboto-Medium"}}>WAY MORE MANY!</Text>
                    <Text style={{fontSize:27,fontFamily:"Roboto-Light"}}>MADE FOR AGENCIES</Text>
                  </View>
                  <View style={{marginTop:48,alignItems:"center"}}>
                        <Button>G e t  s t a r t e d</Button>
                  </View>
              
                  <TouchableOpacity onPress={onLogout}>
                        <Text style={{alignSelf:'center', fontSize:17, marginTop:15}}>LOGOUT</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={()=> navigation.goBack()}>
                        <Text style={{alignSelf:'center', fontSize:17, marginTop:15}}>BACK</Text>
                  </TouchableOpacity>

            </View>
        </View>
  )
}

export default  Getstarted;

