import axios from 'axios';
import {API_URL} from '../config';

export const createCmt = (token, body) =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.post(`${API_URL}/Comment/createComment`,body ,config)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getCmt = (id_place) =>{
    return axios.get(`${API_URL}/Comment/getPlaceComment/`+id_place)
                .then(res=>{
                    // console.log(res.data)
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getName_Pic = (id_user) =>{
    return axios.get(`${API_URL}/user/getNamePic/`+id_user)
                .then(res=>{
                    //console.log(res.data);
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const createSubCmt = (token, body) =>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.post(`${API_URL}/subComment/createSubComment`,body, config)
                .then(res=>{
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getSubCmt = (id_Comment) =>{
    return axios.get(`${API_URL}/Comment/getListSubCmt/`+id_Comment)
                .then(res=>{
                    //console.log( res.data);
                    return res.data
                })
                .catch(err=>{
                    console.log(err)
                })
}