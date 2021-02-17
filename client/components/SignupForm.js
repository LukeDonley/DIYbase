import React, { useState, useEffect } from 'react';
import AuthForm from './AuthForm';
import { graphql } from 'react-apollo';
import mutation from '../mutations/Signup';
import query from '../queries/CurrentUser';
import { useHistory } from 'react-router-dom';

function SignupForm(props) {
  const history = useHistory();
  const [errors, setErrors] = useState([]);

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
      <h3>Sign Up</h3>
      <AuthForm errors={errors} onSubmit={onSubmit} />
    </div>
  );
}

export default graphql(query)(graphql(mutation)(SignupForm));
