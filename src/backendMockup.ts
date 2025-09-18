import {Card, CardValue} from './gameClasses'




export function getPlayersCards(player: number, cardslocation: number[]): Card[] {
    const card1 = new Card(CardValue.ONE)
    const card2 = new Card(CardValue.TWO);
    const card3 = new Card(CardValue.THREE);
    const card4 = new Card(CardValue.FOUR);
    const card5 = new Card(CardValue.FIVE);
    const card6 = new Card(CardValue.SIX);
    const card7 = new Card(CardValue.SEVEN);
    const card8 = new Card(CardValue.EIGHT);
    const card9 = new Card(CardValue.NINE);

    if (cardslocation.length == 4) {

        return ([card1,card2, card3, card4])
    }
    if (cardslocation.length == 2) {
        return ([card6, card7])
    }
    if (cardslocation.length == 1) { // obviusly will change with real backend, need to be based on the locations
        return ([card8])
    }
    return ([card9]) 
}

export function getPileOrDeckCard(isDeck: boolean): Card {
    const card1 = new Card(CardValue.ONE);
    const card3 = new Card(CardValue.THREE);
    if (isDeck) { 
        return(card1)}
    else {
        return(card1)}

}
