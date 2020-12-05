const config = require('./config.json')
const Discord = require('discord.js')
const discordClient = new Discord.Client()
const firebase = require('firebase/app')
const firebaseDB = firebase.initializeApp({
    apiKey: config.firebase_key,
    databaseURL: config.firebase_url,
    projectId: config.firebase_project_id
})
const Spotify = require('spotify-web-api-node')
const spotifyApi = new Spotify();
spotifyApi.setAccessToken(config.spotify_auth_key)

const jpegMafiaID = '6yJ6QQ3Y5l0s0tn7b0arrO'

discordClient.on('ready', () => {
    spotifyApi.getArtist(jpegMafiaID).then(data => {
        discordClient.channels.cache.get('784183490543222784').send(data.body.genres[0])
    }, error => {
        console.error(error)

    })
})

discordClient.login(config.discord_token)