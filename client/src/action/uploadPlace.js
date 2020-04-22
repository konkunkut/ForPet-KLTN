import axios from 'axios';
import {API_URL} from '../config';

import {VALID_AVATAR} from './constants';

export function updateAvatar(formData,token){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.put(`${API_URL}/user/updateAvatar`, formData, config)
                .then(res =>{
                    // console.log(res.data);
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                    return err
                });
}

export const validAvatar = (token)=> dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.get(`${API_URL}/user/ViewAvatar`,config)
                .then(res =>{
                    const filePath = `${API_URL}` + res.data.data.avatar;
                    dispatch({
                        type : VALID_AVATAR,
                        payload : {avatar : filePath}
                    })
                    console.log(res.data);
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                    return err
                });
}

export function registerPlace(formData, token){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.post(`${API_URL}/Places/createPlace`,formData, config)
                .then(res =>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                    return err;
                });
}

export function editPlace(id_Place, formData, token){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.put(`${API_URL}/Places/editPlace/`+id_Place, formData, config)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                    return err;
                })
}
