import React, { useEffect } from 'react';

import css from './home.module.scss';

export default function Home({layout, pageConfig}) {

    useEffect(() => {
        layout('AppLayout')
        pageConfig({
            pageDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            pageTitle: 'Pagina Home',
            pageUrl: '/home',
            image: null
        })

    }, [layout, pageConfig]);

    return (

        <div className={css.home}>
            <div className={css.button}> <span className={css.span}>Home Page</span> </div>
        </div>
    )
}