import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadingFavorite: false,
    };
  }

  checked = async ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { props: { song: trackId } } = this;
    this.setState({ loadingFavorite: true });
    await addSong(trackId);
    this.setState({
      loadingFavorite: false,
      favoriteChecked: value,
    });
  }

  render() {
    const { props: { song:
          { previewUrl, trackName, trackId } },
    } = this;
    const { loadingFavorite, favoriteChecked } = this.state;
    if (loadingFavorite) {
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
        <label htmlFor="favorita">
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onClick={ this.checked }
            checked={ favoriteChecked }
            id="favorita"
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
