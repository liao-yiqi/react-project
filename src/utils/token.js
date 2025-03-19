const TOKEN_KEY = 'token_key'

export const SET_TOKEN = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token)
}

export const GET_TOKEN = () => {
    return sessionStorage.getItem(TOKEN_KEY)
}

export const REMOVE_TOKEN = () => {
    return sessionStorage.removeItem(TOKEN_KEY)
}