import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import COLORS from '../consts/color';
import Home from '../Screens/Home';
import Profile from '../Screens/Profile'
import SalonDetail from '../Screens/SalonDetail'
import Appointments from '../Screens/Appointments'
import Favorite from '../Screens/Favorite'
import StackRoute from './StackRoute';
import StackAuth from './StackAuth';
import DrawerContent from "./DrawerContent";
import { AntDesign, Feather, Foundation } from '@expo/vector-icons';
import setAuthToken from "../util/setAuthToken";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifications from '../Screens/Notifications'
import { useSelector, useDispatch } from 'react-redux';


//redux



import {loadUser} from '../redux/actions/auth'
import {register} from '../redux/actions/auth';


const Drawer = createDrawerNavigator();



function DrawerRouter() {
    const auth = useSelector(state => state.auth.isAuthenticated)
    console.log(auth)


    return (
        (auth) ?
        
        (<NavigationContainer>
            <Drawer.Navigator initialRouteName={StackRoute} drawerContent={(props)=><DrawerContent {...props} />} drawerContentOptions={{
            activeTintColor: 'white',
            activeBackgroundColor: COLORS.primary,
            inactiveTintColor: 'black',
            
            labelStyle:{
                marginLeft:0,
                padding:0,
                fontSize:16,
                fontWeight:'100'
            },
            itemStyle:{
                padding:0,
                fontSize:16
            }
            }}>
            <Drawer.Screen name="Home" component={StackRoute} 
                options = {{
                drawerIcon: ({focused, size}) => (
                    <AntDesign name="home" size={24} color={focused ? COLORS.white : COLORS.primary} />
                ),
                }}
            />
                <Drawer.Screen name="Favorites" component={Favorite} 
                options={{
                drawerIcon: ({focused, size}) => (
                    <AntDesign name="hearto" size={24} color={focused ? COLORS.white : COLORS.primary} />
                ),
                }}
            />
            <Drawer.Screen name="Appointments" component={Appointments} 
                    options={{
                    drawerIcon: ({focused, size}) => (
                    <Foundation name="page-multiple" size={24} color={focused ? COLORS.white : COLORS.primary}/>
                ),
                }}
            />
            <Drawer.Screen name="Notifications" component={Notifications} 
                options={{
                drawerIcon: ({focused, size}) => (
                    <Feather name="bell" size={24} color={focused ? COLORS.white : COLORS.primary} />
                ),
                }}
            />

            <Drawer.Screen name="Profile" component={Profile} 
                options={{
                drawerIcon: ({focused, size}) => (
                    <Feather name="user" size={24} color={focused ? COLORS.white : COLORS.primary} />
                ),
                }}
            />
            
            </Drawer.Navigator>

        </NavigationContainer>):
        
        (<StackAuth />) 
    )
}



export default DrawerRouter
