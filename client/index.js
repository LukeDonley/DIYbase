import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
//import { Router, hashHistory, IndexRoute } from 'react-router';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';

const link = new HttpLink({
  uri: '/graphql',
  opts: {
    credentials: 'same-origin'
  }
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  dataIdFromObject: (o) => o.id
});

const Root = () => {
  const history = useHistory();
  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path='/' component={App} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signup' component={SignupForm} />
        <Route path='/dashboard' component={requireAuth(Dashboard)} />
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
