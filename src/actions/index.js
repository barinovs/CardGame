import { ACTION_MOTION_PLAYER,
         ACTION_MOTION_COMPUTER,
         ACTION_REFRESH_PLAYER,
         ACTION_REFRESH_COMPUTER,
         ACTION_COMPUTER_TAKES_CARDS,
         ACTION_BEAT,
         ACTION_REFRESH_DECK,
         ACTION_SET_COMPUTER_CARD_TO_KILL } from '../constants/action-types'

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
        type: ACTION_REFRESH_PLAYER,
        newCardsOfPlayer: newCardsOfPlayer
    }
}

export function refreshComputerCards(newCardsOfComputer) {
    return {
        type: ACTION_REFRESH_COMPUTER,
        newCardsOfComputer: newCardsOfComputer
    }
}

export function refreshDeckCards(newDeckCards) {
    return {
        type: ACTION_REFRESH_DECK,
        newDeckCards: newDeckCards
    }
}

export function computerTakesCards(newCardsOfComputer) {
    return {
        type: ACTION_COMPUTER_TAKES_CARDS,
        newCardsOfComputer: newCardsOfComputer
    }
}

export function beat(beatCards, turn) {
    return {
        type: ACTION_BEAT,
        beatCards: beatCards,
        turn: turn
    }
}

export function setComputerCardToKill(computerCardToKill) {
    return {
        type: ACTION_SET_COMPUTER_CARD_TO_KILL,
        computerCardToKill: computerCardToKill
    }
}
