const config = require('./config.json') // config file to store API keys
const command = require('./command')

const Discord = require('discord.js')
const client = new Discord.Client()

const firebase = require('firebase')
firebase.initializeApp({
    apiKey: config.firebase_key,
    databaseURL: config.firebase_url,
    projectId: config.firebase_project_id
})
const database = firebase.database()

const SpotifyWebApi = require('spotify-web-api-node')
const spotifyApi = new SpotifyWebApi({
    clientId: config.spotify_client_id,
    clientSecret: config.spotify_client_secret,
})

let artistArray = new Array()

async function main() {
    await fillArtistArray()
    await refreshAccessToken()

    client.on('ready', () => {
        console.log("Discord Client Ready")

        command(client, 'add', message => {
            let artistName = message.content.replace(`${config.prefix}add `, '')
            if (message.content === `${config.prefix}add` || !artistName) {
                message.channel.send(`Enter a valid artist name. i.e. \'${config.prefix}add Drake\'`)
            } else {
                spotifyApi.searchArtists(artistName, {
                    limit: 1
                }).then(
                    data => {
                        let artistData = data.body.artists.items[0]
                        if (artistData) {
                            message.channel.send(`${artistName}:  ${artistData.name}`)
                            addNewArtist(artistData.name.replace('$', 'S').replace(',', ''), artistData.uri.replace('spotify:artist:', ''))
                        } else {
                            message.channel.send(`Enter a valid artist name. i.e. \'${config.prefix}add Drake\'`)
                        }
                    }, err => {
                        console.error(err)
                    }
                )
            }
        })

        command(client, ['ls', 'list'], message => {
            if (artistArray) {
                let output = '**__All artists__**: \n\n'
                artistArray.forEach(artist => {
                    output += `${artist.name} ${artist.uri}\n`
                })
                message.channel.send(output)
            }
        })

        command(client, ['cc', 'clearchannel'], message => {
            if (message.member.hasPermission('ADMINISTRATOR')) {
                message.channel.messages.fetch().then((results) => {
                    message.channel.bulkDelete(results)
                })
            }
        })

    })
}

main()
client.login(config.discord_token)

async function addNewArtist(name, uri) {
    database.ref('artists/').child(name).set(uri);
}

async function fillArtistArray() {
    database.ref('artists/').once('value', snapshot => {
        let counter = 0
        snapshot.forEach(childSnapshot => {
            artistArray.push({
                name: Object.keys(snapshot.val())[counter],
                uri: childSnapshot.val()
            })
            counter++
        })
    }, err => {
        console.error(err)
    })
}

async function refreshAccessToken() {
    spotifyApi.clientCredentialsGrant().then(
        data => {
            // console.log(data.body)
            // console.log('The access token expires in ' + data.body['expires_in']);
            // console.log('The access token is ' + data.body['access_token']);

            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
        }, err => {
            console.log('Something went wrong when retrieving an access token', err);
        }
    )
}