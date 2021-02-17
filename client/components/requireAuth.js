import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import currentUserQuery from '../queries/CurrentUser';
import { useHistory } from 'react-router-dom';

export default (WrappedComponent) => {
  function RequireAuth(props) {
    const history = useHistory();

    useEffect(() => {
      if (!props.data.loading && !props.data.user) {
        history.push('/login');
      }
    }, [props.data.loading, props.data.user]);

    return <WrappedComponent {...props} />;
  }

  return graphql(currentUserQuery)(RequireAuth);
};
