import React from 'react';
import {Route} from 'react-router';
import App from './components/app';
import Component1 from './components/component1';
import Component2 from './components/component2';
import Home from './components/home';

export default (
  <Route component={App}>
    <Route path='/component1' component={Component1} />
    <Route path='/component2' component={Component2} />
    <Route path='/' component={Home} />
  </Route>
);
