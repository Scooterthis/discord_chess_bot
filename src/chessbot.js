const chess = require('./chess/dist');
const Discord = require('discord.js');
const event = require('events');
const fs = require('fs');

const bot = new Discord.Client();

fs.readFile('./application.properties', async (err, data) => { 
    if (err) throw err;
    var token = data.toString().replace(/\s/g,'').slice(4);;
    botstart(token);
});


// handle count of the total games played.
var ct = 0;

async function botstart(token){
    bot.login(token);
    
    bot.on('ready', () => {
        console.log('INFO Chess bot initialized.');
    });

    var eventEmitter = new event.EventEmitter;
    var prefix = '!';
    var games = [];
    var channels = new Map();
    var gameCount = 0;

    function genMove(str){
        let num1;
        let num2;
        if(str.length > 2){
            return false;
        } 
        str = str.toUpperCase();
        switch (str[0]){
            case 'A': 
                num1 = 1;
                break;
            case 'B': 
                num1 = 2;
                break;
            case 'C': 
                num1 = 3;
                break;
            case 'D': 
                num1 = 4;
                break;
            case 'E': 
                num1 = 5;
                break;
            case 'F': 
                num1 = 6;
                break;
            case 'G': 
                num1 = 7;
                break;
            case 'H': 
                num1 = 8;
                break;
            default: 
                num1 = null;
        }
        
        num2 = parseInt(str[1]);

        try{
            return new chess.Tile(num2, num1);
        }
        catch{
            return null;
        }

    }

    bot.on('message', message =>{
        function printBoard(theMessage){
            if(theMessage != "over"){
                message.channel.send(theMessage);
            } else {
                message.channel.send(new Discord.Attachment('./src/resources/winner.gif'));
            }
        }

        // checks to make sure the command is $prefix + channel
        if(message.content.startsWith(`${prefix}chess`)){
            
            // split command by spaces
            let command = message.content.slice(7);
            
            // do if the sub-command is create
            if(command.startsWith("move")){
                console.log("INFO move attempted.");
                // split message into an array based on the space delimeter.
                let args = command.split(' ');
                if(args.length > 3 || args.length < 2){
                    message.channel.send("The move command must be formatted like: \"!chess move fromTile toTile\"");
                    return;
                } else {
                    if (args[1] == 'castle') {
                        let to = args[2];
                        // send an error message if the move is too big or too small
                        if(to.length != 2 || !(typeof to[0] == 'string') || isNaN(parseInt(to[1])) ){
                            message.channel.send("A move's fromTile and toTile must be of the from 'XZ', where X is a letter A-H, and Z is a number 1-8.");
                            return;
                        }

                        let move = {
                            piece: genMove(to)
                        }

                        eventEmitter.emit(message.channel.name, move, printBoard, message.author.id);
                    } else {       
                  
                        let from = args[1];
                        let to = args[2];
                    
                        // send an error message if the move is too big or too small
                        if(from.length != 2 || !(typeof from[0] == 'string') || isNaN(parseInt(from[1])) || to.length != 2 || !(typeof to[0] == 'string') || isNaN(parseInt(to[1]))){
                            message.channel.send("A move's fromTile and toTile must be of the from 'XZ', where X is a letter A-H, and Z is a number 1-8.");
                            return;
                        }
        
                        let toMove = genMove(to);
                        let fromMove = genMove(from);
        
                        if(toMove == null || fromMove == null){
                            message.channel.send("A move's fromTile and toTile must be of the from 'XZ', where X is a letter A-H, and Z is a number 1-8.");
                            return;
                        }
        
                        // format for move communication to the chess API.
                        let move = {
                            from: fromMove,
                            to: toMove
                        }
        

                        eventEmitter.emit(message.channel.name , move, printBoard, message.author.id);}
                        
                }
                
            } else if (command.startsWith("play")) {
                try {
                    if(!message.channel.name.startsWith("chess-game-")){
                        var name = `chess-game-${ct}`;
                        
                        var options = {
                            type: "text"
                        };


                        // extract user id from message
                        const regex = /<@![0-9]*>/gim
                        var user = message.content.match(regex);
                        var user_id = user[0].slice(3, user[0].length - 1);


                        // create a channel that only some people have access to.
                        message.guild.createChannel(name, options).then(w => {
                            
                            // add a channel to the list of channels
                            channels.set(name, {
                                start: false,
                                name: name,
                                requestor: message.author.id,
                                requestee: user_id
                            })

                            w.overwritePermissions(message.guild.id, { VIEW_CHANNEL : false });
                            w.overwritePermissions(message.author.id, { VIEW_CHANNEL : true });
                            w.overwritePermissions(user_id, { VIEW_CHANNEL : true });
                            // send message to requestee in same channel
                            w.send(`<@!${user_id}>, please respond with "!chess yes" or "!chess no".`);
                        }).catch(console.error);

                        // incrementing to keep channels unique.
                        ct += 1;
                    } else {
                        message.reply("\"!chess play\" is not a legal command within a game room.");
                    }
                } catch {
                    message.reply("\"!chess play\" must be directed at a user by using \"!chess play @user_name\".");
                }
            } else if (command.startsWith("end-all")) {
                if (message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("MANAGE_CHANNELS") || message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS") ) {
                    eventEmitter.emit('kill'); 
                    channels.forEach(cl => {
                        var temp_channel = message.guild.channels.find(c => c.name == `${cl.name}`);
                        temp_channel.delete();
                        console.log(`INFO ${cl.name} has been deleted.`);
                    });
                    channels.clear();
                    message.reply("all chess games have been killed, and channels deleted.");
                    console.log('WARN all chess games killed, and channels deleted.');
                } else {
                    message.reply("insuffecient permissions.");
                }
            } else if (command.startsWith("yes")) {
                if (channels.has(message.channel.name) && channels.get(message.channel.name).requestee == message.author.id) {
                    if (!channels.get(message.channel.start)) {
                        var test = channels.get(message.channel.name);
                        test.start = true;
                        channels.set(test.name, test)

                        message.channel.send(`**Players**\nWhite: <@!${test.requestee}>\nBlack: <@!${test.requestor}>`)

                        games.push(new chess.Game(eventEmitter, message.channel.name));
                        games[games.length - 1].start(printBoard, test.requestee, test.requestor);
                        console.log(`INFO Game ${gameCount} started successfully.`);
                        gameCount++;
                    } else {
                        message.reply("unable to accept the match has already started.");
                    }
                } else {
                    message.reply("unable to start the game. You must be the requestee to accept.");
                }
            } else if (command.startsWith("no")) {
                if (channels.has(message.channel.name) && channels.get(message.channel.name).requestee == message.author.id) {
                    if (!channels.get(message.channel.start)) {
                        eventEmitter.emit('channel_delete', message.channel);
                        eventEmitter.emit('end', message.channel.name);
                    } else {
                        message.reply("unable to decline the match has already started.");
                    }
                } else {
                    message.reply("unable to start the game. You must be the requestee to decline.");
                }
            } else if (command.startsWith("help")) {
                message.channel.send(help_message());

            } else if (command.startsWith("ff")) {
                if (channels.has(message.channel.name) && ( message.author.id == channels.get(message.channel.name).requestee ||  message.author.id == channels.get(message.channel.name).requestor ) ) {
                    var name = message.author.username;
                    message.channel.send(`${name} has forfeited the match.`).then(setTimeout(() => {
                        eventEmitter.emit('channel_delete', message.channel);
                        eventEmitter.emit('end',  message.channel.name);
                    }, 120000));
                }

            } else {
                message.reply(`"${command}" is not a legal command. Please try "!help", for a list of available commands.`)
            }

        }
    });

    // delete single game when game over
    eventEmitter.on('gameOver', () => {
        for(let i = 0; i < games.length; i++){
            if(games[i].over){
                eventEmitter.removeAllListeners(games[i].gameEventString)
                console.log(`INFO ${games[i].gameEventString} over.`);
                delete games[i];
                games.splice(i, 1);
            } 
        }
    });

    // kill all games
    eventEmitter.on('kill', () => {
        for(let i = 0; i < games.length; i++){    
            eventEmitter.removeAllListeners(games[i].gameEventString)
            console.log(`INFO ${games[i].gameEventString} over.`);
            delete games[i];
            games.splice(i, 1);
        }
    });

    // kill single game
    eventEmitter.on('end', (channel_name) => {
        for(let i = 0; i < games.length; i++){    
            if(games[i].gameEventString == channel_name) {
                eventEmitter.removeAllListeners(games[i].gameEventString)
                console.log(`INFO ${games[i].gameEventString} over.`);
                delete games[i];
                games.splice(i, 1);
            }
        }
    });

    // delete a single channel, and it's corresponding entry in the channels map
    eventEmitter.on('channel_delete', (channel) => {
        if (channels.has(channel.name)) {
            channel.delete("Requestee declined match.");
            channels.delete(channel.name);
            console.log(`INFO ${channel.name} has been deleted.`);
        }
    });
    
}

function help_message(){
    var help = "**Chess Bot Help**\n"
            + "*Functional Commands*\n"
            + "\"!chess\" is the main command used to interact with the bot, and is the prefix for all other commands.\n"
            + "\"!chess play @user\" is the command used for requesting a match with another user.\n"
            + "\"!chess yes\" or \"!chess no\" are the commands used for accepting and declinging a match, respectively. Can only be used by the requestee.\n"
            + "\"!chess ff\" is the command for forfeiting the match, the game will end and the channel will be deleted after 2 minutes.\n"
            + "\"!chess end-all\" is the command for ending all matches, can only be used by admins.\n" 
            + "*Interactive Commands*\n"
            + "\"!chess move fromTile toTile\", this is the command for moving a piece on the board. fromTile and toTile must be of the from 'XZ', where X is a letter A-H, and Z is a number 1-8.\n"
            + "\"!chess castle XZ\", where XZ is a letter A-H, and Z is a number 1-8, and the tile is a rook that hasn't moved yet."

    return help;
}

