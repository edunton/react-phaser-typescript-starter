export type ScoreDirection = 'INCREMENT' | 'DECREMENT';
export type ActionType = {type:ScoreDirection}

export type GameState = {score:number}