import React, { createContext } from 'react';
import { PageLayout } from '../layouts/AppLayout';

const UserContext = React.createContext({
    name: 'Guest',
});

export default function Home(props) {

    console.log(props,'pagina home')
    return (
        <UserContext.Provider value={'signedInUser'}>
            Home Page
        </UserContext.Provider>
    )
}