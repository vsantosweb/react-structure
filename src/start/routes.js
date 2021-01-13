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

const routes = [
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
        name: 'clients',
        path: { to: '/clients/:id' },
      },
      {
        name:':viagem-para-capitolio'
      }
    ]
  },
  {
    path: '/contato',
    name: 'contato',
    icon: null,
    component: Contact,
    layout: 'AppLayout',
    private: false,
    exact: false,
    children: [
      {
        name: 'Accordion',
        path: { to: '/extra-components/accordion' },
      }
    ]
  },
];

export default routes;