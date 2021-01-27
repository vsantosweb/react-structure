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
import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import Routes from './routes';

import Authenticator from './authenticator';
import app from '../config/app';
import * as Layouts from '../app/views/layouts';
import Error404 from '../app/views/errors/404';
import { SEO } from '../app/components/SEO/SEO';
import {Layout} from '../app/views/layouts/index.tsx';

export default function App(props) {

    const [layout, setLayout] = useState(false);
    const [routes, setRoutes] = useState(false);
    const [pageInfo, pageConfig] = useState('')
    const [matchRoutes, setMatchRoutes] = useState(false);
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

    useEffect(() => { redirectIfAuthenticated() }, [pageInfo])


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


        // let compiledRoutes = routes.map(ViewRoute => {

        //     return <Route key={ViewRoute.path} exact={ViewRoute.exact} path={ViewRoute.path} render={(props) => {

        //         console.log(props.match,  ViewRoute.path)
        //         if (props.match.path === ViewRoute.path) {
        //             console.log(props.match.path, ViewRoute.path)
        //             setLayout(ViewRoute.layout)
        //             return <ViewRoute.component pageConfig={pageConfig} {...props} />;
        //         }

        //     }} />

        // })
        let compiledRoutes =[];
        for (let i = 0; i < routes.length; i++) {
            let Component = routes[i];
            compiledRoutes.push(<Route key={Component.path} exact={Component.exact} path={Component.path} render={(props) => {
                console.log(props.match)
                if (window.location.pathname === props.match.url) {
                    console.log(window.location.pathname)
                    setLayout(Component.layout)
                    return <Component.component pageConfig={pageConfig} {...props} />;
                }

            }} />)
        }
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