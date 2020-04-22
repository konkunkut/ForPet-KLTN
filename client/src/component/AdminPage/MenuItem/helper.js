import {API_URL} from '../../../config';
import axios from 'axios';

export const getAllPlaces_ad=()=>{
    return axios.get(`${API_URL}/Places/getAllPlaces_ad`)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getDeletedPlaces=()=>{
    return axios.get(`${API_URL}/Places/getDeletedPlaces`)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getAllUser=()=>{
    return axios.get(`${API_URL}/user/getAllUser_ad`)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getAllNews_ad=()=>{
    return axios.get(`${API_URL}/News/getAllNews_ad`)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const deletePlaces_ad=(id_place)=>{
    return axios.put(`${API_URL}/Places/deletePlaces_ad/`+id_place)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const deleteNews=(id_News)=>{
    return axios.put(`${API_URL}/News/deleteNews/`+id_News)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}