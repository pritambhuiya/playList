const { PlayList } = require('../src/playList.js');

const assert = require('assert');

describe('PlayList', () => {

  it('Should add a song in playList', () => {
    const hindi = new PlayList('hindi', []);
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const filhall = { name: 'filhall.mp3', album: 'filhall' };

    assert.strictEqual(hindi.addSong(rabta), true);
    assert.strictEqual(hindi.addSong(filhall), true);
    assert.strictEqual(hindi.addSong(filhall), true);
  });
});
