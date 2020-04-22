import {
    CONFIG_NAME,
    TEMP_INFO,
    TEMP_PICS,
    VALID_AVATAR,
    STORE_ID_PLACE,
    TEMP_latLng,
    LOGIN_SUCCESS,
    CONFIM_LOGOUT,
} from '../action/constants';

const identifyData = {
    // isLastName : null,
    // isFirstName : null
    fullName: {},
    tempData: {},
    tempPics:[],
    valid : {},
    storeIdPlace: null,
    templatLng : {},
    checkLogin : false,
}

export default function(state = identifyData, action) {
    switch(action.type){
        case CONFIG_NAME:
            return{
                ...state,
                fullName: action.payload
            }
        case TEMP_INFO:
            return{
                ...state,
                tempData: action.payload
            }
        case TEMP_PICS:
            return{
                ...state,
                tempPics: action.payload
            }
        case VALID_AVATAR:
            return{
                ...state,
                valid: action.payload
            }
        case STORE_ID_PLACE:
            return{
                ...state,
                storeIdPlace : action.payload
            }
        case TEMP_latLng:
            return{
                ...state,
                templatLng : action.payload
            }
        case LOGIN_SUCCESS:
            return{
                ...state,
                checkLogin : true
            }
        case CONFIM_LOGOUT:
            return{
                ...state,
                checkLogin : false
            }
        default:
            return state;
    }
}