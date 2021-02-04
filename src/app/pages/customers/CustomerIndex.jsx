import React, { useEffect } from 'react';
import CustomerForm from './CustomerForm';

// import { Container } from './styles';

function CustomerIndex({ layout, pageConfig }) {

  useEffect(() => {
    layout('AppLayout')
    pageConfig({
      pageDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
      pageTitle: 'Pagina Customer',
      pageUrl: '/home',
      image: null
    })

  }, [layout, pageConfig]);

  return (
    <React.Fragment>
      <CustomerForm />
    </React.Fragment>
  )
}

export default CustomerIndex;