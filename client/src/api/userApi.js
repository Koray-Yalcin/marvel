import axios from 'axios';

const baseURL = axios.create({
    baseURL: 'http://localhost:5000/users/'
});

export const signup = async (registerValues) => {
     return await baseURL.post('signup/', registerValues);
}

export const signin = async (loginValues) => {
    return await baseURL.post('signin/', loginValues);
}