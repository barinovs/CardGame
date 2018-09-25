import React from 'react'

const TrumpIndicator = ({ trumpSuit }) => {
    console.log('TrumpIndicator ' + trumpSuit);
    var _trump = "";
    switch (trumpSuit) {
        case 1: _trump = "Буби"; break;
        case 2: _trump = "Черви"; break;
        case 3: _trump = "Вини"; break;
        case 4: _trump = "Крести"
    }

    return (
        <div>Козырь {_trump}</div>
    )
}

export default TrumpIndicator
