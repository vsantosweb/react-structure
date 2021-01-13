/*
 * React Structure
 *
 * (c) Vitor Santos <vitor@vsantosweb.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sampleAction } from '../store/actions/sample/SampleAction';
import { Route, Switch, BrowserRouter, useHistory, Redirect } from 'react-router-dom';
import Routes from './routes';

import AuthLayout from '../app/views/layouts/AuthLayout';
import AppLayout from '../app/views/layouts/AppLayout';
import Authenticator from './authenticator';
import app from '../config/app';

export default function App() {


    const [appControl, setAppControl] = useState({

        withAuth: app.withAuth,
        isAuthenticated: Authenticator.isAuthenticated,
        isLoaded: false,
        privateRoutes: Routes.map((route, key) => <Route key={key} exact={route.exact} path={route.path} component={route.component} />),
        publicRoutes: Routes.map((route, key) => !route.private ? <Route key={key} exact={route.exact} path={route.path} component={route.component} /> : null)

    });


    const [logged, setLogged] = useState(true);

    /*
    |--------------------------------------------------------------------------
    | Utilização de redutores
    |--------------------------------------------------------------------------
    |
    | Os redutores já estão configurados para utilizar em toda a aplicação, basta acessar
    | a função useDispatch que estará disponível na aplicação.
    |
    */

    const dispatch = useDispatch();
    const sampleGlobalState = useSelector(state => state);
    const Layout = logged ? AppLayout : AuthLayout;

    useEffect(() => {
        
        dispatch(sampleAction())

        const data = {
            email: 'john@doe.com',
            password: 'password'
        }
        // const auth = Authenticator.signIn(data);

        // auth.then(response => {
        //     Authenticator.setSession('cookie', response.data.data)

        // });

        // Authenticator.isAuthenticated()

    }, [])



    const redirectIfAuthenticated = () => {
        
        if (appControl.withAuth) {

            if (logged && window.location.pathname === '/login') {
                return redirectTo('/');
            }

            for (let route of Routes) {
                if (!logged && route.type === 'auth' && route.path === window.location.pathname) {
                    return redirectTo(window.location.pathname);
                }

                if (!logged && route.private && route.path === window.location.pathname) {
                    return redirectTo('/login');
                }
            }
        }

        return;

    }


    const redirectTo = (path) => {
        return <Redirect key={path} to={{ pathname: path }} />
    }
    return (

        <BrowserRouter>
            {redirectIfAuthenticated()}
            <Layout>
                <Switch>
                    {appControl.privateRoutes}
                    {appControl.publicRoutes}
                </Switch>
            </Layout>
        </BrowserRouter>


    )


}