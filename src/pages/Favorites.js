import React, { Component } from 'react';
import Header from '../components/Header';

class Favorites extends Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <h1> Estamos na page Favorites </h1>
      </div>
    );
  }
}

export default Favorites;
