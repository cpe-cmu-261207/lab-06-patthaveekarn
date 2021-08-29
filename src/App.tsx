import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Current from './components/Current';
import Result from './components/Result';
import AboutMe from './components/AboutMe';
import HisSelect from './components/HisSelect';

function App() {
  return (
    <Router >
      <Navbar />
      

      <Switch>

        <Route path="/" exact>
          <Current />
        </Route>

        <Route path="/current" >
          <Current />
        </Route>

        <Route path="/history/select">
          <HisSelect/>
        </Route>

        <Route path='/history/result'>
          <Result />
        </Route>

        <Route path="/about">
          <AboutMe />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
