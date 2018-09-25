function compareDignity(a, b) {
    return a.dignity - b.dignity;
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

export const findTrumps = (arr) => {
    return arr.reduce( (trumps, card) => {
        if (card.trump) return [...trumps, card];
        else return trumps
    }, [] )
    return trumps = sortByDignity(trumps)
}

export const findSuitableCards = (arr, suit) => {
    return arr.reduce( (suitables, card) => {
        if (card.suit == suit) return [...suitables, card];
        else return suitables
    }, [])
}

export const findSuitableCardStronger = (arr, dignity) => {
    return arr.filter( elem => elem.dignity > dignity)[0]
}
