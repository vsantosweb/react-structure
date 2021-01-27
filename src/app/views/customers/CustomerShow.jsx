import React, { useEffect } from 'react';

// import { Container } from './styles';

export default  function CustomerShow(props) {

    useEffect(() => {

        props.pageConfig({
            pageDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 
            pageTitle: 'Listar Clientes', 
            pageUrl: '/customers/'+ 15, 
            image: null
        })

    }, []);
  return(
      <div>show customer</div>
  );
}

