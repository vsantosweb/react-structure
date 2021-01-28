import React, { useEffect } from 'react';

// import { Container } from './styles';

export default  function CustomerShow({layout, pageConfig}) {

    useEffect(() => {
        layout('AppLayout')
        pageConfig({
            pageDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 
            pageTitle: 'Listar Clientes', 
            pageUrl: '/customers/'+ 15, 
            image: null
        })

    }, [layout, pageConfig]);
  return(
      <div>show customer</div>
  );
}

