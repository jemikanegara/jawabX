import { JSON_OPT, URL } from './settings'

const query = `mutation { auth }`

export const tokenCheck = async (token) => {
    return await fetch(URL, {
        method: JSON_OPT.method,
        headers: { ...JSON_OPT.headers, 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            query
        })
    })
        .then(r => r.json())
        .then(res => res)
        .catch(err => console.log(err))
}