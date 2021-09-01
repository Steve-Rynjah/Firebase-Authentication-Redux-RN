import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import {
  LoginManager,
  AccessToken,
} from 'react-native-fbsdk';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  GOOGLE,
  EMAIL,
  FACEBOOK,
  LOGOUT_USER,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
} from './types.js'


const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

const emailLogin = ({ email, password, navigation }) => {

  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    if (email === '') {
      Alert.alert('Please enter an email')
    }
    else if (password === '') {
      Alert.alert('Please enter a password')
    }
    else {

      auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          dispatch({ type: LOGIN_USER_SUCCESS, payload: { ...user, signInMethod: EMAIL } })
          navigation.navigate('Home')
        })
        .catch(() => Alert.alert('Authentication Failed'))

    }

  }
}

const GoogleLogin = ({ navigation }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    const funCall = async () => {
      try {
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        auth().signInWithCredential(googleCredential)
          .then(user => {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: { ...user, signInMethod: GOOGLE } })
            navigation.navigate('Home')
          })
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('Google singIn cancel')
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('In Progress')
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('Not Available')
        } else {
          console.log('Developer Error')
        }
      }
    }
    funCall()
  }
}

const FacebookLogin = ({ navigation }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    const funCall = async () => {
      try {
        await LoginManager.setLoginBehavior('web_view_only')
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
          console.log('Facebook signIn cancel')
        }
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
          console.log('Something went wrong obtaining access token')
        }

        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
        auth().signInWithCredential(facebookCredential)
          .then(user => {
            dispatch({ type: LOGIN_USER_SUCCESS, payload: { ...user, signInMethod: FACEBOOK } })
            navigation.navigate('Home')
          })

      } catch (e) {
        console.log(e)
      }
    }
    funCall()
  }
}

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  })
}

const logoutUser = ({ navigation, signInMethod }) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER })

    switch (signInMethod) {
      case EMAIL:
        auth().signOut()
          .then(navigation.navigate('Main'))

      case GOOGLE:
        GoogleSignin.revokeAccess()
        GoogleSignin.signOut()
          .then(navigation.navigate('Main'))

      case FACEBOOK:
        LoginManager.logOut()
        navigation.navigate('Main')
      default:
        return null
    }
  }
}

const ResetPassword = (email) => {
  return (dispatch) => {
    dispatch({ type: RESET_PASSWORD })

    if (email === '') {
      Alert.alert('Please enter an email')
    }
    else {
      auth().sendPasswordResetEmail(email)
        .then(dispatch({ type: RESET_PASSWORD_SUCCESS }))
        .then(Alert.alert('Check your E-mail!'))
        .catch(() => resetPasswordFail(dispatch))
    }

  }
}

const resetPasswordFail = (dispatch) => {
  dispatch({
    type: RESET_PASSWORD_FAIL
  })
}


export default {
  emailChanged,
  passwordChanged,
  emailLogin,
  GoogleLogin,
  FacebookLogin,
  logoutUser,
  ResetPassword
}





