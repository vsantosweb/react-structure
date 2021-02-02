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
import CustomerIndex from '../app/views/customers/CustomerIndex';
import CustomerShow from '../app/views/customers/CustomerShow';



const routes = [

  {
    path: '/login',
    name: 'login',
    icon: null,
    component: Login,
    private: false,
    exact: false,
    layout: 'AuthLayout'
  },

  {
    path: '/',
    name: 'Home',
    icon: null,
    component: Home,
    private: true,
    exact: true,
    layout:'AppLayout',
    children: [
      {
        name: 'Create Customer',
        path: '/customers',
        component: CustomerIndex,
        exact: false,
        private: true,
        layout:'AppLayout',

      },
      {
        name: 'Show Customer',
        path: '/customers/:id',
        component: CustomerShow,
        exact: false,
        private: true,
        layout:'AppLayout',
      }
    ]
  },
  {
    path: '/contato',
    name: 'contato',
    icon: null,
    component: Contact,
    private: true,
    exact: false,
    layout:'AppLayout',
  },  
];

export default routes;