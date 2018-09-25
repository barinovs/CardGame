import { ACTION_MOTION_PLAYER, ACTION_MOTION_COMPUTER } from '../constants/action-types'

export function motionPlayer(values, newCardsOfPlayer) {
   // console.log('values Action' + values.name);
    return {
        type: ACTION_MOTION_PLAYER,
        payload: "run",
        card: values,
        newCardsOfPlayer: newCardsOfPlayer
    };

}

export function motionComputer(values, newCardsOfComputer) {
  // console.log('values ' + values);
    return {
        type: ACTION_MOTION_COMPUTER,
        payload: "run",
        card: values,
        newCardsOfComputer: newCardsOfComputer
    };

}
