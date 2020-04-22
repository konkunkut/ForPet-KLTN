import axios from 'axios';
import API_URL from '../config';
import {TEMP_INFO, TEMP_PICS, TEMP_latLng} from './constants'

export const storeTempData = (
                            typeplace,
                            nameplace,
                            tels,
                            stresses,
                            districts,
                            cities,
                            decriptions,
                            ) => dispatch => {
                                const typePlace = typeplace;
                                const namePlace = nameplace;
                                const tel = tels;
                                const stress = stresses;
                                const district = districts;
                                const city = cities;
                                const decription = decriptions;
                                dispatch({
                                    type : TEMP_INFO,
                                    payload : {typePlace, namePlace, tel, stress, district, city, decription}
                                })
}

export const storeTempPic = (pics) => dispatch => {
    const pic = pics;
    dispatch({
        type : TEMP_PICS,
        payload : {pic}
    })
}

export const storeTemplatLng = (latValue, lngValue)=> dispatch =>{
    const lat = latValue;
    const lng = lngValue;
    dispatch({
        type : TEMP_latLng,
        payload : {lat, lng},
    });
}
