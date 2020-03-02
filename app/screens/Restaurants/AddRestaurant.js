import React, {useState, useRef} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AddRestaurantForm from '../../components/Restaurants/AddRestaurantForm';

export default function AddRestaurant(props) {
    const {navigation} = props;
    const {setIsReloadRestaurants} = navigation.state.params;
    const toastRef = useRef();
    const [isLoading, setIsLoading] = useState(false);


    return (
        <View>
            <AddRestaurantForm 
                        navigation={navigation}
                        toastRef={toastRef}
                        setIsLoading={setIsLoading}
                        setIsReloadRestaurants={setIsReloadRestaurants}
            />
            <Toast ref={toastRef} position="center" opacity={0.5} />
            <Loading isVisible={isLoading} text="Creando Restaurante" />    
        </View>
    )
}
