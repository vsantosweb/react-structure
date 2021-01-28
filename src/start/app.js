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
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Routes from './routes';

import Authenticator from './authenticator';
import app from '../config/app';
import { SEO } from '../app/components/SEO/SEO';
import { Layout } from '../app/views/layouts/index.tsx';


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
    console.log(sampleGlobalState)

    useEffect(() => {
        redirectIfAuthenticated()
}, [pageInfo])


    const redirectIfAuthenticated = async () => {
        if (app.withAuth) {
            return await Authenticator.isAuthenticated().then(isAuth => {

                if (isAuth && window.location.pathname === '/login') {

                    return redirectTo('/');
                }

                for (let route of Routes) {
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

            return <Route key={ViewRoute.path} exact={ViewRoute.exact} path={ViewRoute.path} render={(props) => {

                if (window.location.pathname === props.match.url) {
                    
                     return <ViewRoute.component layout={setLayout} pageConfig={pageConfig} {...props} />;
                }

            }} />

        })


        setRoutes(compiledRoutes)

    }

    return (
        routes ?
            <BrowserRouter>

                <Switch>
                    <Layout layoutType={layout} >
                        <SEO {...pageInfo} />
                        {routes}
                    </Layout>

                </Switch>

            </BrowserRouter> : ''

    )


}