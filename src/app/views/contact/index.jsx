import React, { createContext } from 'react';
import { PageLayout } from '../layouts/AppLayout';

const UserContext = React.createContext({
    name: 'Guest',
});

export default function Contact(props) {
    console.log(props, 'pagina contato')
    
    return (
        <UserContext.Provider value={'signedInUser'}>
            Página Contato
        </UserContext.Provider>
    )
}