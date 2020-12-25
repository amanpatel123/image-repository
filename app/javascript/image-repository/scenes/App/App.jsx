import React, { useState } from 'react'

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { ApolloProvider } from '../../components/Providers';
import { NavBar, Modal} from '../../components';
import { MyUploads } from '../MyUploads';
import { Gallery } from '../Gallery';

import "./App.css"

const App = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  console.log(selectedImg);

  return (
    <div className="App">
      <ApolloProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route 
              path="/repository/gallery"
              render={ (props) => <Gallery {...props} setSelectedImg={setSelectedImg} /> } 
              exact
            />
            <Route 
              path="/repository/my_uploads"
              render={ (props) => <MyUploads {...props} setSelectedImg={setSelectedImg} /> } 
              exact
            />
          </Switch>
          {selectedImg && <Modal setSelectedImg={setSelectedImg} selectedImg={selectedImg} />}
        </Router>
      </ApolloProvider>
    </div>
  );
}

export { App }
