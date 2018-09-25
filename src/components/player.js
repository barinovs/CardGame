import React from 'react';
import {connect} from 'react-redux'
import CardOfPlayer from './card'

class Player extends React.Component{
  render() {
    const { player } = this.props;

    var cards = player;

    return (
      <div className="player">
        {cards.map( (card, idx) => {
          return <CardOfPlayer card={card} key={idx} typeOfPlayer={"player"} />
      } )
    }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        coloda: state.coloda,
        player: state.player,
        computer: state.computer,
        trumpSuit: state.trumpSuit
    }
}

export default connect(mapStateToProps)(Player)
