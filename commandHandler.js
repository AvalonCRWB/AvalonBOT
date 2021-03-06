const fs = require('fs');
const path = require('path');

/**
 * @param {string?} dir Cambia el directorio en el que se cargan los comandos
 * @param {Map<string, {}>?} commands Introduce un Map (opcional) en el que se almacena los comandos
 * @param {Map<string, {}?} alias Introduce un Map (opcional) en el que se almacena los alias
 * @returns {{dir: string, commands: Map<string, {}>, alias: Map<string, {}>}} Devuelve el direcctorio usado (dir), un mapa de comandos (commands) y un mapa de alias (alias)
 */
const loadCommands = (dir = 'cmds', commands = new Map(), alias = new Map()) => {
    const Files = fs.readdirSync(path.join(__dirname, dir)).filter(e => e.endsWith('.js'));
    for(const File of Files) {
        const command = require(path.join(__dirname, dir, File));
        commands.set(command.name, command);
        if(command.alias && command.alias.length >- 1) {
            for(const alias of command.alias) {
                alias.set(Alias, command);
            }
        }
    }
    return {dir, commands, alias};
}

/**
 * @type {loadCommands}
 */
const reloadCommands = (...args) => {
    if(args.length < 3) {
        throw new Error("Los args de reloadCommands no estan completos UnU, comprueba el de loadCommands para saber que tienes que poner <3")
    }
    args[1].clear();
    args[2].clear();
    return loadCommands(...args)
}

module.exports = {
loadCommands,
reloadCommands
}
