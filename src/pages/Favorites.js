import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allFavSongs: [],
    };
  }

  componentDidMount() {
    this.getSongs();
  }

  componentDidUpdate() {
    this.getSongs();
  }

  getSongs = async () => {
    const fetchAllFavSongs = await getFavoriteSongs();
    this.setState({
      allFavSongs: [...fetchAllFavSongs],
    });
  }

  render() {
    const { allFavSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { allFavSongs.map((song) => (<MusicCard
          key={ song.trackId }
          song={ song }
        />)) }
      </div>
    );
  }
}

export default Favorites;
