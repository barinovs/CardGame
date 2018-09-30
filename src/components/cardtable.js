import React from 'react'
import {connect} from 'react-redux'
import CardOfPlayer from './card'
import ButtonBeat from './buttonbeat'
import ButtonAddCards from './buttonaddcards'
import ButtonPlayerTakeCards from './buttonPlayerTakeCards'

class CardTable extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const { cardOnTable1, cardOnTable2, cardsOnTable } = this.props;
        return(
            <div className="cardTable">
                {/*
                <CardOfPlayer card={cardOnTable1} />
                <CardOfPlayer card={cardOnTable2} />
                */}
                {
                    cardsOnTable.map( (card, idx) => {
                    return <CardOfPlayer card={card} key={idx}  typeOfPlayer="playerCard"/>
                    } )
                }
                <ButtonBeat />
                <ButtonAddCards />
                <ButtonPlayerTakeCards />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   return {
       cardsOnTable: state.cardsOnTable
   }
}

export default connect(mapStateToProps)(CardTable)
