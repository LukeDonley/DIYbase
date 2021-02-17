import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/CurrentUser';
import mutation from '../mutations/Logout';

function Header(props) {
  const onLogoutClick = () => {
    props.mutate({
      refetchQueries: [{ query }]
    });
  };

  const renderButtons = () => {
    const { loading, user } = props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <a onClick={onLogoutClick}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </div>
      );
    }
  };

  return (
    <nav>
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo left'>
          Home
        </Link>
        <ul className='right'>{renderButtons()}</ul>
      </div>
    </nav>
  );
}

export default graphql(mutation)(graphql(query)(Header));
