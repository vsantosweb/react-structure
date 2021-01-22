/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| As rotas HTTP são pontos de entrada para seu aplicativo Web. Você pode criar
| rotas para diferentes URLs e vincular componentes, icones e titulos a elas, além de 
| além de poder definir se a rota é privada ou se ela possui rotas secuntaráis.
|
*/

import Home from '../app/views/home';
import Contact from '../app/views/contact';
import Login from '../app/views/auth/login';
import customers from '../app/views/customers';
import error404 from '../app/views/errors/404';

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

  {
    path: '/',
    name: 'Home',
    icon: null,
    component: Home,
    layout: 'AppLayout',
    private: true,
    exact: true,
    children: [
      {
        name: 'Create Customer',
        path: '/customers',
        component: customers,
        layout: 'AppLayout'
      },
      {
        name: 'Show Customer',
        path: '/customers/:id',
        component: customers,
        layout: 'AppLayout'
      }
    ]
  },
  {
    path: '/produtos',
    name: 'Produtos',
    icon: null,
    component: Home,
    layout: 'AppLayout',
    private: false,
    exact: true,
    children: [
      {
        name: 'Create PRoduto',
        path: '/products',
        component: customers,
        private: true,
        layout: 'AppLayout'
      },
      {
        name: 'Show produto',
        path: '/products/:id',
        component: customers,
        layout: 'AppLayout'
      }
    ]
  },
  {
    path: '/contato',
    name: 'contato',
    icon: null,
    component: Contact,
    layout: 'AuthLayout',
    private: true,
    exact: false,
  },

  {
    path: '/404',
    name: '404',
    icon: null,
    component: error404,
    layout: 'ErrorLayout',
    private: true,
    exact: false,
  }
];

export default routes;