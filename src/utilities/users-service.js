import * as usersAPI from './users-api';

export async function signUp(userData) {
    const token = await usersAPI.signUp(userData)
    localStorage.setItem('token', token);
    return getUser()
}

export async function login(userData) {
    const token = await usersAPI.login(userData)
    localStorage.setItem('token', token);
    return getUser()
}

export function getUser() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function getToken() {
    const token = localStorage.getItem('token');

    if (!token) return null;
    // 1, the second position, bc 
    // that is where the actual payload is
    // in the string
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        return null;
    }

    return token;
}

export function checkToken() {
    // Just so that you don't forget how to use .then
    return usersAPI.checkToken()
        // checkToken returns a string, but let's 
        // make it a Date object for more flexibility
        .then(dateStr => new Date(dateStr));
}

export function logOut() {
    localStorage.removeItem('token')
}