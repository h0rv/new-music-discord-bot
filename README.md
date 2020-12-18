# new-music-discord-bot

> Explore music with your Discord server community

Bot that checks for new music from added artists daily at both midnight and noon.

Created using Discord.js API, Firebase database, and Spotify Web API. Hosted on Heroku for my own Discord server use.

---

## Usage

### Commands

- \>add
    - Add artist to your list of artists
- \>remove (rm)
    - Remove artist to your list of artists
 
- \>list (ls)
    - List all artists in your list of artists
 
- \>check
    - Check for new music from your list of artists
 
- \>help
    - List these available commands in server

---

## Installation

1. Clone or fork the repository.
2. Run:

```bash
npm install
```

3. Create app for [Discord](https://discord.com/developers/applications/), [Firebase](https://console.firebase.google.com/), and [Spotify](https://developer.spotify.com/dashboard/applications).
    - Activate Firebase database
4. Retrieve keys, secrets, and tokens from all apps.
5. Rename `sample.env` to `.env` and add corresponding values from above.
6. Add server channel ID that you want the messages to be sent to `.env` file.
7. Create server role named `New Music`.
8. Run bot locally on your machine:

```bash
npm start
```

9. Start adding artists!

---

![Sample Image](https://raw.githubusercontent.com/robbyhorvath/new-music-discord-bot/main/imgs/help.png) ![Sample Image](https://raw.githubusercontent.com/robbyhorvath/new-music-discord-bot/main/imgs/check.png)
