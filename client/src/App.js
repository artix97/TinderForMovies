import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './components/Header';
import TinderCards from './components/TinderCards';


function App() {
  
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/'>
            <Header />
            <TinderCards />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
