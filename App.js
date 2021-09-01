import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux'
import store from './source/Auth/Redux/store/configureStore'

import LoginFormScreen from './source/Auth/Views/LoginForm'
import ForgotPassword from './source/Auth/Views/ForgotPassword'
import Home from './source/Get started'

const App=()=>{
        const Stack = createStackNavigator();
  return(
    <Provider store={store}>
        <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown:false}} >
                      <Stack.Screen name="Main" component={LoginFormScreen} options={{headerShown:false}} />
                      <Stack.Screen name="Forgot" component={ForgotPassword} options={{headerShown:false}} />
                      <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />  
              </Stack.Navigator>   
        </NavigationContainer>
    </Provider>
  )
}

export default App;
