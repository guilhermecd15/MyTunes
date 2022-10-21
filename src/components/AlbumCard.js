import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const {
      album: {
        artistName,
        collectionId,
        collectionName,
        artworkUrl100,
      },
    } = this.props;
    return (
      <div className="album-card">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <div>
          <p className="album-name">{collectionName}</p>
          <p>{artistName}</p>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
            className="album-link"
          >
            Mais informações
          </Link>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }).isRequired,
};

export default AlbumCard;
