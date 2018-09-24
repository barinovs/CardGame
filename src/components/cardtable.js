import React from 'react'
import {connect} from 'react-redux'
import CardOfPlayer from './card'

class CardTable extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const { cardOnTable1, cardOnTable2 } = this.props;
        return(
            <div className="cardTable">
                <CardOfPlayer card={cardOnTable1} />
                <CardOfPlayer card={cardOnTable2} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
   return {
       cardOnTable1: state.cardOnTable1,
       cardOnTable2: state.cardOnTable2
   }
}

export default connect(mapStateToProps)(CardTable)
