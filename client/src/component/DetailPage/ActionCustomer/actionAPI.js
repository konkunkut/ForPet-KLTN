import axios from 'axios';
import {API_URL} from '../../../config';
import {CONFIG_NAME} from '../../../action/constants';

export function getProfile(token){
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.get(`${API_URL}/user/ViewProfile`,config)
                .then(res =>{
                    //console.log(res.data);
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                    return err
                });
}

export const editProfile = (body,token) => dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.put(`${API_URL}/user/editUserProfile`,body,config)
                .then(res =>{
                    dispatch({
                        type : CONFIG_NAME,
                        payload : {lastName: res.data.data.lastName, firstName: res.data.data.firstName}
                    })
                    //console.log(res.data);
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                    return err
                })
}