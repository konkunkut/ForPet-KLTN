import axios from 'axios';
import {API_URL} from '../config';

export function signUp(body){
    return axios.post( `${API_URL}/user/singup`, body)
                .then(res =>{
                    // console.log(res.data);
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                    return err
                })
}

export function loginGoogle(body){
    // const config = {
    //     headers: {
    //         'Access-Control-Allow-Origin': 'http://localhost',
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //       }
    // }

    return axios.post(`${API_URL}/user/signGoogle`,body)
                .then(res=>{
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                    return err
                })
}

export function logIn (body)
{
    return axios.post(`${API_URL}/user/singin`, body)
                .then(res =>{
                    // console.log(res.data);
                    return res.data
                })
                .catch(err=>{
                    console.log(err);
                    return err
                })
}

export function saveSessionStorage(data)
{
    // console.log(data);
    sessionStorage.setItem("token", data.data.token);
    sessionStorage.setItem("userID", data.data.userID);
    sessionStorage.setItem("firstName", data.data.firstName);
    sessionStorage.setItem("lastName", data.data.lastName);
    sessionStorage.setItem("isLocal", data.data.isLocal);
    const filePath = `${API_URL}` + data.data.avatar;
    sessionStorage.setItem("userAvatar", filePath);
}
