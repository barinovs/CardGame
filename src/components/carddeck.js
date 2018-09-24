import React from 'react'
import {connect} from 'react-redux'
import CardOfPlayer from './card'



class CardDeck extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
      const { cardDeck } = this.props;
        return(
            <div>
              {cardDeck.map( (card, idx) => {
                return <CardOfPlayer card={card}  key={idx}/>
              } )}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
   return {
       cardDeck: state.cardDeck,
       cardOnTable1: state.cardOnTable1,
       cardOnTable2: state.cardOnTable2
   }
}

export default connect(mapStateToProps)(CardDeck)
