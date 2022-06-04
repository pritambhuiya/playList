class PlayList {
  #name;
  #songs;

  constructor(name, songs) {
    this.#name = name;
    this.#songs = songs;
  }

  addSong(song) {
    return this.#songs.push(song) !== 0;
  }
}

exports.PlayList = PlayList;
