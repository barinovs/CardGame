export const setTrump = (arr, trumpSuit) => {
    var newArr = arr.map( (card) => {
        (card.suit == trumpSuit) ? card.trump = true : card.trump = false
        return card
    })
    return newArr;
}

function compareDignity(a, b) {
    return a.dignity - b.dignity;
}

function uniq(arr) {
    return arr.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    })
}

export function sortByDignity(arr) {
    return arr.sort(compareDignity);
}


export const haveTrump = (arr) => {
    return arr.some( card => {
        return card.trump
    })
}

export const haveSuitableCard = (arr, suit) => {
    return arr.some( card => {
        if (card.suit == suit) return true
    })
}

export const haveStrongerCard = (arr, dignity) => {
    return arr.some( card => {
        if (dignity > card.dignity) return true
    })
}

// Функция поиска козырных карт
export const findTrumps = (arr) => {
    return arr.reduce( (trumps, card) => {
        if (card.trump) return [...trumps, card];
        else return trumps
    }, [] )
    return trumps = sortByDignity(trumps)
}

// Функция поиска НЕкозырных карт
export const findNotTrumps = (arr) => {
    return arr.reduce( (notTrumps, card) => {
        if (!card.trump) return [...notTrumps, card];
        else return notTrumps
    }, [] )
    return notTrumps = sortByDignity(notTrumps)
}

// Функция поиска карт по масти
export const findSuitableCards = (arr, suit) => {
    return arr.reduce( (suitables, card) => {
        if (card.suit == suit) return [...suitables, card];
        else return suitables
    }, [])
}

// Функция поиска карты по масти, способной перебить
export const findSuitableCardStronger = (arr, dignity) => {
    return arr.filter( elem => elem.dignity > dignity)[0]
}

// Функция поиска номиналов карт для подкидывания
export const findDignityes = (arr) => {
    var dignityes = arr.reduce( (dignityes, card) => {
        return [...dignityes, card.dignity]
    }, [] )

    return uniq(dignityes)
}

// Функция для установки запрета хода картой
export const setBanToMove = (arr, cardsOnTable) => {
    var _arr = arr.map( card => {
        for (var i=0; i < cardsOnTable.length; i++) {
            if (cardsOnTable[i].dignity == card.dignity) {
                card.canMove = true; break
            }else{
                card.canMove = false
            }
        }
        return card
    })
    return _arr
}

// Функция для снятия запрета хода картой
export const setUnbanToMove = (arr) => {
    var _arr = arr.map( card => {
        card.canMove = true
        return card
    })
    return _arr
}

// Функция добирания карт из колоды
export const addFromDeck = (arr, deck) => {
    var returnedArr = []
    var i = 0
    while(deck.length > 0 && arr.length < 6) {
        arr.push(deck[i])
        i++
    }
    deck.splice(0, i)

    returnedArr['arr'] = arr
    returnedArr['deck'] = deck

    return returnedArr

}
