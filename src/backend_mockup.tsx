export function createNewGame() { //return player number of main player, and the only card in the usedPile
    return ([1, 5])
}

export function getPlayersCards(player: number, cardslocation: number[]): string[] {
    if (cardslocation.length == 4) {
        return (['1', '2', '3', '4'])
    }
    if (cardslocation.length == 2) {
        return (['6', '7'])
    }
    if (cardslocation.length == 1) { // obviusly will change with real backend, need to be based on the locations
        return (['8'])
    }
    return (['9']) 
}


export function getPileOrDeckCard(isDeck: boolean): string {
 if (isDeck) { 
    return('1')}
 if (!isDeck) {
    return('3')}
else{
    return('error');
}

}
