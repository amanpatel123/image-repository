import React from 'react'

import { Repository } from '../../components/Repository'
import { ApolloProvider } from '../../components/Providers'


const App = () => {
  return (
    <ApolloProvider>
      <Repository />
    </ApolloProvider>
  );
}

export { App }
