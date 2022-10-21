import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.getFavoriteSongsFunc();
  }

  checked = async ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { props: { song: trackId } } = this;
    if (value) await addSong(trackId);
    if (!value) await removeSong(trackId);
    this.setState({
      favoriteChecked: value,
    });
  }

  getFavoriteSongsFunc = async () => {
    const { props: { song: { trackId } } } = this;
    const allFavSongs = await getFavoriteSongs();
    const matchSongId = allFavSongs.find((favSong) => favSong.trackId === trackId);
    if (matchSongId) {
      this.setState({ favoriteChecked: true });
    }
  }

  render() {
    const { props: { song:
          { previewUrl, trackName, trackId } },
    } = this;
    const {
      favoriteChecked,
    } = this.state;
    return (
      <div className="music-display">
        <p>{ trackName }</p>
        <label
          htmlFor={ trackId }
          className="fav-button"
        >
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            <code>audio</code>
            .
          </audio>
          <p>Favorita</p>
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ this.checked }
            checked={ favoriteChecked }
            id={ trackId }
          />
          <span className="check" />
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
