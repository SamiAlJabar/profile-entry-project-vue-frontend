// import axios from 'axios';
import axios from '../http-common'
import store from '../store'

class AuthenticationService {
    
    userLogin(username = null, password = null) {
        return axios.get('/basicauth', {
            headers: {
                Authorization: this.getBasicAuthToken(username, password)
            }
        });
    }
    registerUserLogin(username, password) {
        store.dispatch('registerUser', {
            username: username,
            token: this.getBasicAuthToken(username, password)
        });
        localStorage.setItem('loggedInUserDataEntryApp', username);
        this.APIinterceptors(store.getters.getUserInfo.token);
    }
    getBasicAuthToken(username, password) {
        let basicAuthHeader = 'Basic ' + btoa(username + ':' + password);
        return basicAuthHeader;
    }
    logout() {
        store.dispatch('logOutUser');
        localStorage.removeItem('loggedInUserDataEntryApp');
    }
    getUserLoggedIn() {
        console.log("Inside getUserLoggedIn");
        let user = localStorage.getItem('loggedInUserDataEntryApp');
        if(user == null) return '';
        else return user;
    }
    APIinterceptors(basicAuthHeader) {        
        axios.interceptors.request.use((config) => {
            // Do something before request is sent
            console.log("API Interceptor called!", config);
            if(store.state.user) {
                config.headers.Authorization = basicAuthHeader;
            }
            return config;
        }, (error) => {
            // Do something with request error
            return Promise.reject(error);
        });
        // axios.interceptors.response.use(function (response) {
        //     // Any status code that lie within the range of 2xx cause this function to trigger
        //     // Do something with response data
        //     return response;
        // }, function (error) {
        //     // Any status codes that falls outside the range of 2xx cause this function to trigger
        //     // Do something with response error
        //     return Promise.reject(error);
        // });
    }
}

export default new AuthenticationService();