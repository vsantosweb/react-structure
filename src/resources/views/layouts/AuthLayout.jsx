import React from 'react';

export default function AuthLayout({children}){
    return(
        <div>
            login
            <div>{children}</div>
        </div>
    )
}