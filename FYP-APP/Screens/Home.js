import React, {useEffect} from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image, ScrollView, ImageBackground, ActivityIndicator} from 'react-native'
import { Avatar } from 'react-native-elements';
import { FAB } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../consts/color';
import { StatusBar } from 'expo-status-bar';
import services from '../consts/services';
import Service from "../Components/Service";
import Card from "../Components/Card";
import salons from '../consts/salon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { fetchSalons } from '../redux/actions/salon';



const Home = ({navigation }) => {

    const dispatch = useDispatch()
    const salon = useSelector(state => state.salon);
    console.log("State", salon)

    useEffect(() => {
        // (async function() {
        //     try {
        //         const res = await axios.get(`http://192.168.0.108:5000/api/user/getSalons`);
        //         console.log(res)
        //     } catch (err) {
        //         console.error(err);
        //     }
        // })
        // ();
        dispatch(fetchSalons())
    }, []);
    if(salon?.loading){
        return(
            <View style={[styles.container, styles.horizontal]}>
                 <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    }
    return (
        <ScrollView style={{flex:1, backgroundColor: COLORS.white,}}>
            <StatusBar backgroundColor={COLORS.primary} style='light' />
                {/* <ImageBackground style={styles.headerImage} source={require('../assets/')}> */}

                    <View style={{ flexDirection:'row', justifyContent:'space-between', marginTop:30, alignItems:'center'}}>
                        <View style={{flexDirection:'row' , alignItems:'center'}}>
                            <View style={{marginLeft:20}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontSize:30, fontWeight:'bold', color:COLORS.light}}>
                                        Hi
                                    </Text>
                                    <Text style={{fontSize:30, fontWeight:'bold', color:COLORS.primary, marginLeft:10}}>
                                        Haris
                                    </Text>
                                </View>
                            

                                <Text style={{ color:COLORS.light, fontSize:16}}>
                                    Lets make your hair attractive 
                                </Text>
                            </View>
                        </View>
                    
                        {/* <View style={{marginHorizontal:20}}>
                            <Ionicons name="notifications" size={26} color={COLORS.primary} />
                        </View> */}
                        
                    </View>
                {/* </ImageBackground> */}

            <TouchableOpacity activeOpacity={0.5} style={{marginTop: 30,}} onPress={()=>navigation.navigate('SearchScreen')} >
                <View style={{flexDirection:'row', alignContent:'center' , alignItems:'center', marginHorizontal:20,
                    paddingVertical:15, paddingHorizontal:20, borderRadius:30, backgroundColor:COLORS.gray
                }}>
                    <Ionicons name="search" size={20} color={COLORS.dark} style={{ marginRight:10 }} />
                    <Text style={{fontSize:18, color:COLORS.light}}>Search</Text>
                </View>
            </TouchableOpacity>

            {/* <View>
                <FlatList
                        data={services}
                        renderItem={(item)=><Service item={item} />}
                        keyExtractor={item=>item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        

                    />
                
            </View> */}

            
                    <FlatList
                        data={salon.salons}
                        renderItem={(item)=><Card items={item} />}
                        keyExtractor={item=>item._id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        

                    />

                    <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal: 20, marginTop:20}}>
                        <Text style={{fontWeight:'bold', color: COLORS.light }}>
                            Top Rated Salons
                        </Text>
                    </View>

                    <FlatList
                        data={salons}
                        renderItem={(item)=><Card items={item} />}
                        keyExtractor={item=>item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        

                    />
                    
           

        </ScrollView>
    )
}


const styles = StyleSheet.create({

    headerImage:{
        height:350,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        overflow: 'hidden',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
      },
})



export default Home


