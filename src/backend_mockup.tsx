export function createNewGame() { //return ID of the new game, and the only card in the usedPile
    return ([123, 5])
}

export function getPlayersCards(player: number, cards: number[]) {
    if (cards.length == 4) {
        return (['1', '2', '3', '4'])
    }
    if (cards.length == 2) {
        return (['6', '7'])
    }
    if (cards.length == 1) {
        return (['8'])
    }
}
