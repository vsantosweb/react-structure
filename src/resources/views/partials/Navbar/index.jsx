import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ adsMachines }){
    
    return(
        <nav>
            maaquins : { adsMachines.length}
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/contato'}>Contato</Link></li>
            </ul>
        </nav>
    )
}