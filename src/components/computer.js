import React from 'react';
import {connect} from 'react-redux'
import CardOfPlayer from './card'

class Computer extends React.Component{
  render() {
    const { computer } = this.props;

    const cards = computer
    console.log(cards)

    return (
      <div className="player">
        {cards.map( (card, idx) => {
          return <CardOfPlayer card={card} key={idx} typeOfPlayer={"computerCard"}/>
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

export default connect(mapStateToProps)(Computer)
