//Imports Discord Bot
const Discord = require('discord.js')
const { forEachChild } = require('typescript')

//Enables usage of Command.js
const command = require('./command')

const serverid = "Enter Server ID here"

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.on('ready', () => {
    console.log('The client is ready!')

    //Replys to the message with all the commands and their needs.
    command(client, "!help", (message) => {
        message.reply({
            content: "**__Thank you for adding Frost Bot to your server! Below are the current features Frost Bot has:__** \n!creategamechannels (@role): Creates an announcement, general, memes, and voice text text channel, as well as 2 voice channels for the role. \n!createteamchannels (@role): Creates a schedule, strat, and general text channel, as well as a voice channel for the role \n!createtempchat (Desired name of the channel): Creates a voice and text chat in Temp General with the given name",
        })
    })

    //Creates a category, text channels for announcements, general, memes, voice text, and two voice channels for the given role
    command(client, '!creategamechannels', (message) => {
        message.author.send("Running");
        //Ensures that the person has the correct permissions to make sure it's not abused
        if (message.member.permissions.has("MANAGE_CHANNELS")) {
            
            //Gets the role that was mentioned in the message
            var role = message.content.replace('!creategamechannels ', '')

            //Ensures that a role was mentioned
            if (role.includes("<")) {

                //Does some tinkering to get the name of the role.
                const name = role.replace("<@&", "")

                const roleid = name.replace(">", "")

                const myRole = message.guild.roles.cache.get(roleid)

                //Creates the Category for the role. Allow allows that role to see the category
                message.guild.channels.create
                    (myRole.name, {
                        type: 'GUILD_CATEGORY',
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                            {

                                id: roleid,
                                allow: ['VIEW_CHANNEL']
                            },
                        ],

                    })

                //Creates the announcements chat, gives it the proper topic, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " announcements", {
                        type: 'text',
                    })
                    .then((channel) => {
                        channel.setTopic("This is the announcement channel for " + myRole.name + ". Either a bot, captain, or officer will post about " + myRole.name + " here.")
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })

                //Creates the general chat, gives it the proper topic, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " general", {
                        type: 'text',
                    })
                    .then((channel) => {
                        channel.setTopic("This is the general channel for " + myRole.name + ". Talk about anything related to " + myRole.name + " here.")
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })

                //Creates the memes chat, gives it the proper topic, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " memes", {
                        type: 'text',
                    })
                    .then((channel) => {
                        channel.setTopic("This is the memes channel for " + myRole.name + ". Post any memes related to " + myRole.name + " here.")
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })

                //Creates the voice chat 1 for the role, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " Voice 1", {
                        type: 'GUILD_VOICE',
                    })
                    .then((channel) => {
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })

                //Creates the voice chat 2 for the role, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " Voice 2", {
                        type: 'GUILD_VOICE',
                    })
                    .then((channel) => {
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })
            }
            //If they did not run the command correctly tells them.
            else {
                message.reply({
                    content: "You did not @ a role. Please do so.",
                })
            }
        }
    })

    //Creates a category, text channels for scheduling, strats, general, and a voice channel for the given role
    command(client, '!createteamchannels', (message) => {
        //Ensures that the person has the correct permissions to make sure it's not abused
        if (message.member.permissions.has("MANAGE_CHANNELS")) {

            //Gets the role that was mentioned in the message
            var role = message.content.replace('!createteamchannels ', '')

            //Ensures that a role was mentioned
            if (role.includes("<")) {

                //Does some tinkering to get the name of the role.
                const name = role.replace("<@&", "")

                const roleid = name.replace(">", "")

                const myRole = message.guild.roles.cache.get(roleid)

                //Creates the Category for the role. Allow allows that role to see the category
                message.guild.channels.create
                    (myRole.name, {
                        type: 'GUILD_CATEGORY',
                        permissionOverwrites: [
                            {
                                id: message.guild.id,
                                deny: ['VIEW_CHANNEL']
                            },
                            {

                                id: roleid,
                                allow: ['VIEW_CHANNEL']
                            },
                        ],

                    })

                //Creates the scheduling chat, gives it the proper topic, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " scheduling", {
                        type: 'text',
                    })
                    .then((channel) => {
                        channel.setTopic("This is the schdeuling channel for the " + myRole.name + " team. Do whatever is needed to schedule practices, games, etc..")
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })

                //Creates the strats chat, gives it the proper topic, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " strats", {
                        type: 'text',
                    })
                    .then((channel) => {
                        channel.setTopic("This the team strats channel for the " + myRole.name + " team. Discuss whatever strats or ideas that you have as a team.")
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })

                //Creates the general chat, gives it the proper topic, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " general", {
                        type: 'text',
                    })
                    .then((channel) => {
                        channel.setTopic("This the team general channel for the " + myRole.name + " team. Discuss amongst teammates.")
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })

                //Creates the voice chat for the team, then moves it to the newly made category
                message.guild.channels
                    .create(myRole.name + " Voice", {
                        type: 'GUILD_VOICE',
                    })
                    .then((channel) => {
                        const categoryId = message.guild.channels.cache.find(c => c.name === myRole.name)
                        channel.setParent(categoryId)
                    })
            }
            //If they did not run the command correctly tells them.
            else {
                message.reply({
                    content: "You did not @ a role. Please do so.",
                })
            }
        }
    })

    //Creates Voice and Text chats in Temp General for the given string with it
    command(client, "!createtempchat", (message) => {

        //Ensures only certain people can use the command
        if (message.member.permissions.has("MANAGE_CHANNELS")) {
            //Gets the name of what the chat should be named
            var game = message.content.replace('!createtempchat ', '')

            //Creates the text channel with an the topic providing useful info. Places chat in the Temp General Category
            message.guild.channels.create(game,{
                type:'text',
            })
                .then((channel) => {
                    channel.setTopic("This the temp chat for " + game.name + ". If it's used often and long enough, an officer will make it game chat.")
                    const tempCat = message.guild.channels.cache.find(c => c.name === "Temp General")
                    channel.setParent(tempCat)
                })

            //Creates the voice channel with an the topic providing useful info. Places chat in the Temp General Category
            message.guild.channels.create(game, {
                type: 'GUILD_VOICE',
            })
                .then((channel) => {
                    const tempCat = message.guild.channels.cache.find(c => c.name === "Temp General")
                    channel.setParent(tempCat)
                })
        }
    })
})

client.login(serverid)
