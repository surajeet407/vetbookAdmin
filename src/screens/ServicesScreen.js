import React, {useRef, useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Animated,
    Dimensions,
    ImageBackground,
    RefreshControl
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import GeneralHeader from '../reusable_elements/GeneralHeader';
import ServiceScreenLoader from '../reusable_elements/ServiceScreenLoader';
import Colors from '../util/Colors';
import {SwipeListView} from 'react-native-swipe-list-view';
import Title from '../reusable_elements/Title';
import database from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import Icon, {Icons} from '../util/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Rating} from 'react-native-ratings';
import i18n from '../util/i18n';
import {Button, Chip} from 'react-native-paper'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import Constants from '../util/Constants';

const width = Dimensions
    .get('screen')
    .width - 50;

const ServicesScreen = ({navigation, route}) => {
    const filters = [{
        key: "ongoing",
        text: "Ongoing"
    },{
        key: "cancelled",
        text: "Cancelled"
    },{
        key: "completed",
        text: "Completed"
    }]
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false);
    const [loading,
        setLoading] = useState(true)
    const [pickerValue, 
        setPickerValue] = useState("");
    const [catIndex,
        setCatIndex] = useState(0);
    const [pastServices,
        setPastServices] = useState([])
    const reOrder = () => {}

    const getDataFromDatabase = () => {
        database()
            .ref("/allServices")
            .once('value')
            .then(snapshot => {
                setLoading(false)
                setRefreshing(false)
                if (snapshot.val()) {
                    let ar = []
                    for(let i = 0; i < snapshot.val().length; i++) {
                        if(snapshot.val()[i].mode === 'ongoing') {
                            ar.push(snapshot.val()[i])
                        }
                    }
                    setPastServices(ar)
                }
            })
    }
    
    const handleCustomIndexSelect = (index) => {
        setLoading(true)
        setCatIndex(index)
        setPickerValue("")
        getDataFromDatabase();
    }
    const onRefresh = () => {
        setRefreshing(true)
        getDataFromDatabase();
    }

    useEffect(() => {
        if (isFocused) {
            getDataFromDatabase();
        }
    }, [isFocused])
    return (
        <View
            style={{
            flex: 1,
            backgroundColor: Colors.appBackground
        }}>
            {loading?
            <View style={{paddingHorizontal: 20}}>
                <ServiceScreenLoader/>
            </View>
            :
            <FlatList
                refreshControl={<RefreshControl progressViewOffset={20} colors={[Colors.primary, Colors.secondary]} refreshing={refreshing} onRefresh={onRefresh} />}
                ListEmptyComponent={
                    <View style={{alignItems: 'center', marginTop: 20}}>
                        <Title label="No service requests are found..." size={20} color={Colors.darkGray}/>
                    </View>
                }
                showsVerticalScrollIndicator={false}
                data={pastServices}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => {
                return (
                    <Animatable.View
                        delay={50 * index}
                        animation={'slideInLeft'}
                        style={{
                        backgroundColor: Colors.appBackground,
                        marginHorizontal: 20,
                        marginVertical: 10,
                        padding: 10,
                        elevation: 5
                    }}>
                        <View
                            style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Title size={20} label={item.serviceType} bold={true} color={Colors.darkGray}/>
                            <Title
                                size={18}
                                label={"Price: " + item.total + "/-"}
                                bold={true}
                                color={Colors.secondary}/>
                        </View>
                        <View
                            style={{
                            marginTop: 5,
                            marginBottom: 10
                        }}>
                            <View>
                                    <View
                                        style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Title size={15} label={"Booked On:"} bold={true} color={Colors.darkGray}/>
                                        <View
                                            style={{
                                            marginLeft: 5
                                        }}>
                                            <Title size={15} label={item.orderedOn} bold={true} color={Colors.secondary}/>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Title size={15} label={"Status:"} bold={true} color={Colors.darkGray}/>
                                        <View
                                            style={{
                                            marginLeft: 5
                                        }}>
                                            <Title size={15} label={'Ongoing'} bold={true} color={Colors.yellow}/>
                        
                                        </View>
                                    </View>
                                    
                            </View>
                        </View>
                        <View style={{
                                    borderTopColor: Colors.darkGray,
                                    borderTopWidth: 1,
                                    padding: 5}}>
                                    <View
                                        style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginTop: 5
                                    }}>
                                        <View
                                            style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Title size={14} label={'Time Slot:  ' + item.timeSlot.startTime + " - " + item.timeSlot.endTime} bold={true} color={Colors.secondary}/>
                                        </View>
                                        <Button
                                            labelStyle={{
                                            color: Colors.white,
                                            fontFamily: 'PTSerif-Bold'
                                        }}
                                            color={Colors.green3}
                                            mode="contained"
                                            onPress={() => onPressCancel(item, item.serviceType)}>Details</Button>
                                    </View>
                                </View>
                    </Animatable.View>
                )
            }}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    backTextWhite: {
        color: Colors.appBackground
    },
    rowBack: {
        flex: 1
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 5,
        justifyContent: 'center',
        position: 'absolute',
        top: 5,
        width: 75,
        backgroundColor: 'green',
        right: 10,
        borderRadius: 15,
        overflow: 'hidden'
    }
});

export default ServicesScreen;
