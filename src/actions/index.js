import { ACTION_MOTION_PLAYER, ACTION_MOTION_COMPUTER } from '../constants/action-types'

export function motionPlayer(values) {
   console.log('values Action' + values.name);
    return {
        type: ACTION_MOTION_PLAYER,
        payload: "run",
        card: values
    };

}

export function motionComputer(values) {
  // console.log('values ' + values);
    return {
        type: ACTION_MOTION_COMPUTER,
        payload: "run",
        card: values
    };

}
