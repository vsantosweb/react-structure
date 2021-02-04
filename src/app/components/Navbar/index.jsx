import React from 'react';
import { Link } from 'react-router-dom';
import Authenticator from '../../../start/authenticator';

export default function Navbar(){

    return(
        <nav>
            <a href={'#'} onClick={() => Authenticator.signOut() } >sair</a>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/customers'}>Customers</Link></li>
            </ul>
        </nav>
    )
}