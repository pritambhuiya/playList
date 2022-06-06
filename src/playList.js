class PlayList {
  #name;
  #songs;
  #currentSongIndex;

  constructor(name, songs) {
    this.#name = name;
    this.#songs = songs;
    this.#currentSongIndex = 0;
  }

  add(songsName, album) {
    const name = `${songsName}.mp3`;
    return this.#songs.push({ name, album }) !== 0;
  }

  play() {
    return this.#songs[this.#currentSongIndex];
  }

  #isEndingOfSongs() {
    return this.#currentSongIndex === this.#songs.length - 1;
  }

  #isStartingOfSongs() {
    return this.#currentSongIndex === 0;
  }

  next() {
    this.#currentSongIndex = this.#isEndingOfSongs()
      ? 0 : this.#currentSongIndex + 1;
    return this.play();
  }

  prev() {
    this.#currentSongIndex = this.#isStartingOfSongs()
      ? this.#songs.length - 1 : this.#currentSongIndex - 1;
    return this.play();
  }

  #findIndex(songsName) {
    const allSongsName = this.#songs.map((song) => song.name);
    return allSongsName.indexOf(`${songsName}.mp3`);
  }

  delete(songName) {
    const index = this.#findIndex(songName);

    if (index !== -1) {
      this.#songs.splice(index);
      return true;
    }
    return false;
  }

  rename(songsName, newName) {
    const index = this.#findIndex(songsName);

    if (index !== -1) {
      this.#songs[index].name = `${newName}.mp3`;
      return true;
    }
    return false;
  }

  showPlayList() {
    return { name: this.#name, songs: this.#songs };
  }
}

exports.PlayList = PlayList;
