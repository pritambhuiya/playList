class PlayList {
  #name;
  #songs;
  #currentSongIndex;

  constructor(name, songs) {
    this.#name = name;
    this.#songs = songs;
    this.#currentSongIndex = 0;
  }

  add(song) {
    return this.#songs.push(song) !== 0;
  }

  play() {
    return this.#songs[this.#currentSongIndex];
  }

  next() {
    this.#currentSongIndex++;
    return this.play();
  }

  prev() {
    this.#currentSongIndex--;
    return this.play();
  }

  #findIndex(songsName) {
    const allSongsName = this.#songs.map((song) => song.name);
    return allSongsName.indexOf(songsName);
  }

  delete(songName) {
    const index = this.#findIndex(songName);

    if (index !== -1) {
      this.#songs.splice(index);
      return true;
    }
    return false;
  }

  rename(songName, newName) {
    const index = this.#findIndex(songName);

    if (index !== -1) {
      this.#songs[index].name = newName;
      return true;
    }
    return false;
  }

  showPlayList() {
    return { name: this.#name, songs: this.#songs };
  }
}

exports.PlayList = PlayList;
