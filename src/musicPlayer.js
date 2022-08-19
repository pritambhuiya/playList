const { PlayList } = require('./playList.js');
const { EventEmitter } = require('events');
const commandEmitter = new EventEmitter();

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
  commandEmitter.emit(command, ...args);
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

  console.log('\n', songsName, message);
};

const addSong = (library, name, album) => {
  library.add(name, album);
  console.log('\nAdded', name, 'from', album);
};

const renameSong = (library, name, newName) => {
  const status = library.rename(name, newName);
  const message = status ?
    `Renamed ${name} to ${newName}` : `${name} not found`;
  console.log('\n', message);
};

const playList = () => {
  const rabta = { name: 'rabta.mp3', album: 'rabta' };
  const filhall = { name: 'filhall.mp3', album: 'filhall' };
  const duaa = { name: 'duaa.mp3', album: 'shanghai' };

  return new PlayList('hindi', [rabta, filhall, duaa]);
};

const showUsage = () => {
  return ['play => to play song',
    'next => to play next song',
    'prev => to play prev song',
    'showPlayList => to see playList',
    'delete songsName => to delete the song',
    'add songsName albumName => to add the song',
    'rename oldName newName => to rename the song',
    'help => to show the usage'].join('\n');
};

const registerActions = (library) => {
  commandEmitter.on('play', () => console.log(library.play().name));
  commandEmitter.on('next', () => console.log(library.next().name));
  commandEmitter.on('prev', () => console.log(library.prev().name));

  commandEmitter.on('showPlayList', () => displayPlayList(library));
  commandEmitter.on('delete', (songsName) => deleteSong(library, songsName));
  commandEmitter.on('add', (name, album) => addSong(library, name, album));

  commandEmitter.on('rename', (name, newName) =>
    renameSong(library, name, newName));
  commandEmitter.on('help', () => console.log(showUsage()));
};

exports.playList = playList;
exports.registerActions = registerActions;
exports.processCommand = processCommand;
