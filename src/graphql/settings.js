export const URL = `http://localhost:4000`;

const method = 'POST'

const TOKEN = (token) => {
    return token && { 'Authorization': `Bearer ${token}` }
}

const JSON_HEAD = (token) => ({
    'Content-Type': 'application/json',
    ...(token && TOKEN(token))
})

const MULTI_HEAD = (token) => ({
    'Accept': 'application/json',
    ...(token && TOKEN(token))
})

export const ajax = async (fetch, { query, variables, token }, isMulti) => {
    return await fetch(URL, {
        method,
        headers: isMulti ? MULTI_HEAD(token) : JSON_HEAD(token),
        body: JSON.stringify({ query, variables })
    }).then(r => r.json())
}