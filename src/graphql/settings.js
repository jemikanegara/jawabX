export const URL = `http://localhost:4000`;

const method = 'POST'

export const JSON_OPT = {
    method,
    headers: {
        'Content-Type': 'application/json'
    }
}

export const MULTI_OPT = {
    method,
    headers: {
        'Accept': 'application/json'
    }
}