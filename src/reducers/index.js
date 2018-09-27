import { ACTION_MOTION_PLAYER,
         ACTION_MOTION_COMPUTER,
         ACTION_REFRESH_PLAYER,
         ACTION_REFRESH_COMPUTER,
         ACTION_COMPUTER_TAKES_CARDS,
         ACTION_BEAT,
         ACTION_REFRESH_DECK } from '../constants/action-types'

import { setTrump } from '../assets/functions'

// import * as types from '../actions/actionTypes';

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function mySort(arr) {
    var sortArr = arr
}

import cardDeck from '../assets/cards.js'

var cardDeckRandom = cardDeck.sort(compareRandom).slice();

var player = new Array();
var computer = new Array();

cardDeckRandom.forEach( (elem, i) => {
  if (i <= 5) {
    player.push(elem);
  }else{
    if (i <= 11) {
      computer.push(elem);
    }
  }

} );

cardDeckRandom.splice(0,12);

// Определим козырную масть
const trumpSuit = cardDeckRandom[0].suit;

//Укажем козырные карты
player = setTrump(player, trumpSuit)
computer = setTrump(computer, trumpSuit)
cardDeckRandom = setTrump(cardDeckRandom, trumpSuit)


const initialState = {
  cardDeck: cardDeckRandom,
  player: player,
  computer: computer,
  process: "stop",
  trumpSuit: trumpSuit,
  cardsOnTable: [],
  beatCards: [],
  turn: "player"
};


export const rootReducer = (state = initialState, action) => {
    // console.log("action.type " + action.type);
    switch (action.type) {
        case ACTION_MOTION_PLAYER: {
            // console.log('action.values.card ' + action.card);
            return {...state,
                        player: action.newCardsOfPlayer,
                        process: action.payload,
                        cardsOnTable: action.cardsOnTable
                    }
        }
        case ACTION_MOTION_COMPUTER: {
            // console.log('action.values.card ' + action.card);
            return {...state,
                        computer: action.newCardsOfComputer,
                        process: action.payload,
                        cardsOnTable: action.cardsOnTable
                    }
        }
        case ACTION_REFRESH_PLAYER: {
            return {...state,
                        player: action.newCardsOfPlayer
            }
        }
        case ACTION_REFRESH_COMPUTER: {
            return {...state,
                        computer: action.newCardsOfComputer
            }
        }
        case ACTION_REFRESH_DECK: {
            return {...state,
                        cardDeck: action.newDeckCards
            }
        }
        case ACTION_COMPUTER_TAKES_CARDS: {
            return {...state,
                        cardsOnTable: [],
                        computer: action.newCardsOfComputer
            }
        }
        case ACTION_BEAT: {
            return {...state,
                        beatCards: action.beatCards,
                        cardsOnTable: [],
                        turn: action.turn
            }
        }
    }
    return state
}
