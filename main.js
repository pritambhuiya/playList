const {
  playList,
  registerActions,
  processCommand
} = require('./src/musicPlayer.js');

const fs = require('fs');

const main = () => {
  registerActions(playList());
  const commandsFile = 'commandsFile.txt';

  fs.watchFile(commandsFile, () => processCommand(commandsFile));
};

main();
