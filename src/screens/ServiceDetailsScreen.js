import React, {useRef, useState, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Linking,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity,
    Animated,
    Dimensions,
    ImageBackground,
    RefreshControl
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import ServiceScreenLoader from '../reusable_elements/ServiceScreenLoader';
import GeneralHeader from '../reusable_elements/GeneralHeader';
import SectionBanner from '../reusable_elements/SectionBanner';
import FormElement from '../reusable_elements/FormElement';
import Button from '../reusable_elements/Button';
import Colors from '../util/Colors';
import Title from '../reusable_elements/Title';
import database from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import Icon, {Icons} from '../util/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {Rating} from 'react-native-ratings';
import i18n from '../util/i18n';
import SegmentedControlTab from 'react-native-segmented-control-tab'
import Constants from '../util/Constants';

const ServiceDetailsScreen = ({navigation, route}) => {
    const isFocused = useIsFocused();
    const status = ['ongoing', 'completed'];
    const trackStatus = ["Service Confirmed", "Assigning to Doctor", "Doctor is on the way", "Service provided"]
    const [details,
        setDetails] = useState(route.params.item)
    const [checked, setChecked] = useState("true");

    const onPressStatus = (index) => {
        setChecked((status[index]));
    }

    const onPressTrackStatus = () => {

    }

    useEffect(() => {
        if (isFocused) {}
    }, [isFocused])
    return (
        <View
            style={{
            flex: 1,
            backgroundColor: Colors.appBackground
        }}>
            <GeneralHeader
                showRigtIcon={true}
                rightIconType={Icons.MaterialIcons}
                rightIconName={'phone'}
                rightIconSize={30}
                rightIconColor={Colors.white}
                rightIconBackgroundColor={Colors.primary}
                onPressRight={() => Linking.openURL('tel:' + details.userStatus === "loggedIn"? details.phoneNo:details.address.phoneNo)}
                subHeaderText={'Time Slot:  ' + details.timeSlot.startTime + " - " + details.timeSlot.endTime}
                showSubHeaderText={true}
                subHeaderTextSize={20}
                subHeaderTextColor={Colors.secondary}
                position={'relative'}
                headerHeight={120}
                headerText={"Details"}
                headerTextSize={25}
                headerTextColor={Colors.primary}
                showHeaderText={true}
                showLeftIcon={true}
                leftIconType={Icons.MaterialIcons}
                leftIconName={'navigate-before'}
                leftIconSize={35}
                leftIonColor={Colors.black}
                leftIconBackgroundColor={Colors.appBackground}
                onPressLeft={() => navigation.goBack()}/>
            <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
                <View style={{
                    paddingHorizontal: 20,
                    marginBottom: 80
                }}>
                    <SectionBanner
                        title={"Address details"}
                        borderWidth={80}
                        fontSize={16}
                        borderColor={Colors.white}
                        titleColor={Colors.white}/>
                    <View
                        style={{
                        width: "90%",
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5
                    }}>
                        <Title size={15} label={"address:"} bold={true} color={Colors.darkGray}/>
                        <View style={{
                            marginLeft: 5
                        }}>
                            <Title size={15} label={details.address.address} bold={true} color={Colors.secondary}/>
                        </View>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Title size={15} label={"Floor:"} bold={true} color={Colors.darkGray}/>
                        <View style={{
                            marginLeft: 5
                        }}>
                            <Title size={15} label={details.address.floor} bold={true} color={Colors.secondary}/>
                        </View>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Title size={15} label={"Nearby:"} bold={true} color={Colors.darkGray}/>
                        <View style={{
                            marginLeft: 5
                        }}>
                            <Title size={15} label={details.address.nearby} bold={true} color={Colors.secondary}/>
                        </View>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Title size={15} label={"Person Name:"} bold={true} color={Colors.darkGray}/>
                        <View style={{
                            marginLeft: 5
                        }}>
                            <Title size={15} label={details.address.name} bold={true} color={Colors.secondary}/>
                        </View>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 10
                    }}>
                        <Title size={15} label={"Phone No:"} bold={true} color={Colors.darkGray}/>
                        <View style={{
                            marginLeft: 5
                        }}>
                            <Title size={15} label={details.userStatus === "loggedIn"? details.phoneNo:details.address.phoneNo} bold={true} color={Colors.secondary}/>
                        </View>
                    </View>
                    <SectionBanner
                        title={"Pet Details"}
                        borderWidth={50}
                        fontSize={16}
                        borderColor={Colors.white}
                        titleColor={Colors.white}/>
                        {details.petDetails.map((item, index) => 
                        <View
                            style={{
                            width: "90%",
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 5
                        }}>
                            <Title size={15} label={item.name + ":"} bold={true} color={Colors.darkGray}/>
                                <View style={{
                                    marginLeft: 5
                                }}>
                                <Title size={15} label={item.value} bold={true} color={Colors.secondary}/>
                            </View>         
                        </View>
                    )}
                    <View style={{marginTop: 10}}>
                        <SectionBanner
                            title={"Update Status"}
                            borderWidth={70}
                            fontSize={16}
                            borderColor={Colors.white}
                            titleColor={Colors.white}/>
                        <FormElement defaultSelection={0} onPressToken={onPressStatus} tokens={status}  showLabel={true} title='status' type='token' labelColor={Colors.secondary}/>
                        <FormElement onPressToken={onPressTrackStatus} tokens={trackStatus}  showLabel={true} title='Update Track Step' type='token' labelColor={Colors.secondary}/>
                    </View>
                </View>
            </ScrollView>
            <Animatable.View delay={100} animation={'slideInUp'}>
                <ImageBackground
                    blurRadius={0}
                    source={require('../assets/images/background6.png')}
                    style={{
                    overflow: 'hidden',
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    height: 80,
                    backgroundColor: Colors.primary,
                    borderTopLeftRadius: 50,
                    elevation: 15,
                    borderTopRightRadius: 50
                }}>
                    <View style={{
                        width: '90%'
                    }}>
                        <Button
                            backgroundColor={Colors.green3}
                            iconPostionRight={true}
                            useIcon={true}
                            icon='long-arrow-right'
                            title="Update"/>
                    </View>
                </ImageBackground>
            </Animatable.View>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ServiceDetailsScreen;
