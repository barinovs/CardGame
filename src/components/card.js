import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { motionPlayer, motionComputer } from '../actions/index'

import { haveTrump,
         haveSuitableCard,
         findTrumps,
         findSuitableCards,
         sortByDignity,
         findSuitableCardStronger } from '../assets/functions'


class Card extends React.Component{
  constructor(props) {
    super(props)
    this.motion = this.motion.bind(this);
  }

  motion(card, typeOfPlayer) {
      const { motionPlayer, motionComputer, player, computer } = this.props;
      if (typeOfPlayer == "player") {
        const newCardsOfPlayer = player.filter( _card => _card.name != card.name )
        motionPlayer(card, newCardsOfPlayer)
      }else{
        const newCardsOfComputer = computer.filter( _card => _card.name != card.name )
        motionComputer(card, newCardsOfComputer)
      }

      //Определим массивы карт компьютера
      var computerTrumps = sortByDignity(findTrumps(computer));
      var computerSuitables = sortByDignity(findSuitableCards(computer, card.suit));
      var suitableCardStronger = findSuitableCardStronger(computerSuitables, card.dignity);

      //определим наиболее подходящую карту компьютера для хода
      //если нет козырей
      if (computerTrumps.length == 0) {
          console.log('Нет козырей!');
          //если есть карта по масти
          if (computerSuitables.length > 0) {
              console.log('Есть карта по масти!');
              //если есть карта по масти мощнее
              if (suitableCardStronger) {
                  console.log('есть карта по масти мощнее');
                  //ход первой по мощности картой
                  const newCardsOfComputer = computer.filter( _card => _card.name != suitableCardStronger.name )
                  motionComputer(suitableCardStronger, newCardsOfComputer)                  
              }
          }

      }
      //иначе есть козыри
      else{
          console.log('Есть козыри!');
      }



            //иначе если нет карты по масти мощнее
                //комп берёт карты
        //иначе если нет карты по масти
        //комп берёт карты






  }

  render() {
    const { idx, typeOfPlayer, card } = this.props;
    var _className = "playerCard";
    (card.trump) ? _className += " isTrump" : _className;

    return(
        <div
            className = {_className}
            onClick = { () => this.motion(card, typeOfPlayer) }
            style = {{ backgroundImage: "url(src/assets/" + card.href +")" }}>&nbsp;
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
