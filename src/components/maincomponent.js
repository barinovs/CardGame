import React from 'react';
import {connect} from 'react-redux'
import Player from './player'
import Computer from './computer'
import CardTable from './CardTable'
import CardDeck from './carddeck'
import TrumpIndicator from './trumpIndicator'


class MainComponent extends React.Component{
  render() {
      console.log('MainComponent ' + this.props.trumpSuit);
    return(
      <div>
          <TrumpIndicator trumpSuit={this.props.trumpSuit} turn={this.props.turn} />
        <Player />
        <br/>
        <CardTable />

        <Computer />

        <CardDeck />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        coloda: state.coloda,
        player1: state.player1,
        player2: state.player2,
        trumpSuit: state.trumpSuit,
        turn: state.turn
    }
}

export default connect(mapStateToProps)(MainComponent)
