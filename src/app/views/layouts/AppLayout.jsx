import React, { useState, useEffect } from 'react';

import Navbar from '../partials/Navbar';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.arxexperience.com/api/v1',
});

export default function AppLayout({children}) {

    const [ machines, setMachines ] = useState(0);
    const getMachines = () => {
        api.get('/machines/098f6bcd4621d373cade4e832627b4f6/ads').then(response => setMachines(response.data.data) )
    }
    useEffect(() => {
        getMachines()
    },[]);

    console.log(machines)
    return (
        <div>
            <Navbar adsMachines={machines} />
            {children}
            <footer>footer</footer>
        </div>
    )
}

