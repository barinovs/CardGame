import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { beat } from '../actions/index'

// Что происходит при нажатии на бито:
// 1. Карты со стола перемещаются в битые карты
// 2. Если нужно добираются карты игроков из колоды (первый добирает тот, кто ходил)
// 3. Карты игроков обновляются
// 4. Происходит смена ходящего
// 5. Если отбился комп, комп ходит самой слабой картой

class Beat extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const { beat } = this.props;
        return(
            <div><button
                    className="buttonBeat"
                    onClick = { () => beat() }>Бито</button></div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        beat: bindActionCreators(beat, dispatch)
    }
}

export default connect(null, mapDispatchToProps)(Beat)
