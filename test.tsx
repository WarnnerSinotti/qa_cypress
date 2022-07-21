const fs = require('fs');

//Selecionando dados do log
const INIT_GAME = /InitGame:/g;
const GAME_ACTION = /Kill: \d+ \d+ \d+: (?<killer>.+) killed (?<dead>.+) by (?<weapon>.+)$/gm
const PLAYER_ADDED = /ClientUserinfoChanged: \d+ (n\\|\\0|\\t)(?<player>[\w ]+)/g

function updateScore(game, line) {

    const value = PLAYER_ADDED.exec(line) || { groups: { player: "" } }
    const { groups: { player } } = value
    if (player !== "" && !game.players.includes(player)) {
        game.players.push(player)
        game.kills[player] = ""
        game.deads[player] = ""
    }

    const result = GAME_ACTION.exec(line)
    if (result) {
        const { groups: { killer, dead, weapon } } = result
        if (game.kills[killer] >= 0) {
            game.kills[killer]++
            game.total_Kills++
        }

        if (game.deads[dead] >= 0) {
            game.deads[dead]++
            game.total_Deads++
        }

        if (!game.killsByMeans[weapon]) {
            game.killsByMeans[weapon] = 0
        }
        game.killsByMeans[weapon]++
    }
}

fs.readFile('cypress/downloads/qgames.log', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    let count = 0
    const log = data.split(/[\r\n]+/)
    const result = log.map(line => {
        const isNew = INIT_GAME.test(line)
        return { isNew, line }
    }).reduce((games, event) => {
        if (event.isNew) {
            const gameId = `game-${++count}`
            games[gameId] = games[gameId] ?? { total_Kills: 0, total_Deads: 0, players: [], kills: {}, deads: {}, killsByMeans: {} }
        } else if (count > 0 && games[`game-${count}`]) {
            const gameId = `game-${count}`
            const lastGame = games[gameId]
            updateScore(lastGame, event.line)
        }
        return games
    }, {})

    console.log(result)
})
