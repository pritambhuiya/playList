class PlayList {
  #name;
  #songs;
  #currentSongIndex;

  constructor(name, songs) {
    this.#name = name;
    this.#songs = songs;
    this.#currentSongIndex = 0;
  }

  addSong(song) {
    return this.#songs.push(song) !== 0;
  }

  playSong() {
    return this.#songs[this.#currentSongIndex];
  }

  nextSong() {
    this.#currentSongIndex++;
    return this.playSong();
  }

  prevSong() {
    this.#currentSongIndex--;
    return this.playSong();
  }

  #findIndex(songsName) {
    const allSongsName = this.#songs.map((song) => song.name);
    return allSongsName.indexOf(songsName);
  }

  deleteSong(songName) {
    const index = this.#findIndex(songName);

    if (index !== -1) {
      this.#songs.splice(index);
      return true;
    }
    return false;
  }
}

exports.PlayList = PlayList;
