import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { refreshPlayerCards, refreshComputerCards, refreshDeckCards, motionComputer } from '../actions/index'
import { addFromDeck, setTrump, setUnbanToMove, findTrumps, sortByDignity, findSuitableCardStronger, findNotTrumps } from '../assets/functions'


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
                turn } = this.props;

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

        // если очередь ходить компа, то
        var computerTrumps = sortByDignity(findTrumps(_computer));
        var computerNotTrumps = sortByDignity(findNotTrumps(_computer));
        // var suitableCardStronger = findSuitableCardStronger(computerSuitables, card.dignity);
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
            }
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
        cardsOnTable: state.cardsOnTable
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        refreshPlayerCards: bindActionCreators(refreshPlayerCards, dispatch),
        refreshComputerCards: bindActionCreators(refreshComputerCards, dispatch),
        refreshDeckCards: bindActionCreators(refreshDeckCards, dispatch),
        motionComputer: bindActionCreators(motionComputer, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAddCards)
