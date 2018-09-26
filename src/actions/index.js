import { ACTION_MOTION_PLAYER,
         ACTION_MOTION_COMPUTER,
         ACTION_REFRESH_CARDS,
         ACTION_COMPUTER_TAKES_CARDS,
         ACTION_BEAT } from '../constants/action-types'

export function motionPlayer(values, newCardsOfPlayer, cardsOnTable) {
   // console.log('values Action' + values.name);
    return {
        type: ACTION_MOTION_PLAYER,
        payload: "run",
        card: values,
        newCardsOfPlayer: newCardsOfPlayer,
        cardsOnTable: cardsOnTable
    };

}

export function motionComputer(values, newCardsOfComputer, cardsOnTable) {
  // console.log('values ' + values);
    return {
        type: ACTION_MOTION_COMPUTER,
        payload: "run",
        card: values,
        newCardsOfComputer: newCardsOfComputer,
        cardsOnTable: cardsOnTable
    };
}

export function refreshPlayerCards(newCardsOfPlayer) {
    return {
        type: ACTION_REFRESH_CARDS,
        newCardsOfPlayer: newCardsOfPlayer
    }
}

export function refreshComputerCards(newCardsOfComputer) {
    return {
        type: ACTION_REFRESH_COMPUTER,
        newCardsOfComputer: newCardsOfComputer
    }
}

export function computerTakesCards(newCardsOfComputer) {
    return {
        type: ACTION_COMPUTER_TAKES_CARDS,
        newCardsOfComputer: newCardsOfComputer
    }
}

export function beat() {
    return {
        type: ACTION_BEAT
    }
}
