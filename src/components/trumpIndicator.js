import React from 'react'

const TrumpIndicator = ({ trumpSuit, turn }) => {
    // console.log('TrumpIndicator ' + trumpSuit);
    var _trump = "";
    switch (trumpSuit) {
        case 1: _trump = "Буби"; break;
        case 2: _trump = "Черви"; break;
        case 3: _trump = "Вини"; break;
        case 4: _trump = "Крести"
    }

    return (
        <div>
            <h2>Козырь {_trump}</h2>
            <h2>Ходит {turn}</h2>
        </div>
    )
}

export default TrumpIndicator
