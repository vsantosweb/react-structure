import React, { useEffect } from 'react';

// import { Container } from './styles';

function Error404({layout}) {

  useEffect(() => layout('ErrorLayout'))
  return <div>404 not found</div>;
}

export default Error404;