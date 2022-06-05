const { songsLibrary, commandsLibrary, processCommand } =
  require('./src/musicPlayer.js');

const fs = require('fs');

const main = () => {
  const playList = songsLibrary();
  commandsLibrary(playList);

  const commandsFile = 'commandsFile.txt';
  fs.watchFile(commandsFile, () => processCommand(commandsFile));
};

main();
