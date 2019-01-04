import axios from 'axios';

// These configurations will override those in index.js but it won't inherit the interceptors
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

// Just taking same from index.js but using instance instead of axios
instance.defaults.headers.common['Authorization'] = 'INSTANCE TOKEN';
// but notice none of the interceptors are hooked to this one. We can re-implement them though

instance.interceptors.request.use(requestConfig => {
    console.log('instance req', requestConfig);
    // Could edit the config here.
    return requestConfig;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

instance.interceptors.response.use(response => {
    console.log('instance res', response);
    // Could edit response here.
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
})

export default instance;