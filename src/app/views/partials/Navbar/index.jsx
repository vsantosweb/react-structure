import React from 'react';
import { Link } from 'react-router-dom';
import Authenticator from '../../../../start/authenticator';

export default function Navbar(){
    
    return(
        <nav>
            contador : { 15}
            <a href={'#'} onClick={() => Authenticator.signOut() } >sair</a>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/contato'}>Contato</Link></li>
            </ul>
        </nav>
    )
}