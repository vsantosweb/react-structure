import React, { FC } from 'react';
import Login from '../app/views/auth/login';
import {Route} from 'react-router-dom';

const routes = [

    {
      path: '/login',
      name: 'login',
      icon: null,
      component: Login,
      layout: 'AuthLayout',
      private: false,
      exact: false
    },
]
interface routeProps {
    props: 'exact' | 'path' | 'key' | 'component'
}

export const AppRoutes:FC<routeProps> = ({component, props}) => {
    const Component = routes[component] || 'ErrorLayout';


    return <Route key={Component.path} exact={Component.exact} path={Component.path} render={(props) => {
        <Component.component pageConfig={pageConfig} {...props} />
    }} />
}