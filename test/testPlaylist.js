const { PlayList } = require('../src/playList.js');

const assert = require('assert');

describe('PlayList', () => {

  it('Should add a song in playList', () => {
    const hindi = new PlayList('hindi', []);
    assert.strictEqual(hindi.add('rabta', 'rabta'), true);
    assert.strictEqual(hindi.add('filhall', 'filhall'), true);
    assert.strictEqual(hindi.add('filhall', 'filhall'), true);
  });

  it('Should give current song', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const hindi = new PlayList('hindi', [rabta]);

    assert.strictEqual(hindi.play(), rabta);
  });

  it('Should give next song', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const filhall = { name: 'filhall.mp3', album: 'filhall' };
    const hindi = new PlayList('hindi', [rabta, filhall]);

    assert.strictEqual(hindi.next(), filhall);
    assert.strictEqual(hindi.next(), rabta);//index set to first
  });

  it('Should give previous song', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const filhall = { name: 'filhall.mp3', album: 'filhall' };
    const hindi = new PlayList('hindi', [rabta, filhall]);

    assert.strictEqual(hindi.prev(), filhall);//index set to last
    assert.strictEqual(hindi.prev(), rabta);
  });

  it('Should delete a song from the playList', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const hindi = new PlayList('hindi', [rabta]);

    assert.strictEqual(hindi.delete('duaa'), false);//no match
    assert.strictEqual(hindi.delete('rabta'), true);//match
    assert.strictEqual(hindi.delete('rabta'), false);//empty playList
  });

  it('Should rename a song', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const hindi = new PlayList('hindi', [rabta]);

    assert.strictEqual(hindi.rename('rabta', 'r'), true);//match
    assert.strictEqual(hindi.rename('duaa', 'r'), false);//no match
  });

  it('Should display playlist', () => {
    const rabta = { name: 'rabta.mp3', album: 'rabta' };
    const filhall = { name: 'filhall.mp3', album: 'filhall' };
    const hindi = new PlayList('hindi', [rabta, filhall]);
    const english = new PlayList('english', []);

    assert.deepStrictEqual(hindi.showPlayList(), {
      name: 'hindi', songs: [
        { name: 'rabta.mp3', album: 'rabta' },
        { name: 'filhall.mp3', album: 'filhall' }
      ]
    });

    assert.deepStrictEqual(english.showPlayList(), {
      name: 'english', songs: []
    });
  });
});
