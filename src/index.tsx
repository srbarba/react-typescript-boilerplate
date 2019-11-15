import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from 'app/App';
import { HashRouter as Router, Route } from 'react-router-dom';
import './index.scss';

ReactDOM.render(
  <Router>
    <Route exact={true} path="/" component={App} />
  </Router>,
  document.getElementById('root')
);
