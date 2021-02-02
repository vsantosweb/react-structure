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

    constructor(setAuth) {

        this.authenticated = false;
        this.session = null;
        this.token = null;
        this.setAuth = setAuth;

    }

    static signIn = async (credentials) => {

        return axios.post(auth.authURL, credentials)
            .then((response) => {
                Authenticator.setSession('cookie', response.data.data);
                window.location.reload();
                return response.data

            })
            .catch(error => error.response)
    }
    static signOut = async () => {

        return await axios.post(auth.logoutUrl, [], {
            headers: {
                Authorization: 'Bearer ' + Cookie.get(auth.cookie.key)
            }

        }).then((response => {
            Cookie.remove(auth.cookie.key)
            window.location.href = '/login'
        }))
    }
    static isAuthenticated = async () => {

        await axios.get(auth.authenticatedUrl, {
            headers: {
                Authorization: 'Bearer ' + Cookie.get(auth.cookie.key)
            }
        }).then(() => {
            return this.authenticated = true;

        }).catch(() => {
            this.authenticated = false;
        })

        return this.authenticated;
    }

    static setSession = (session, token) => {

        switch (session) {
            case 'cookie':
                const cookie = auth.cookie;
                this.authenticated = true;
                Cookie.set(cookie.key, token, { secure: cookie.secure, expires: cookie.expires });
                this.session = cookie;
                return token;
            case 'localStorage':
                this.session = auth.localStorage;
                break;
            default:
                break;
        }
    }

}


