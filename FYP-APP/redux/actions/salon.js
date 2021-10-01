import axios from 'axios';
import {FETCH_SUCCESS, FETCH_FAIL} from './types';



export const fetchSalons =()=> async dispatch=>{
    try {
        const res = await axios.get(`http://192.168.0.108:5000/api/user/getSalons`);
        if(res){
            dispatch({
                type:FETCH_SUCCESS,
                payload: res.data
            
            })
        }
    } catch (err) {
        console.error(err);
        dispatch({
            type:FETCH_FAIL,
        
        })
    }
}