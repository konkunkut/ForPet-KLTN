import {API_URL} from '../config';
import axios from 'axios';
import {STORE_ID_PLACE} from './constants';

export const getAllPlaces=(page, data)=>{

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        }
    }

    const body={
        params: data
    }

    return axios.get(`${API_URL}/Places/getAllPlace/`+page, body, config)
                .then(res=>{
                    //console.log(res.data);
                    return res.data;
                })
                .catch(err=>{
                    console.log("Lỗi");
                })
}

export const getPlaceTotal=()=>{
    return axios.get(`${API_URL}/Places/getPlaceTotal`)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getUserPlaces =(token) =>{

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.get(`${API_URL}/Places/getUserPlaces`, config)
                .then(res=>{
                    // console.log("thành công");
                    return res.data
                })
                .catch(err=>{
                    console.log("Lỗi");
                })
}

export const getDetailPlaces=(id_Place)=>{
    return axios.get(`${API_URL}/Places/getDetailPlaces/`+id_Place)
                .then(res=>{
                    //console.log(res.data)
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const storeIdPlace =(id_Places)=> dispatch =>{
    const idPlace = id_Places;
    dispatch({
        type: STORE_ID_PLACE,
        payload: {idPlace}
    });
}

export const getNewestPlace=()=>{
    return axios.get(`${API_URL}/Places/getNewestPlace`)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}