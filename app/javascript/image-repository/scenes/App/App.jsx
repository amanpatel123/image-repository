import React from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ImageGallery } from '../ImageGallery';
import { ApolloProvider } from '../../components/Providers';
import { Title, NavBar, UploadImage} from '../../components';

import "./App.css"

const App = () => {
  return (
    <div className="App">
      <ApolloProvider>
        <Router>
          <NavBar />
          <Title />
          <UploadImage />
          <Switch>
            <Route 
              path="/gallery"
              render={ (props) => <ImageGallery {...props}  /> } 
              exact
            />
            <Route 
              path="/my_uploads"
              render={ (props) => <ImageGallery {...props}  /> } 
              exact
            />
          </Switch>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export { App }
