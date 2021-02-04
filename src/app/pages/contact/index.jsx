import React, { useEffect } from 'react';

export default function Contact({layout, pageConfig}) {

    useEffect(() => {

        layout('AppLayout')

        pageConfig({
            
            pageDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            pageTitle: 'CONTATO',
            pageUrl: '/contato',
            image: null
        })

    }, [layout, pageConfig]);

    return (
        <div>
            Página Contato
        </div>
    )
}