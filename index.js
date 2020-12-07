const config = require('./config.json')
const command = require('./command')

const Discord = require('discord.js')
const client = new Discord.Client()

const firebase = require('firebase/app')
const firebaseDB = firebase.initializeApp({
    apiKey: config.firebase_key,
    databaseURL: config.firebase_url,
    projectId: config.firebase_project_id
})

const Spotify = require('spotify-web-api-node')
const spotifyApi = new Spotify({
    clientId: config.spotify_client_id,
    clientSecret: config.spotify_client_secret,
    accessToken: config.spotify_access_token
});

const jpegMafiaID = '6yJ6QQ3Y5l0s0tn7b0arrO'

client.on('ready', () => {
    console.log("Discord Client Ready")

    command(client, 'add', message => {
        try {
            console.log(message.content)
            spotifyApi.searchArtists(message.content.replace(`${config.prefix}add `, '')).then(
                data => {
                    client.channels.cache.get('784183490543222784').send('Artist albums', JSON.stringify(data.body.items));
                    console.log(data.body.artists.items[0])
                }, error => {
                    console.log(error)
                }
            )

        } finally {
            message.channel.send('Adding artist')
        }
    })

    command(client, ['cc', 'clearchannel'], message => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

    spotifyApi.getArtistAlbums(jpegMafiaID).then(
        data => {
            client.channels.cache.get('784183490543222784').send('Artist albums', JSON.stringify(data.body.items[0].name));
        }, error => {
            console.error(error);
        }
    );

})

client.login(config.discord_token)