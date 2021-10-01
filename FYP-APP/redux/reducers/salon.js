import {FETCH_SUCCESS, FETCH_FAIL} from "../actions/types";
import AsyncStorage from '@react-native-async-storage/async-storage';



// setValue = async (token) => {
//     try {
//         await AsyncStorage.setItem('token', token)
//     }
//     catch (err){
//         console.log(err)
//     }
// }

const initialState = {
    loading:true,
    salons:null,
    error:null
}


export default function (state=initialState , action){
    const {type, payload} = action;
    console.log(action)

    switch(type){
        case FETCH_SUCCESS:
            return{
                ...state,
                salons:payload,
                loading: false
                
            }
        case FETCH_FAIL:
           
            return {
                ...state,
                loading:false,
                error:"Loading Fail"
            }
            
        default:
            return state
    }
}