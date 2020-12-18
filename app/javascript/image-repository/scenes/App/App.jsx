import React from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Repository } from '../../components/Repository'
import { ApolloProvider } from '../../components/Providers'
import { NavBar } from '../../components/NavBar'



const App = () => {
  return (
    <ApolloProvider>
      <Router>
        <NavBar />
      </Router>
      <Repository />
    </ApolloProvider>
  );
}

export { App }
