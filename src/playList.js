class PlayList {
  #songs;
  constructor(songs) {
    this.#songs = songs;
  }

  hasSameNumberOfSongs(OtherPlaylist) {
    for (let index = 0; index < this.#songs.length; index++) {
      if (this.#songs[index] !== OtherPlaylist.#songs[index]) {
        return false;
      }
    }
    return true;
  }

  equals(OtherPlaylist) {
    return OtherPlaylist instanceof PlayList &&
      this.#songs.length === OtherPlaylist.#songs.length &&
      this.hasSameNumberOfSongs(OtherPlaylist);
  }

}

exports.PlayList = PlayList;
