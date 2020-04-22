import axios from 'axios';
import API_URL from '../config';
import { CONFIG_NAME, VALID_AVATAR, LOGIN_SUCCESS, CONFIM_LOGOUT } from './constants'


export const configName = () => dispatch => {
    const lastName = sessionStorage.getItem("lastName");
    const firstName = sessionStorage.getItem("firstName");
    dispatch({
        type: CONFIG_NAME,
        payload: { lastName, firstName }
    })
}

export const validAvatar = () => dispatch => {
    const avatar = sessionStorage.getItem("userAvatar");
    dispatch({
        type: VALID_AVATAR,
        payload: { avatar }
    })
}

export const CheckLogin = () => dispatch => {
    dispatch({
        type: LOGIN_SUCCESS,
    });
}

export const logOut = () => dispatch =>{
    dispatch({
        type: CONFIM_LOGOUT,
    });
}