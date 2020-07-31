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

import AuthLayout from '../resources/views/layouts/AuthLayout';
import AppLayout from '../resources/views/layouts/AppLayout';
import Authenticator from './authenticator';

export default function App() {

    const [appControl, setAppControl] = useState({

        isAuthenticated: true,
        isLoaded: false,
        privateRoutes: [],
        publicRoutes: []

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

    /**
     * Route Manager is the public interface used to define
     * routes, groups and resources.
     *
    */

    const privateRoutes = Routes.map((route, key) => <Route key={key} exact={route.exact} path={route.path} component={route.component} />);
    const publicRoutes = Routes.map((route, key) => !route.private ? <Route key={key} exact={route.exact} path={route.path} component={route.component} /> : null);

    const redirectIfAuthenticated = () => {

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


    const redirectTo = (path) => {
        return <Redirect key={path} to={{ pathname: path }} />
    }
    return (

        <BrowserRouter>
            {redirectIfAuthenticated()}
            <Layout>
                <Switch>
                    {privateRoutes}
                    {publicRoutes}
                </Switch>
            </Layout>
        </BrowserRouter>


    )


}