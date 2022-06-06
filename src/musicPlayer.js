const { PlayList } = require('./playList.js');
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

const fs = require('fs');

const readFile = (file) => fs.readFileSync(file, 'utf8').trim();

const lastCommand = (commands) => commands.split('\n').slice(-1)[0];

const getCommand = (commandsFile) => {
  const commands = readFile(commandsFile);
  const command = lastCommand(commands);

  return command.split(' ');
};

const processCommand = (commandsFile) => {
  const [command, ...args] = getCommand(commandsFile);
  eventEmitter.emit(command, ...args);
};

const displaySongs = (songs) => {
  songs.forEach(song => {
    console.log('\nname:', song.name, '\nalbum:', song.album);
  });
};

const displayPlayList = (library) => {
  const { name, songs } = library.showPlayList();
  console.log('playList:', name, '\n--------');

  displaySongs(songs);
};

const deleteSong = (library, songsName) => {
  const status = library.delete(songsName);
  const message = status ? 'deleted' : 'not found';
  console.log(songsName, message);
};

const addSong = (library, name, album) => {
  library.add(name, album);
  console.log('Added', name, 'from', album);
};

const renameSong = (library, name, newName) => {
  const status = library.rename(name, newName);
  const message = status ?
    `Renamed ${name} to ${newName}` : `${name} not found`;
  console.log(message);
};

const songsLibrary = () => {
  const rabta = { name: 'rabta.mp3', album: 'rabta' };
  const filhall = { name: 'filhall.mp3', album: 'filhall' };
  const duaa = { name: 'duaa.mp3', album: 'shanghai' };
  return new PlayList('hindi', [rabta, filhall, duaa]);
};

const commandsLibrary = (library) => {
  eventEmitter.on('play', () => console.log(library.play().name));
  eventEmitter.on('next', () => console.log(library.next().name));
  eventEmitter.on('prev', () => console.log(library.prev().name));
  eventEmitter.on('showPlayList', () => displayPlayList(library));
  eventEmitter.on('delete', (songsName) => deleteSong(library, songsName));
  eventEmitter.on('add', (name, album) => addSong(library, name, album));
  eventEmitter.on('rename', (name, newName) =>
    renameSong(library, name, newName));
};

exports.songsLibrary = songsLibrary;
exports.commandsLibrary = commandsLibrary;
exports.processCommand = processCommand;
