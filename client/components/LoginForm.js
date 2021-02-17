import React, { Component, useState, useEffect } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Login';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { useHistory } from 'react-router-dom';

function LoginForm(props) {
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (props.data.user) {
      history.push('/dashboard');
    }
  }, [props.data.user]);

  const onSubmit = ({ email, password }) => {
    props
      .mutate({
        variables: { email, password },
        refetchQueries: [{ query }]
      })
      .catch((res) => {
        const errors = res.graphQLErrors.map((error) => error.message);
        setErrors(errors);
      });
  };

  return (
    <div>
      <h3>Login</h3>
      <AuthForm errors={errors} onSubmit={onSubmit} />
    </div>
  );
}

export default graphql(query)(graphql(mutation)(LoginForm));
