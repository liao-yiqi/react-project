const TOKENKEY = 'token'

export const setToken = (token) => {
    localStorage.setItem(TOKENKEY, token)
}

export const getToken = () => {
    return localStorage.getItem(TOKENKEY)
}

export const clearToken = () => {
    return localStorage.removeItem(TOKENKEY)
}