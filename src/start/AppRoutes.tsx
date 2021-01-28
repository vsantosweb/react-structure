import React, { FC } from 'react';
import Login from '../app/views/auth/login';
import { Route } from 'react-router-dom';
import AuthLayout from '../app/views/layouts/AuthLayout';


interface routeProps {
    routes: []
    pageConfig
}

export const AppRoutes: FC<routeProps> = ({ routes, pageConfig }) => {
    
    let Routered = [];
    let foda = []
    for (let i = 0; i < routes.length; i++) {
        let RT: any = routes[i];

        Routered.push( <Route key={RT.path} exact={RT.exact} path={RT.path} render={(props) => {
            if (window.location.pathname === props.match.url) {

                let layout = RT.layout;
                 return <RT.layout>
                    <RT.component  {...props} pageConfig={pageConfig} />
                </RT.layout>;
            }

        }} />)
    }
    return Routered;
}