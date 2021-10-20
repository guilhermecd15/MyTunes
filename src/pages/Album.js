import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
      loadingSongs: false,
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loadingSongs: true });
    const fetchSongs = await getMusics(id);
    this.setState({
      songs: [...fetchSongs],
      loadingSongs: false,
      artistName: fetchSongs[0].artistName,
      collectionName: fetchSongs[0].collectionName,
      artworkUrl100: fetchSongs[0].artworkUrl100,
    });
  }

  render() {
    const {
      loadingSongs,
      artworkUrl100,
      collectionName,
      artistName,
      songs,
    } = this.state;
    const albumClicked = (
      <div>
        <img src={ artworkUrl100 } alt={ collectionName } />
        <h3 data-testid="album-name">{ collectionName }</h3>
        <h4 data-testid="artist-name">{ artistName }</h4>
      </div>
    );
    return (
      <div data-testid="page-album">
        <Header />
        { loadingSongs ? <Loading /> : albumClicked }
        { songs.length && songs.slice(1).map((song) => (<MusicCard
          key={ song.id }
          song={ song }
        />)) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
