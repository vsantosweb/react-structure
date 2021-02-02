/*
 * React Structure
 *
 * (c) Vitor Santos <vitor@vsantosweb.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, BrowserRouter } from 'react-router-dom';


import Routes from './routes';

import Authenticator from './authenticator';
import app from '../config/app';
import { SEO } from '../app/components/SEO/SEO';
import { Layout } from '../app/views/layouts/index.tsx';
import AppLayout from '../app/views/layouts/AppLayout';


export default function App(props) {

    const [layout, setLayout] = useState(false);
    const [routes, setRoutes] = useState(false);
    const [pageInfo, pageConfig] = useState('')

    /*
    |--------------------------------------------------------------------------
    | Utilização de redutores
    |--------------------------------------------------------------------------
    |
    | Os redutores já estão configurados para utilizar em toda a aplicação, basta acessar
    | a função useDispatch que estará disponível na aplicação.
    |
    */

    const sampleGlobalState = useSelector(state => state.LayoutReducer);
    // console.log(sampleGlobalState)

    useEffect(() => {
        redirectIfAuthenticated()
        let authCheck = setInterval(() => redirectIfAuthenticated(), 50000);
        return () => clearInterval(authCheck);

    }, [])

    useEffect(() => { redirectIfAuthenticated() }, [])

    const getRoutes = () => {
        const RouteChildren = Routes.filter(route => route.children !== undefined).map(route => route.children);

        let childrenList = [];

        for (let i = 0; i < RouteChildren.length; i++) {
            for (let j = 0; j < RouteChildren[i].length; j++) {
                childrenList.push(RouteChildren[i][j])
            }
        }
        return [
            ...Routes.map(route => route),
            ...childrenList
        ]
    }
    const redirectIfAuthenticated = async () => {
        console.log('validando...')
        if (app.withAuth) {
            return await Authenticator.isAuthenticated().then(isAuth => {

                if (isAuth && window.location.pathname === '/login') {

                    return window.history.back();
                }

                for (let route of getRoutes()) {
                    if (!isAuth && route.type === 'auth' && route.path === window.location.pathname) {

                        return redirectTo(window.location.pathname);
                    }

                    if (!isAuth && route.private && route.path === window.location.pathname) {
                        return redirectTo('/login');
                    }
                }
                renderRoutes()

            })

        }
        renderRoutes()

    }

    const redirectTo = (path) => window.location.pathname = path

    const renderRoutes = () => {

        let compiledRoutes = getRoutes().map(ViewRoute => {

            return <Route key={ViewRoute.path} layout={ViewRoute.layout} exact={ViewRoute.exact} path={ViewRoute.path} render={(props) => {

                if (window.location.pathname === props.match.url) {
                    console.log('algo encontradooo')
                    setLayout(ViewRoute.layout)
                    return <ViewRoute.component layout={setLayout} pageConfig={pageConfig} {...props} />
                }
                console.log('nada encontradooo')
            }} />

        })


        setRoutes(compiledRoutes)

    }

    const teste = () => {
        return routes.filter(route => route.key === window.location.pathname);
    }
    return (
        routes ?
        
            <BrowserRouter>
            {    console.log(teste(), 'porraaaaaaaaaa')}
                <Switch>
                    <Layout layoutType={layout} >
                        <SEO {...pageInfo} />
                        {routes}
                    </Layout>
                </Switch>
            </BrowserRouter> : ''

    )


}