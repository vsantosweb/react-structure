/*
|--------------------------------------------------------------------------
| Authentication Defaults
|--------------------------------------------------------------------------
|
| This option controls the default authentication "guard" and password
| reset options for your application. You may change these defaults
| as required, but they're a perfect start for most applications.
|
*/

export default {
    
    authURL: `${process.env.REACT_APP_API_URL}/client/customer/auth/login`,
    authenticatedUrl: `${process.env.REACT_APP_API_URL}/client/customer/auth/logged`,

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