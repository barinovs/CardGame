import { ACTION_MOTION_PLAYER,
         ACTION_MOTION_COMPUTER,
         ACTION_REFRESH_CARDS,
         ACTION_REFRESH_COMPUTER,
         ACTION_COMPUTER_TAKES_CARDS,
         ACTION_BEAT } from '../constants/action-types'

// import * as types from '../actions/actionTypes';

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function mySort(arr) {
    var sortArr = arr
}

function setTrump(arr) {
    var newArr = arr.map( (card) => {
        (card.suit == trumpSuit) ? card.trump = true : card.trump = false
        return card
    })
    return newArr;
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

// Определим козырную масть
const trumpSuit = cardDeck[0].suit;

//Укажем козырные карты
player = setTrump(player)
computer = setTrump(computer)


const initialState = {
  cardDeck: cardDeck,
  player: player,
  computer: computer,
  process: "stop",
  trumpSuit: trumpSuit,
  cardsOnTable: [],
  beatCards: []
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
        case ACTION_REFRESH_CARDS: {
            return {...state,
                        player: action.newCardsOfPlayer
            }
        }
        case ACTION_REFRESH_COMPUTER: {
            return {...state,
                        computer: action.newCardsOfComputer
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
                        cardsOnTable: []
            }
        }
    }
    return state
}
