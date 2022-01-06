// import axios from 'axios';
import axios from '../http-common'
import store from '../store'
let LOCAL_STORAGE_VARIABLE = 'loggedInUserDataEntryApp';

class AuthenticationService {
    
    userLogin(username = null, password = null) {
        return axios.post('/authenticate', { username, password });
    }
    registerUserLogin(username, JWTtoken) {
        store.dispatch('registerUser', {
            username: username,
            token: JWTtoken
        });
        localStorage.setItem(LOCAL_STORAGE_VARIABLE, JSON.stringify({ username: username, token: JWTtoken }));
        this.APIinterceptors(this.getAuthToken(JWTtoken));
    }
    getAuthToken(token) {
        return 'Bearer ' + token;
    }
    logout() {
        store.dispatch('logOutUser');
        localStorage.removeItem(LOCAL_STORAGE_VARIABLE);
    }
    getUserLoggedIn() {
        console.log("Inside getUserLoggedIn");
        let user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_VARIABLE));
        if(user == null) return '';
        else return user;
    }
    APIinterceptors(authToken) {        
        axios.interceptors.request.use((config) => {
            // Do something before request is sent
            console.log("API Interceptor called!", JSON.parse(localStorage.getItem(LOCAL_STORAGE_VARIABLE)));
            if(store.state.user) {
                config.headers.Authorization = authToken;
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