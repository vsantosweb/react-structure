import React, { useEffect } from 'react';

export default function Contact(props) {

    useEffect(() => {

        props.pageConfig({
            pageDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            pageTitle: 'CONTATO',
            pageUrl: '/contato',
            image: null
        })

    }, []);

    return (
        <div>
            Página Contato
        </div>
    )
}