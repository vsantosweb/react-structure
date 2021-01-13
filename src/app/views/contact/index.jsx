import React, { createContext } from 'react';
import { PageLayout } from '../layouts/AppLayout';

const UserContext = React.createContext({
    name: 'Guest',
});

export default function Contact({ View }) {
    console.log(View, 'ok')
    return (
        <UserContext.Provider value={'signedInUser'}>
            hellowolrdssss
        </UserContext.Provider>
    )
}