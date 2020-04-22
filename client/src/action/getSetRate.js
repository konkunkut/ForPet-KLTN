import axios from 'axios';
import {API_URL} from '../config';

export const getAllRate = (id_place) =>{
    return axios.get(`${API_URL}/Rate/getRatePlace/`+id_place)
                .then(res=>{
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getRateOfUser = (token,id_place) =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.get(`${API_URL}/Rate/getRateUser/`+id_place, config)
                .then(res=>{
                    //console.log(res.data);
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const createRate = (token, body) =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.post(`${API_URL}/Rate/createRate`, body, config)
                .then(res=>{
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const updateRate = (token, body) =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.put(`${API_URL}/Rate/updateRate`, body, config)
                .then(res=>{
                    return res.data
                })
                .catch(err=>{  
                    console.log(err);
                })
}