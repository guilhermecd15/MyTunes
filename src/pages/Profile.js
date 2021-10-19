import React, { Component } from 'react';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <h1> Estamos na page Profile </h1>
      </div>
    );
  }
}

export default Profile;
