import React, { useEffect } from 'react';
import { SEO } from '../../components/SEO/SEO';
import { PageLayout } from '../layouts/AppLayout';

import css from './home.module.scss';

console.log(css)
export default function Home(props) {

    useEffect(() => {

        props.pageConfig({
            pageDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 
            pageTitle: 'Pagina Home', 
            pageUrl: '/home', 
            image: null
        })

    }, []);

    return (

        <div className={css.home}>
            <div className={css.button}> <span className={css.span}>Home Page</span> </div>
        </div>
    )
}