const { Signale } = require('signale');

const signale = new Signale({ scope: 'Commands' });

const Command = require('./Command');
const fileLoader = require('@/helpers/fileLoader');

class CommandsContainer {
  constructor() {
    signale.await('Loading commands...');

    this.commands = {};

    // Load all commands and store them in commands object
    fileLoader('../client/commands').forEach(({ filename, content }) => {
      const name = filename === 'index' ? '' : filename;

      this.commands[name] = new Command({ name, ...content });
    });

    // Create listing of all commands
    this.listing = Object.keys(this.commands).map(name => this.commands[name].syntax).join('\n');

    // Log all available commands to console
    const availableCommands = Object.keys(this.commands).map(name => (name === '' ? 'index' : name));
    signale.info(`Available commands: ${availableCommands.join(', ')}`);

    signale.success('Commands successfully loaded!\n');
  }

  // Get command by name
  get(name) {
    return this.commands[name];
  }
}

// Export new instance of class CommandsContainer
module.exports = new CommandsContainer();
