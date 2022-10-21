import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameHeaderLoaded: false,
    };
  }

  componentDidMount() {
    this.getName();
  }

  async getName() {
    const { name } = await getUser();
    this.setState({
      name,
      nameHeaderLoaded: true,
    });
  }

  render() {
    const { nameHeaderLoaded, name } = this.state;
    return (
      <header data-testid="header-component" className="header-tunes">
        <div>
          <p> Bem vindo, </p>
          <p data-testid="header-user-name">
            {nameHeaderLoaded && name }
          </p>
        </div>
        <h1>MyTunes</h1>
        <navigator>
          <Link data-testid="link-to-search" to="/search">
            <buton> Search </buton>
          </Link>
          <Link data-testid="link-to-favorites" to="/favorites">
            <buton> Favorites </buton>
          </Link>
        </navigator>
      </header>
    );
  }
}

export default Header;
