import { ACTION_MOTION_PLAYER, ACTION_MOTION_COMPUTER } from '../constants/action-types'

// import * as types from '../actions/actionTypes';

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function mySort(arr) {
    var sortArr = arr
}

import cardDeck from '../assets/cards.js'

var cardDeckRandom = cardDeck.sort(compareRandom);

var player = new Array();
var computer = new Array();

cardDeck.forEach( (elem, i) => {
  if (i <= 5) {
    player.push(elem);
  }else{
    if (i <= 11) {
      computer.push(elem);
    }
  }

} );

cardDeck.splice(0,12);

const initialState = {
  cardDeck: cardDeck,
  player: player,
  computer: computer,
  cardOnTable1: {},
  cardOnTable2: {},
  process: "stop"
};


export const rootReducer = (state = initialState, action) => {
    console.log("action.type " + action.type);
    switch (action.type) {
        case ACTION_MOTION_PLAYER: {
            console.log('action.values.card ' + action.card);
            return {...state, process: action.payload, cardOnTable1: action.card}
        }
        case ACTION_MOTION_COMPUTER: {
            console.log('action.values.card ' + action.card);
            return {...state, process: action.payload, cardOnTable2: action.card}
        }
    }
    return state
}
