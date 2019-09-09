import { JSON_OPT, URL } from './settings'
import { auth } from "../stores/auth.js";

const query = `mutation { auth }`

export const tokenCheck = async () => {
    const token = localStorage.getItem("token");
    return await fetch(URL, {
        method: JSON_OPT.method,
        headers: { ...JSON_OPT.headers, 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            query
        })
    })
        .then(r => r.json())
        .then(res => {
            let response;
            if (res.data && res.data.auth) {
                auth.set(true);
                response = true;
            }
            return response;
        })
        .catch(err => console.log(err));
}