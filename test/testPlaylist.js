const { PlayList } = require('../src/playList.js');

const assert = require('assert');

describe('PlayList', () => {
  it('Should equate two instances of Playlist', () => {
    const hindi = new PlayList(['rabta.mp3']);
    const bengali = new PlayList(['sarata-din.mp3', 'tor-motoi.mp3']);

    assert.strictEqual(hindi.equals(hindi), true);
    assert.strictEqual(bengali.equals(bengali), true);
    assert.strictEqual(hindi.equals(bengali), false);
    assert.strictEqual(hindi.equals(['rabta.mp3']), false);
  });
});
