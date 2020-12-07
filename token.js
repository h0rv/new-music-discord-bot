// Create the api object with the credentials
const Spotify = require('spotify-web-api-node')
const config = require('./config.json')
const spotifyApi = new Spotify({
    clientId: config.spotify_client_id,
    clientSecret: config.spotify_client_secret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
        console.log('Something went wrong when retrieving an access token', err);
    }
);