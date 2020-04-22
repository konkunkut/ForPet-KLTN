import axios from 'axios';
import {API_URL} from '../config';

export const uploadBlogs=(formData, token)=>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.post(`${API_URL}/News/createNews`,formData, config )
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getAllBlogs=(page)=>{
    return axios.get(`${API_URL}/News/getAllNews/`+page)
                .then(res=>{
                    // console.log("thành cÔng");
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getTotalBlogs=()=>{
    return axios.get(`${API_URL}/News/getNewsTotal`)
                .then(res=>{
                    // console.log("thành cÔng");
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getNewestNews=()=>{
    return axios.get(`${API_URL}/News/getNewNews`)
                .then(res=>{
                    // console.log("thành cÔng");
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getNewHomepage=()=>{
    return axios.get(`${API_URL}/News/getNewsLimit`)
                .then(res=>{
                    // console.log("thành cÔng");
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getDetailNews=(idNews)=>{
    return axios.get(`${API_URL}/News/getDetailNews/`+idNews)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const updateView=(idNews)=>{
    return axios.put(`${API_URL}/News/upDateView/`+idNews)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}

export const getUserBlogs=(token)=>{
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }
    return axios.get(`${API_URL}/News/getUserBlogs`,config)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log(err);
                })
}