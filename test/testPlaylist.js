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

  it('Should give current song', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const hindi = new PlayList('hindi', [rabta]);

    assert.strictEqual(hindi.playSong(), rabta);
  });

  it('Should give next song', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const filhall = { name: 'filhall.mp3', album: 'filhall' };
    const hindi = new PlayList('hindi', [rabta, filhall]);

    assert.strictEqual(hindi.nextSong(), filhall);
  });

  it('Should give previous song', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const filhall = { name: 'filhall.mp3', album: 'filhall' };
    const hindi = new PlayList('hindi', [rabta, filhall]);

    hindi.nextSong();
    assert.strictEqual(hindi.prevSong(), rabta);
  });

  it('Should delete a song from the playList', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const hindi = new PlayList('hindi', [rabta]);

    assert.strictEqual(hindi.deleteSong('duaa.mp3'), false);//no match
    assert.strictEqual(hindi.deleteSong('rabta.mp3'), true);//match
    assert.strictEqual(hindi.deleteSong('rabta.mp3'), false);//empty playList
  });

  it('Should rename a song', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const hindi = new PlayList('hindi', [rabta]);

    assert.strictEqual(hindi.renameSong('rabta.mp3', 'r.mp3'), true);//match
    assert.strictEqual(hindi.renameSong('duaa.mp3', 'r.mp3'), false);//no match
  });
});
