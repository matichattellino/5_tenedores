import React, {useState} from 'react';
import { SocialIcon } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading';

export default function LoginFacebook(props) {
    const {toastRef, navigation} = props;
    const [ isLoading, setIsLoading] = useState(false);

    const login = async () => {
        await Facebook.initializeAsync('814427962406999');
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            FacebookApi.application_id,
             { permissions: FacebookApi.permissions }
        );

        if(type === "success") {
            setIsLoading(true);
            const credentials = firebase.auth.FacebookAuthProvider.credential(token);
            await firebase
                .auth()
                .signInWithCredential(credentials)
                .then(() => {   
                    console.log('Login correcto')
                    navigation.navigate("MyAccount");
                })
                .catch(() => {
                    console.log('Login incorrecto, intente mas tarde')
                    toastRef.current.show('Error accediendo con Facebook, intentelo nuevamente')
                })
        } else if(type === "cancel") {
            console.log("inicio de sesion cancelado")
            toastRef.current.show('Inicio de sesion cancelado')
        } else {
            toastRef.current.show('Error desconocido, intentelo mas tarde');
            console.log("Error desconocido intentelo mas tarde")
        }
        setIsLoading(false);
    }; 

    return (
        <>
        <SocialIcon
            title="Iniciar Sesion con Facebook"
            button
            type="facebook"
            onPress={login}
        />
        <Loading isVisible={isLoading} text="Iniciando Sesion" />
        </>
    )
}