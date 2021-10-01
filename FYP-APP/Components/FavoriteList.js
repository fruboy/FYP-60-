import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import COLORS from "../consts/color";
import salons from "../consts/salon";
import {Header} from 'react-native-elements';
import Stars from 'react-native-stars';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';

const FavoriteList = () => {

    const item = salons[0];
    return (
        <ScrollView style={{marginVertical:10, width:'100%'}} >
          <View style={{paddingHorizontal:10}}>
                <Image source={item.image} style={styles.cardImage} />
                <TouchableOpacity style={{position: 'absolute' , top: 5, right:15, backgroundColor:COLORS.white, width:40, height: 40, borderRadius:20, alignItems:'center', justifyContent:'center'}}  >
                    <AntDesign name="heart" size={24} color={COLORS.primary} />
                </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-around', width:"100%", marginTop: 6,}}>
              <View style={{marginLeft:25}}>
                  <Text style={{fontWeight: 'bold', color:COLORS.light, }}>
                      {item.name}
                  </Text>
                  <Text style={{fontSize: 17, fontWeight:'bold', color:COLORS.light, marginTop: 6}}>
                      {item.location}
                  </Text>
              </View>
              <View style={{flexDirection:'row',}}>
                    <Stars
                        display={3}
                        count={5}
                        starSize={40}
                        fullStar={<AntDesign name="star" size={20} color="orange" />}
                        emptyStar={<AntDesign name="staro" size={20} color="orange" />}
                    />
                    <Text style={{fontSize: 17, fontWeight:'bold', color:COLORS.light, marginRight:25
                    }}>
                        4.0
                    </Text>
              </View>
          </View>
            
        </ScrollView>
    )
}

export default FavoriteList

const styles = StyleSheet.create({
        cardImage: {
        height:150,
        width:'100%',
       
        
    },
})
