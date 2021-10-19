import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameArtist: '',
      buttonSearchDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => { this.Error(); });
  }

  Error() {
    const { nameArtist } = this.state;
    const minCaracter = 2;
    if (nameArtist.length >= minCaracter) {
      return this.setState({ buttonSearchDisabled: false });
    }
    return this.setState({ buttonSearchDisabled: true });
  }

  render() {
    const { buttonSearchDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1> Estamos na page Search </h1>
        <form>
          <label htmlFor="search-artist-label">
            <input
              type="text"
              placeholder="Digite o nome do artista..."
              data-testid="search-artist-input"
              onChange={ this.onInputChange }
              name="nameArtist"
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonSearchDisabled }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}

export default Search;
