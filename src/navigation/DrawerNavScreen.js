import React, {useRef, useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    Dimensions
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import ServicesScreen from '../screens/ServicesScreen';
import OrdersScreen from '../screens/SettingsScreen';
import RelocationsScreen from '../screens/RelocationsScreen';
import PescriptionsScreen from '../screens/PescriptionsScreen';

import * as Animatable from 'react-native-animatable';
import Icon, {Icons} from '../util/Icons';
import Colors from '../util/Colors';
import i18n from '../util/i18n';
import HomeScreen from '../screens/HomeScreen';


const Drawer = createDrawerNavigator();

const DrawerNavScreen = ({navigation, route}) => {
    
    const backAction = () => {
        BackHandler.exitApp()
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, [])
    return (
        <Drawer.Navigator screenOptions={{
            drawerType: 'slide',
            drawerActiveBackgroundColor: Colors.primary,
            drawerActiveTintColor: Colors.white,
            drawerInactiveTintColor: Colors.darkGray,
            drawerLabelStyle: {
                marginLeft: -25,
                fontFamily: 'Oswald-Medium',
                fontSize: 15
            }
        }} drawerContent={props => <CustomDrawerContent {...props}/>}>
            <Drawer.Screen
                options={{
                    headerTitleStyle: {
                        fontFamily: "Redressed-Regular",
                        color: Colors.darkGray,
                        marginLeft: -20
                    },
                    drawerIcon: ({color}) => (
                        <Icon type={Icons.Ionicons} name={'bicycle'} size={22} color={color}/>
                    )
                }}
                name="Services"
                component={HomeScreen}
            ></Drawer.Screen>
            <Drawer.Screen
                options={{
                    tabBarShowLabel: true,
                    drawerIcon: ({color}) => (
                        <Icon type={Icons.Octicons} name={'list-ordered'} size={22} color={color}/>
                    )
                }}
                name="Orders"
                component={OrdersScreen}
            ></Drawer.Screen>
            <Drawer.Screen
                options={{
                    tabBarShowLabel: true,
                    drawerIcon: ({color}) => (
                        <Icon type={Icons.Ionicons} name={'location-sharp'} size={22} color={color}/>
                    )
                }}
                name="Relocations"
                component={RelocationsScreen}
            ></Drawer.Screen>
            <Drawer.Screen
                options={{
                    tabBarShowLabel: true,
                    drawerIcon: ({color}) => (
                        <Icon type={Icons.AntDesign} name={'filetext1'} size={22} color={color}/>
                    )
                }}
                name="Pescriptions"
                component={PescriptionsScreen}
            ></Drawer.Screen>
        </Drawer.Navigator>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12,
        textAlign: 'center',
        color: Colors.appBackground,
        marginBottom: 5
    }
});

export default DrawerNavScreen;
