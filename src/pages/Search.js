import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameArtist: '',
      buttonSearchDisabled: true,
      loadingAlbum: false,
      promiseAlbumLoaded: false,
      albuns: [],
      noAlbum: false,
      resultdisabled: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => { this.Error(); });
  }

  search = async () => {
    const { nameArtist } = this.state;
    this.setState({ loadingAlbum: true });
    const fetchAlbuns = await searchAlbumsAPI(nameArtist);
    this.setState({
      aux: nameArtist,
      nameArtist: '',
      promiseAlbumLoaded: true,
      buttonSearchDisabled: true,
      albuns: [...fetchAlbuns],
      loadingAlbum: false,
      resultdisabled: true,
    });
    if (!fetchAlbuns.length) {
      this.setState({ noAlbum: true });
    } else {
      this.setState({ noAlbum: false });
    }
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
    const {
      buttonSearchDisabled,
      loadingAlbum,
      promiseAlbumLoaded,
      albuns,
      noAlbum,
      resultdisabled,
      aux,
      nameArtist,
    } = this.state;
    const result = (
      <h3>
        Resultado de álbuns de:
        {' '}
        { aux }
      </h3>
    );
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <h1> Estamos na page Search </h1>
          <form>
            <label htmlFor="search-artist-label">
              <input
                type="text"
                placeholder="Digite o nome do artista..."
                data-testid="search-artist-input"
                onChange={ this.onInputChange }
                name="nameArtist"
                value={ nameArtist }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonSearchDisabled }
                onClick={ this.search }
              >
                Pesquisar
              </button>
            </label>
          </form>
        </div>
        { resultdisabled && result }
        { loadingAlbum && <Loading /> }
        { promiseAlbumLoaded && (
          <div>
            { noAlbum ? <h3> Nenhum álbum foi encontrado</h3> : ' '}
            { albuns.map((album) => (<AlbumCard
              key={ album.collectionId }
              album={ album }
            />))}
          </div>
        ) }
      </div>
    );
  }
}

export default Search;
