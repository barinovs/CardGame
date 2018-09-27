import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { beat, refreshPlayerCards, refreshComputerCards, refreshDeckCards } from '../actions/index'
import { addFromDeck, setTrump, setUnbanToMove } from '../assets/functions'

// Что происходит при нажатии на бито:
// [X] 1. Карты со стола перемещаются в битые карты
// [X] 2. Происходит смена ходящего
// [X] 3. Если нужно добираются карты игроков из колоды (первый добирает тот, кто ходил)
// [X] 4. Карты игроков обновляются
// [ ] 5. Все карты игроков доступны для хода
// [ ] 6. Если отбился комп, комп ходит самой слабой картой

class Beat extends React.Component{
    constructor(props) {
        super(props)
        this._beat = this._beat.bind(this);
    }

    _beat() {
        const { cardsOnTable,
                beatCards,
                player,
                computer,
                turn,
                cardDeck,
                trumpSuit,
                beat } = this.props;

        var _beatCards = [...beatCards, ...cardsOnTable]
        var _turn = (turn == "player") ? "computer" : "player";
        beat(_beatCards, _turn);

    }

    render() {

        return(
            <div><button
                    className="buttonBeat"
                    onClick = { () => this._beat() }>Бито</button></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cardsOnTable: state.cardsOnTable,
        beatCards   : state.beatCards,
        player: state.player,
        computer: state.computer,
        turn: state.turn,
        cardDeck: state.cardDeck,
        trumpSuit: state.trumpSuit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        beat: bindActionCreators(beat, dispatch),
        refreshPlayerCards: bindActionCreators(refreshPlayerCards, dispatch),
        refreshComputerCards: bindActionCreators(refreshComputerCards, dispatch),
        refreshDeckCards: bindActionCreators(refreshDeckCards, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beat)
