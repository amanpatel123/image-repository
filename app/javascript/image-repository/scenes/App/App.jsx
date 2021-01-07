import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from '../../components/Providers';
import { NavBar, Modal} from '../../components';
import { MyUploads } from '../MyUploads';
import { Gallery } from '../Gallery';

import "./App.css"

const App = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  return (
    <div className="App">
      <ApolloProvider>
        <Router>
          <NavBar redirectToReferrer={redirectToReferrer} setRedirectToReferrer={setRedirectToReferrer} />
          <Switch>
            <Route
              path="/repository/gallery"
              render={ (props) => <Gallery {...props} setRedirectToReferrer={setRedirectToReferrer} /> }
              exact
            />
            <Route 
              path="/repository/my_uploads"
              render={ (props) => <MyUploads {...props} /> }
              exact
            />
            <Route 
              path="/repository/search"
              render={ (props) => <Gallery {...props} setRedirectToReferrer={setRedirectToReferrer}/> } 
              exact
            />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export { App }
