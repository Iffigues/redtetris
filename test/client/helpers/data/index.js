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

export const visitor_player = {
  uuid: uuidv4(),
  name: "Player1",
  score: 0,
  admin: false,
  visitor: true,
  ...default_values_players
}

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
  },
  visitor_player
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


export const uuid_1 = uuidv4()
const uuid_2 = uuidv4() 
const uuid_3 = uuidv4() 
// ROOMS
export const rooms_1 = {
  [uuid_1]: {
    isPlaying: true,
    isStart: true,
    channel: uuid_1,
    players: fillPlayersRoom(players_1),
    ...default_values_room
  },
  [uuid_2]: {
    channel: uuid_2,
    players: fillPlayersRoom(players_2),
    ...default_values_room
  }
}

export const rooms_2 = {
  ...rooms_1,
  [uuid_3]: {
    channel: uuid_3,
    players: fillPlayersRoom(players_3),
    ...default_values_room
  }
}