import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <h1> Estamos na page Album </h1>
      </div>
    );
  }
}

export default Album;