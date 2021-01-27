/*
|--------------------------------------------------------------------------
| Authentication Defaults
|--------------------------------------------------------------------------
|
*/

export default {
    
    authURL: `${process.env.REACT_APP_API_URL}/client/customer/auth/login`,
    authenticatedUrl: `${process.env.REACT_APP_API_URL}/client/customer/auth/logged`,
    logoutUrl: `${process.env.REACT_APP_API_URL}/client/customer/auth/logout`,
    
    localStorage: {
        key:'mySession',
        secure: true,
    },

    cookie: {
        key: 'token',
        secure: false,
        expires: 1
    },
    
    sessionStorage : {
        key: 'mySessionStorage',
    }
}