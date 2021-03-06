import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { refreshPlayerCards,
         refreshComputerCards,
         refreshDeckCards,
         motionComputer,
         setComputerCardToKill } from '../actions/index'

import { addFromDeck,
         setTrump,
         setUnbanToMove,
         findTrumps,
         sortByDignity,
         findSuitableCardStronger,
         findNotTrumps,
         findSuitableCards,
         setBanToMove,
         setBanToMoveForPlayer} from '../assets/functions'


class ButtonAddCards extends React.Component{
    constructor(props) {
        super(props)
        this._addCards = this._addCards.bind(this);
    }

    _addCards() {
        const { player,
                computer,
                cardDeck,
                refreshPlayerCards,
                refreshDeckCards,
                refreshComputerCards,
                motionComputer,
                turn,
                computerCardToKill,
                setComputerCardToKill,
                trumpSuit} = this.props;

        var cardsOnTable = this.props.cardsOnTable;

        // var _beatCards = [...beatCards, ...cardsOnTable]
        //var _turn = (turn == "player") ? "computer" : "player";
        var _player = player.slice()
        var _computer = computer.slice()
        var _cardDeck = cardDeck.slice()

        // Добирание карт
        // Если в колоде есть карты
        if (_cardDeck.length > 0) {
            // если очередь ходить компа, то первым добирает игрок
            if (turn == "computer") {
                var arrayForRefresh = addFromDeck(_player, _cardDeck)
                setUnbanToMove(arrayForRefresh['arr'])
                refreshPlayerCards(arrayForRefresh['arr'])
                refreshDeckCards(arrayForRefresh['deck'])

                var arrayForRefresh = addFromDeck(_computer, _cardDeck)
                setUnbanToMove(arrayForRefresh['arr'])
                refreshComputerCards(arrayForRefresh['arr'])
                refreshDeckCards(arrayForRefresh['deck'])
            }
            // Иначе (очерь ходить у игрока) первым добирает комп
            else {
                var arrayForRefresh = addFromDeck(_computer, _cardDeck)
                setUnbanToMove(arrayForRefresh['arr'])
                refreshComputerCards(arrayForRefresh['arr'])
                refreshDeckCards(arrayForRefresh['deck'])

                var arrayForRefresh = addFromDeck(_player, _cardDeck)
                setUnbanToMove(arrayForRefresh['arr'])
                refreshPlayerCards(arrayForRefresh['arr'])
                refreshDeckCards(arrayForRefresh['deck'])
            }
        }


        var computerTrumps = sortByDignity(findTrumps(_computer));
        var computerNotTrumps = sortByDignity(findNotTrumps(_computer));
        // var suitableCardStronger = findSuitableCardStronger(computerSuitables, card.dignity);
        // если очередь ходить компа, то
        if (turn == "computer") {
            // если у компа одни козыри
            if (computerTrumps.length == _computer.length) {
                // комп ходит самым слабым козырем
                const newCardsOfComputer = _computer.filter( _card => _card.name != suitableCardStronger.name ) // ПЕРЕДЕЛАТЬ suitableCardStronger.name НЕ ПРОКАТИТ
                cardsOnTable = [...cardsOnTable, computerTrumps[0]]
                motionComputer(computerTrumps[0], newCardsOfComputer, cardsOnTable)
            }
            //иначе (у компа не только козыри или нет козырей)
            else {
                //комп ходит самым слабым некозырем
                const newCardsOfComputer = _computer.filter( _card => _card.name != computerNotTrumps[0].name )
                cardsOnTable = [...cardsOnTable, computerNotTrumps[0]]
                motionComputer(computerNotTrumps[0], newCardsOfComputer, cardsOnTable)
                setComputerCardToKill(computerNotTrumps[0])
            }
        }

        // Разбаним карты игрока
        let newCardDeck = setUnbanToMove(_cardDeck)
        let newPlayerCards = setUnbanToMove(_player)
        refreshDeckCards(newCardDeck)
        refreshPlayerCards(newPlayerCards)
        // // определим карты игрока, подходящие для хода

        if (turn == "computer") {
            var newCardsOfPlayer = setBanToMoveForPlayer(_player, computerNotTrumps[0].suit, trumpSuit)
            refreshPlayerCards(newCardsOfPlayer)
        }

    }

    render() {
        return(
            <div>
                <button
                    className="buttonAddCards"
                    onClick = { () => this._addCards() }>Добрать карты</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        player: state.player,
        computer: state.computer,
        cardDeck: state.cardDeck,
        turn: state.turn,
        cardsOnTable: state.cardsOnTable,
        computerCardToKill: state.computerCardToKill,
        trumpSuit: state.trumpSuit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshPlayerCards: bindActionCreators(refreshPlayerCards, dispatch),
        refreshComputerCards: bindActionCreators(refreshComputerCards, dispatch),
        refreshDeckCards: bindActionCreators(refreshDeckCards, dispatch),
        motionComputer: bindActionCreators(motionComputer, dispatch),
        setComputerCardToKill: bindActionCreators(setComputerCardToKill, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddCards)
