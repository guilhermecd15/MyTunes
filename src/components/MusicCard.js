import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingFavorite: false,
      loadingGetFavSongs: false,
    };
  }

  componentDidMount() {
    this.getFavoriteSongsFunc();
  }

  checked = async ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { props: { song: trackId } } = this;
    this.setState({ loadingFavorite: true });
    if (value) await addSong(trackId);
    if (!value) await removeSong(trackId);
    this.setState({
      loadingFavorite: false,
      favoriteChecked: value,
    });
  }

  getFavoriteSongsFunc = async () => {
    const { props: { song: { trackId } } } = this;
    this.setState({ loadingGetFavSongs: true });
    const allFavSongs = await getFavoriteSongs();
    const matchSongId = allFavSongs.find((favSong) => favSong.trackId === trackId);
    if (matchSongId) {
      this.setState({ favoriteChecked: true });
    }
    this.setState({ loadingGetFavSongs: false });
  }

  render() {
    const { props: { song:
          { previewUrl, trackName, trackId } },
    } = this;
    const {
      loadingFavorite,
      favoriteChecked,
      loadingGetFavSongs,
    } = this.state;
    if (loadingFavorite) {
      return <Loading />;
    }
    if (loadingGetFavSongs) {
      return <Loading />;
    }
    return (
      <div>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.checked }
            checked={ favoriteChecked }
            id={ trackId }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  song: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
