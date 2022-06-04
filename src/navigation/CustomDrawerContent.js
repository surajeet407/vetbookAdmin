import React, {useRef, useState, useEffect} from 'react';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Title from '../reusable_elements/Title';
import Colors from '../util/Colors';

const CustomDrawerContent = (props) => {
    
    return (
        <View style={{flex: 1}}>
             <ImageBackground
                blurRadius={0}
                source={require('../assets/images/background6.png')}
                style={{
                overflow: 'hidden',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                height: 160,
                backgroundColor: Colors.secondary,
            }}>
                <Image style={{width: 80, height: 80}} source={require('../assets/images/app_logo.png')}/>
                <Title size={18} label={'Vet Book'} bold={true} color={Colors.white}/>
            </ImageBackground>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props}/>
            </DrawerContentScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
});

export default CustomDrawerContent;
