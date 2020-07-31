/*
|--------------------------------------------------------------------------
| Jwt
|--------------------------------------------------------------------------
|
| The jwt authenticator works by passing a jwt token on each HTTP request
| via HTTP `Authorization` header.
|
*/

import Cookie from 'js-cookie';
import axios from 'axios';
import auth from '../config/auth';

export default class Authenticator {

    constructor(credentials = null) {

        this.credentials = credentials;
        this.authenticated = false;
        this.session = null;
        this.token = null;

    }

    static signIn = async (credentials) => {

        return axios.post(auth.authURL, credentials)
            .then((response) => response)
            .catch(error => error.response)
    }

    static isAuthenticated = () => {

        return axios.get(auth.authenticatedUrl, {
            headers: {
                Authorization: 'Bearer ' + Cookie.get('token') 
            }
        }).then((response) => {

           return console.log(response.data.data,'xablaauuuu')

        }).catch(error => console.log(error.response, 'kdopaskdoask'))
    }

    static setSession = (session, token) => {

        switch (session) {
            case 'cookie':

                const cookie = auth.cookie;
                this.authenticated = true;
                Cookie.set(cookie.key, token, { secure: cookie.secure, expires: cookie.expires });
                this.session = cookie;

                break;
            case 'localStorage':
                this.session = auth.localStorage;
            default:
                break;
        }
    }

}


