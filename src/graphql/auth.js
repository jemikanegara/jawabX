import { ajax } from './settings'
import { auth } from "../stores/auth.js";

const query = `mutation { auth }`

export const tokenCheck = async () => {
    const token = localStorage.getItem("token");
    const res = await ajax(fetch, { query, token });
    
    let response;
    if (res.data && res.data.auth) {
        auth.set(true);
    }
    return response;
}