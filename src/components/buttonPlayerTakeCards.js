import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as my from '../assets/functions'

import { refreshPlayerCards,
         refreshComputerCards,
         refreshDeckCards,
         motionComputer,
         setComputerCardToKill,
         playerTakesCards} from '../actions/index'


class ButtonPlayerTakeCards extends React.Component{
    constructor(props) {
        super(props)
        this._playerTakesCards = this._playerTakesCards.bind(this);
    }

    _playerTakesCards() {
        const { player, cardsOnTable, playerTakesCards } = this.props
        const newCardsOfPlayer = [...player, ...cardsOnTable];
        setTimeout(playerTakesCards(newCardsOfPlayer), 2000)
    }

    render() {
        return(
            <div>
            <button
                className="buttonPlayerTakeCards"
                onClick = { () => this._playerTakesCards() }>Беру!</button>
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
        playerTakesCards: bindActionCreators(playerTakesCards, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonPlayerTakeCards)
