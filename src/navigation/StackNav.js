import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    useColorScheme
} from 'react-native';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {CardStyleInterpolators, TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import database, {firebase} from '@react-native-firebase/database';
import i18n from '../util/i18n';
import DrawerNavScreen from '../navigation/DrawerNavScreen';
import ServiceDetailsScreen from '../screens/ServiceDetailsScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';



const Stack = createNativeStackNavigator();
const config = {
    animation: 'spring',
    config: {
        stiffness: 100,

        damping: 100,
        mass: 1,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01
    }
};
const forFade = ({current}) => ({
    cardStyle: {
        opacity: current.progress
    }
});

const StackNav = (params) => {
    database().goOnline();
    // database().ref("/").set()
    const [status,
        setStatus] = useState(params.status)
    const scheme = useColorScheme();

    return (
        <NavigationContainer
            theme={scheme === 'dark'
            ? DarkTheme
            : DefaultTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    options={{
                    headerShown: false
                }}
                    initialParams={{
                    status: params.status
                }}
                    name="DrawerNav"
                    component={DrawerNavScreen}/>
                <Stack.Screen
                    options={{
                    headerShown: false
                }}
                    name="ServiceDetails"
                    component={ServiceDetailsScreen}/>
                <Stack.Screen
                    options={{
                    headerShown: false
                }}
                    name="OrderDetails"
                    component={OrderDetailsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default StackNav;
