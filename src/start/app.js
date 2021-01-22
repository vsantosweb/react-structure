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
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Routes from './routes';

import AuthLayout from '../app/views/layouts/AuthLayout';
import AppLayout from '../app/views/layouts/AppLayout';
import Authenticator from './authenticator';
import app from '../config/app';
import * as Layouts from '../app/views/layouts';
import Error404 from '../app/views/errors/404';
import Home from '../app/views/home';


export default function App(props) {

    const [application, setapplication] = useState({

        withAuth: app.withAuth,
        isAuthenticated: Authenticator.isAuthenticated,
        layout: '',

    });
    const [logged, setLogged] = useState(false);
    const [Layout, setLayout] = useState(false);
    const [route, setRoute] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [routePath, setRoutePath] = useState(null);

    const [RouteLayout, setRouteLayout] = useState(false);
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

    useEffect(() => {
        setLogged(true)

        redirectIfAuthenticated()

    }, [])


    const redirectIfAuthenticated = async () => {

        if (application.withAuth) {
            return await Authenticator.isAuthenticated().then(response => {

                if (new Authenticator().authenticated && window.location.pathname === '/login') {

                    return redirectTo('/');
                }

                for (let route of Routes) {
                    if (!new Authenticator().authenticated && route.type === 'auth' && route.path === window.location.pathname) {

                        return redirectTo(window.location.pathname);
                    }

                    if (!new Authenticator().authenticated && route.private && route.path === window.location.pathname) {

                        return redirectTo('/login');
                    }
                }
                renderRoutes()

            })

        }
        renderRoutes()

        return;

    }

    const redirectTo = (path) => window.location.pathname = path


    const renderRoutes = () => {

        const RouteChildren = Routes.filter(route => route.children !== undefined).map(route => route.children);

        let childrenList = [];

        for (let i = 0; i < RouteChildren.length; i++) {
            for (let j = 0; j < RouteChildren[i].length; j++) {
                childrenList.push(RouteChildren[i][j])
            }
        }

        const routes = [
            ...Routes.map(route => route),
            ...childrenList
        ]
        let compiledRoutes = routes.map(ViewRoute => {


            if (window.location.pathname === ViewRoute.path) {

                setLayout({ view: Layouts[ViewRoute.layout] });

            }
            setRouteLayout({
                layout:Layouts[ViewRoute.layout],
                route: <Route key={ViewRoute.path} exact={ViewRoute.exact} path={ViewRoute.path} render={(props) => <ViewRoute.component {...props} />} />
            })
            return <Route key={ViewRoute.path} exact={ViewRoute.exact} path={ViewRoute.path} render={(props) => <ViewRoute.component {...props} />} />

        })
        setRoute(compiledRoutes)

    }
    console.log(Layout)
    return (
        route ?
            <BrowserRouter>
                <Switch>
                    <Layout.view>
                        {route}
                    </Layout.view>
                </Switch>

            </BrowserRouter> : ''

    )


}