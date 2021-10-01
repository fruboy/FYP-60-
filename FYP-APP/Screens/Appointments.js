import React , {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import COLORS from "../consts/color";
import BookingList from '../Components/BookingList'
import {Header} from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 

const Appointments = ({navigation}) => {
        const [search, setsearch] = useState({
        searchByName:true,
        searchByLoc:false
    })


    const Left = ({navigation}) =>{
        return(
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>)
    }

    return (
        <View>
        <Header backgroundColor={COLORS.primary} containerStyle={{height:100}}
                leftComponent={ <Left navigation={navigation} />}
               
            
        />
            <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={[styles.searchButton, search.searchByName? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:''] } onPress={()=>{}}>
                        <Text style={{textTransform:'uppercase',color:COLORS.primary, fontSize:14,marginVertical:20,fontWeight:'bold' }}>
                            Bookings
                        </Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.searchButton, search.searchByLoc? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:'']} onPress={()=>{}}>
                        <Text style={{textTransform:'uppercase',  marginVertical:20, color:COLORS.primary, fontSize:14, fontWeight:'bold'}}>
                            Past Bookings
                        </Text>
                    </TouchableOpacity>
                </View>

                <BookingList />
              
        </View>
    )
}

export default Appointments

const styles = StyleSheet.create({
       searchButton:{
        width:'50%', justifyContent:'center', alignItems:'center',
        
       
    }
})
