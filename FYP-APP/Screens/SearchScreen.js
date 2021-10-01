import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ScrollView} from 'react-native'
import { Tab, Header } from 'react-native-elements';
import COLORS from '../consts/color';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, AntDesign, EvilIcons } from '@expo/vector-icons';
import SearchCard from '../Components/SearchCard';
import { useSelector, useDispatch } from 'react-redux';
import MapScreen from './MapScreen';


const SearchScreen = ({navigation}) => {
    
    const [inputValue, setinputValue] = useState('');
    const [selected, setselected] = useState(null)
    const [search, setsearch] = useState({
        searchByName:true,
        searchByLoc:false
    })
    const salons = useSelector(state => state.salon.salons)

    const searchHandler = () => {
        console.log(salons)
        const searchSalons = salons.find((item) => item.name === inputValue)
        console.log("Searched Salon", searchSalons)
        setselected(searchSalons);
    }
    
    return (
        // <View style={{marginTop:20}}>

        //     { search.searchByName ?

        //         <View style={{flexDirection:'row', alignContent:'center' , alignItems:'center', justifyContent:'space-between', marginHorizontal:20,
        //         paddingVertical:10, paddingHorizontal:20, borderRadius:5, backgroundColor:COLORS.gray
        //         }}>

        //         <TextInput style={{fontSize:18, color:'black'}} 
        //             value={inputValue}
        //             onChangeText={setinputValue}
        //             placeholder='Search' 
        //         />
        //         <TouchableOpacity onPress={searchHandler} style={{backgroundColor: COLORS.primary, padding: 8, borderRadius:20}}>
        //             <Ionicons name="search" size={20} color={COLORS.white} />
        //         </TouchableOpacity>
        //         </View>: null
            
        //     }
            
    

        //         <View style={{flexDirection:'row'}}>
        //             <TouchableOpacity 
        //                 style={[styles.searchButton, search.searchByName? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:''] } 
        //                 onPress={()=>{setsearch({searchByName:true, searchByLoc:false})}}>
        //                 <Text style={{textTransform:'uppercase',color:COLORS.primary, fontSize:14,marginVertical:20,fontWeight:'bold' }}>
        //                     Search by name
        //                 </Text>
                        
        //             </TouchableOpacity>

        //             <TouchableOpacity 
        //                 style={[styles.searchButton, search.searchByLoc? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:'']} 
        //                 onPress={()=>{setsearch({searchByName:false, searchByLoc:true}) }}>
        //                 <Text style={{textTransform:'uppercase',  marginVertical:20, color:COLORS.primary, fontSize:14, fontWeight:'bold'}}>
        //                     Search by place
        //                 </Text>
        //             </TouchableOpacity>
        //         </View>
        //         <View>

        //         {search.searchByName ? 
        //             selected ?
        //             //  <FlatList
        //             //  data={selected}
        //             //  renderItem={()=>console.log("Hllo")}/> 
        //             <SearchCard item={selected} />
        //              : 
        //              <Text>No salon seleted yets</Text>
        //              : 
        //              <MapScreen />
        //         }
           
                   
        //         </View>


                
  
        
        //</View>
        <View style={{marginTop:20}}>
            
                <View style={{flexDirection:'row', alignContent:'center' , alignItems:'center', justifyContent:'space-between', marginHorizontal:20,
                    paddingVertical:10, paddingHorizontal:20, borderRadius:5, backgroundColor:COLORS.gray
                }}>
                    
                    <TextInput style={{fontSize:18, color:'black'}} 
                        value={inputValue}
                        onChangeText={setinputValue}
                        placeholder={search.searchByName? "Enter salon name": "Enter service name"}
                        
                    />
                    { search.searchByName ?
                     (  <TouchableOpacity onPress={searchHandler} style={{backgroundColor: COLORS.primary, padding: 8, borderRadius:20}}>
                            <Ionicons name="search" size={20} color={COLORS.white} />
                        </TouchableOpacity>) 
                    :

                     (<TouchableOpacity style={{backgroundColor: COLORS.primary, padding: 8, borderRadius:20}}>
                        <Ionicons name="search" size={20} color={COLORS.white} />
                        
                    </TouchableOpacity>)
                    }
                   
                    
                </View>

                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity 
                        style={[styles.searchButton, search.searchByName? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:''] } 
                        onPress={()=>{setsearch({searchByName:true, searchByLoc:false})}}>
                        <Text style={{textTransform:'uppercase',color:COLORS.primary, fontSize:14,marginVertical:20,fontWeight:'bold' }}>
                            Search by name
                        </Text>
                        
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.searchButton, search.searchByLoc? {borderBottomWidth: 2, borderBottomColor:COLORS.primary}:'']} 
                        onPress={()=>{setsearch({searchByName:false, searchByLoc:true})}}>
                        <Text style={{textTransform:'uppercase',  marginVertical:20, color:COLORS.primary, fontSize:14, fontWeight:'bold'}}>
                            Search by Service
                        </Text>
                    </TouchableOpacity>
                </View>
           

                <View>

                    {search.searchByName ? 
                            selected ?
                            //  <FlatList
                            //  data={selected}
                            //  renderItem={()=>console.log("Hllo")}/> 
                            <SearchCard item={selected} />
                            : 
                            <Text style={{ flexDirection:'row',justifyContent:"center", color:COLORS.primary, alignItems:"center"}}>No salon searched yet</Text>
                            : 
                            selected ?    <SearchCard item={selected} />
                            : 
                            <Text style={{ flexDirection:'row',justifyContent:"center", color:COLORS.primary, alignItems:"center"}}>No salon searched yet</Text>
                           
                        }
                
                        
                </View>



                
  
        
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({

    container: {
       paddingHorizontal: 5,
        flexDirection:'row',
  
      

    },
    input:{
        fontSize:18,
        width:'75%',
        paddingHorizontal:15,
        height:40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:20,
        marginTop: 30,
        backgroundColor:COLORS.light

        

    },
    btnPrimary: {
        backgroundColor: COLORS.primary,
        height: 40,
        width:'25%',
        
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom:20,
        marginTop: 30,
    },

    searchButton:{
        width:'50%', justifyContent:'center', alignItems:'center',
        
       
    }
})
