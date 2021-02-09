import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/login';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  );
};

export default Routes;
