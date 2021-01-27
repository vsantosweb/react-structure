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
import { ErrorLayout } from '../app/views/layouts';
import CustomerShow from '../app/views/customers/CustomerShow';



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
        layout: 'AppLayout',
        exact: true
      },
      {
        name: 'Show Customer',
        path: '/customers/:id',
        component: customers,
        layout: 'AppLayout',
        exact: false
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
    exact: false,
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
        component: CustomerShow,
        layout: 'AppLayout'
      }
    ]
  },
  {
    path: '/contato',
    name: 'contato',
    icon: null,
    component: Contact,
    layout: 'AppLayout',
    private: true,
    exact: false,
  }
  
];

export default routes;