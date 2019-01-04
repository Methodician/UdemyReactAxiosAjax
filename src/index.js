import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'eg: TOKEN';
axios.defaults.headers.post['Content-Type'] = 'FAKE'; // Doesn't seem to do anything


axios.interceptors.request.use(requestConfig => {
    console.log('Interceptors Request ', requestConfig);
    // Could edit the config here.
    return requestConfig;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    console.log('Interceptors Response', response);
    // Could edit response here.
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
