const { PlayList } = require('./playList.js');
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

const fs = require('fs');
const log = console.log;

const readFile = (file) => fs.readFileSync(file, 'utf8').trim();

const getCommand = (commandsFile) => {
  const commands = readFile(commandsFile);
  return commands.split('\n').slice(-1)[0];
};

const processCommand = (commandsFile) => {
  const command = getCommand(commandsFile);
  eventEmitter.emit(command);
};

const displaySongs = (songs) => {
  songs.forEach(song => {
    log('\nname:', song.name, '\nalbum:', song.album);
  });
};

const displayPlayList = (playList) => {
  const { name, songs } = playList.showPlayList();
  log('playList:', name, '\n--------');

  displaySongs(songs);
};

const songsLibrary = () => {
  const rabta = { name: 'rabta.mp3', album: 'rabta' };
  const filhall = { name: 'filhall.mp3', album: 'filhall' };
  return new PlayList('hindi', [rabta, filhall]);
};

const commandsLibrary = (library) => {
  eventEmitter.on('play', () => log(library.play().name));
  eventEmitter.on('next', () => log(library.next().name));
  eventEmitter.on('prev', () => log(library.prev().name));
  eventEmitter.on('showPlayList', () => displayPlayList(library));
};

exports.songsLibrary = songsLibrary;
exports.commandsLibrary = commandsLibrary;
exports.processCommand = processCommand;