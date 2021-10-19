import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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
      <header data-testid="header-component">
        <h1>Esse é o Header</h1>
        <p data-testid="header-user-name">
          { nameHeaderLoaded ? name : <Loading /> }
        </p>
      </header>
    );
  }
}

export default Header;
