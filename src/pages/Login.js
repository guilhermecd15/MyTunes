import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      promiseLoaded: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => { this.Error(); });
  }

  logar = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ promiseLoaded: true });
  }

  Error() {
    const { name } = this.state;
    const minCaracter = 3;
    if (name.length >= minCaracter) {
      return this.setState({ buttonDisabled: false });
    }
    return this.setState({ buttonDisabled: true });
  }

  render() {
    const { buttonDisabled, name, loading, promiseLoaded } = this.state;
    if (loading) {
      return (
        <div>
          <Loading />
          { promiseLoaded && <Redirect to="/search" /> }
        </div>
      );
    }
    return (
      <div data-testid="page-login">
        <h1> Estamos na page Login </h1>
        <label htmlFor="login">
          <input
            value={ name }
            onChange={ this.onInputChange }
            data-testid="login-name-input"
            name="name"
            type="text"
            placeholder="Digite seu nome..."
          />
          <button
            disabled={ buttonDisabled }
            data-testid="login-submit-button"
            type="button"
            onClick={ this.logar }
          >
            Entrar
          </button>
        </label>
      </div>
    );
  }
}

export default Login;
