import React from 'react';
import {connect} from 'react-redux'
import Player from './player'
import Computer from './computer'
import CardTable from './CardTable'
import CardDeck from './carddeck'


class MainComponent extends React.Component{
  render() {
    return(
      <div>
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
        player2: state.player2
    }
}

export default connect(mapStateToProps)(MainComponent)
