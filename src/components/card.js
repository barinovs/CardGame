import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { motionPlayer, motionComputer } from '../actions/index'

class Card extends React.Component{
  constructor(props) {
    super(props)
    this.motion = this.motion.bind(this);
  }

  motion(card, typeOfPlayer) {
      const { motionPlayer, motionComputer } = this.props;
      (typeOfPlayer == "player") ?
      motionPlayer(card) :
      motionComputer(card)
  }

  render() {
    const { idx, typeOfPlayer, card } = this.props;

    return(
        <div
            className="playerCard"
            onClick={ () => this.motion(card, typeOfPlayer) }
            style={{ backgroundImage: "url(src/assets/" + card.href +")" }}>&nbsp;
        </div>
    )
  }

}

const mapStateToProps = (state) => {
    return {
        coloda: state.coloda,
        player: state.player,
        computer: state.computer,
        process: state.process
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        motionPlayer: bindActionCreators(motionPlayer, dispatch),
        motionComputer: bindActionCreators(motionComputer, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
