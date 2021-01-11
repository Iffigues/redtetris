import uuidv4 from 'uuid'


// UTILS AND CONSTANTS
const GAME_WIDTH = 10;
const GAME_HEIGHT = 20;
const default_values_players = {
  sheets: [],
  indestructible: 0,
  time: 1000,
  isPlaying: false,
  visitor: false,
  currentMapGame: Array.from(Array(GAME_HEIGHT), () => new Array(GAME_WIDTH).fill(0)),
  nextMapGame: Array.from(Array(GAME_HEIGHT), () => new Array(GAME_WIDTH).fill(0)),
  block: null
}

const default_values_room = {
 isStart: false,
 isPlaying: false
}

const fillPlayersRoom = (players) => {
  let result = {}
  players.map(player => {
    result[player.uuid] = player
  })
  return result;
}


// PLAYERS
export const players_1 = [
  {
    uuid: uuidv4(),
    name: "Player1",
    score: 0,
    admin: true,
    ...default_values_players
  },
  {
    uuid: uuidv4(),
    name: "Player2",
    score: 0,
    admin: false,
    ...default_values_players
  }
]
export const players_2 = [
  {
    uuid: uuidv4(),
    name: "Player3",
    score: 0,
    admin: true,
    ...default_values_players
  },
  {
    uuid: uuidv4(),
    name: "Player4",
    score: 0,
    admin: false,
    ...default_values_players
  }
]

export const players_3 = [
  {
    uuid: uuidv4(),
    name: "Player001",
    score: 0,
    admin: true,
    ...default_values_players
  },
  {
    uuid: uuidv4(),
    name: "Player002",
    score: 0,
    admin: false,
    ...default_values_players
  }
]


// ROOMS
export const rooms_1 = [
  {
    channel: uuidv4(),
    players: fillPlayersRoom(players_1),
    ...default_values_room
  },
  {
    channel: uuidv4(),
    players: fillPlayersRoom(players_2),
    ...default_values_room
  }
]

export const rooms_2 = [
  ...rooms_1,
  {
    channel: uuidv4(),
    players: fillPlayersRoom(players_3),
    ...default_values_room
  }
]