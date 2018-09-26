import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { beat } from '../actions/index'

// Что происходит при нажатии на бито:
// [X] 1. Карты со стола перемещаются в битые карты
// 2. Происходит смена ходящего
// 3. Если нужно добираются карты игроков из колоды (первый добирает тот, кто ходил)
// 4. Карты игроков обновляются
// 5. Если отбился комп, комп ходит самой слабой картой

class Beat extends React.Component{
    constructor(props) {
        super(props)
        this._beat = this._beat.bind(this);
    }

    _beat() {
        const { beat, cardsOnTable, beatCards, player, computer, turn, cardDeck } = this.props;
        var _beatCards = [...beatCards, ...cardsOnTable]
        var _turn = (turn == "player") ? "computer" : "player";
        var _player = []
        var _cardDeck = cardDeck
        beat(_beatCards, _turn);

        // Добирание карт
        // Если в колоде есть карты
        if (_cardDeck.length > 0) {
            // если очередь ходить компа, то добирает игрок
            if (_turn == "computer") {
                // пока в колоде есть карты и у игрока менее 6 карт игрок добирает карты
                var i = 0
                while(_cardDeck.length > 0 && player.length < 6) {
                    player.push(_cardDeck[i])
                    i++
                }
                _cardDeck.splice(0, i)

            }
        }
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
        cardDeck: state.cardDeck
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        beat: bindActionCreators(beat, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Beat)
