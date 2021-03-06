import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { motionPlayer,
         motionComputer,
         refreshPlayerCards,
         refreshComputerCards,
         computerTakesCards,
         setComputerCardToKill} from '../actions/index'

import { haveTrump,
         haveSuitableCard,
         findTrumps,
         findSuitableCards,
         sortByDignity,
         findSuitableCardStronger,
         findDignityes,
         setBanToMove,
         findCardForFlipping,
         setBanToMoveForPlayer} from '../assets/functions'


class Card extends React.Component{
  constructor(props) {
    super(props)
    this.motion = this.motion.bind(this);
  }

  motion(card, typeOfPlayer) {
      const { motionPlayer,
              motionComputer,
              player,
              computer,
              refreshPlayerCards,
              computerTakesCards,
              turn,
              computerCardToKill,
              trumpSuit,
              setComputerCardToKill} = this.props;

              var dignityes = [];

              var cardsOnTable = this.props.cardsOnTable;

              var newCardsOfPlayer = player.filter( _card => _card.name != card.name );
              cardsOnTable = [...cardsOnTable, card]

  // ============================================================
  // =============== ИГРОК АТАКУЕТ ==============================
  // ============================================================
      if (card.canMove) {
          // Если картой можно ходить
          if (turn == "player") {

              motionPlayer(card, newCardsOfPlayer, cardsOnTable)


              // Определим массивы карт компьютера
              var computerTrumps = sortByDignity(findTrumps(computer));
              var computerSuitables = sortByDignity(findSuitableCards(computer, card.suit));
              var suitableCardStronger = findSuitableCardStronger(computerSuitables, card.dignity);

              // определим наиболее подходящую карту компьютера для хода

                    // если игрок сходил козырем
                    if (card.trump) {
                        // если у компа нет козырей
                        if (computerTrumps.length == 0) {
                            // комп забирает карты
                            const newCardsOfComputer = [...computer, ...cardsOnTable];
                            setTimeout(computerTakesCards(newCardsOfComputer), 2000)
                        }
                        // иначе (у компа есть козыри)
                        else {
                            // если комп может перебить
                            if (suitableCardStronger) {
                                // комп ходит козырем
                                const newCardsOfComputer = computer.filter( _card => _card.name != suitableCardStronger.name )
                                cardsOnTable = [...cardsOnTable, suitableCardStronger]
                                motionComputer(suitableCardStronger, newCardsOfComputer, cardsOnTable)
                            }
                            // иначе
                            else {
                                const newCardsOfComputer = [...computer, ...cardsOnTable];
                                setTimeout(computerTakesCards(newCardsOfComputer), 2000)
                            }
                        }
                    }
                    // иначе (игрок сходил не козырем)
                    else{
                        // если у компа есть карта по масти, способная перебить
                        if (suitableCardStronger) {
                            // комп ходит картой по масти, способной перебить
                            const newCardsOfComputer = computer.filter( _card => _card.name != suitableCardStronger.name )
                            cardsOnTable = [...cardsOnTable, suitableCardStronger]
                            motionComputer(suitableCardStronger, newCardsOfComputer, cardsOnTable)
                        }
                        // иначе (у компа нет карт по масти, способных перебить)
                        else{
                            // если у компа есть козыри
                            if (computerTrumps.length > 0) {
                                // комп ходит самым слабым козырем
                                const newCardsOfComputer = computer.filter( _card => _card.name != computerTrumps[0].name )
                                cardsOnTable = [...cardsOnTable, computerTrumps[0]]
                                motionComputer(computerTrumps[0], newCardsOfComputer, cardsOnTable)
                            }
                            // иначе (у компа нет козырей)
                            else {
                                const newCardsOfComputer = [...computer, ...cardsOnTable];
                                setTimeout(computerTakesCards(newCardsOfComputer), 2000)
                            }
                        }
                    }

                // Определим карты игрока, которые можно подкинуть
                //dignityes = findDignityes(cardsOnTable)
                // Установим запреты для хода
                newCardsOfPlayer = setBanToMove(newCardsOfPlayer, cardsOnTable)
                refreshPlayerCards(newCardsOfPlayer)
            }


        // ============================================================
        // =============== ИГРОК ЗАЩИЩАЕТСЯ ===========================
        // ============================================================
        else {

            // Если игрок перебил карту компьютера
            if (card.dignity > computerCardToKill.dignity || card.suit == trumpSuit) {
                // если есть карты для подкидывания
                let cardForFlipping = findCardForFlipping(computer, cardsOnTable)
                if (cardForFlipping) {
                    // комп подкидывает карту
                    const newCardsOfComputer = computer.filter( _card => _card.name != cardForFlipping.name )
                    cardsOnTable = [...cardsOnTable, cardForFlipping]
                    motionComputer(cardForFlipping, newCardsOfComputer, cardsOnTable)
                    setComputerCardToKill(cardForFlipping)
                    setBanToMoveForPlayer(player, cardForFlipping.suit, trumpSuit)
                }
                // иначе (компу нечего подкинуть)
                else{
                    // кнопка Бито становится активной
                    alert('компу нечего подкинуть')

                }
                motionPlayer(card, newCardsOfPlayer, cardsOnTable)

            }
        }
    }
  }
  render() {
    const { idx, typeOfPlayer, card } = this.props;
    var _className = "card " + typeOfPlayer;

    (card.trump) ? _className += " isTrump" : _className;
    (card.canMove) ? _className += " canMove" : _className += " noMove";
    let background = ""
    if (typeOfPlayer == "playerCard") {
        background = "url(src/assets/" + card.href +")"
    }else{
        background = "url(src/assets/img/casing.png)"
    }

    return(
        <div
            className = {_className}
            onClick = { () => this.motion(card, typeOfPlayer) }
            style = {{ backgroundImage: background }}>&nbsp;
        </div>
    )
  }

}

const mapStateToProps = (state) => {
    return {
        coloda             : state.coloda,
        player             : state.player,
        computer           : state.computer,
        process            : state.process,
        cardsOnTable       : state.cardsOnTable,
        turn               : state.turn,
        computerCardToKill : state.computerCardToKill,
        trumpSuit          : state.trumpSuit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        motionPlayer:          bindActionCreators(motionPlayer, dispatch),
        motionComputer:        bindActionCreators(motionComputer, dispatch),
        refreshPlayerCards:    bindActionCreators(refreshPlayerCards, dispatch),
        refreshComputerCards:  bindActionCreators(refreshComputerCards, dispatch),
        computerTakesCards:    bindActionCreators(computerTakesCards, dispatch),
        setComputerCardToKill: bindActionCreators(setComputerCardToKill, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card)
