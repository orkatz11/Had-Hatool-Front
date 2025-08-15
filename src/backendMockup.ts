import {Card, CardValue} from './card'




export function getPlayersCards(player: number, cardslocation: number[]): Card[] {
    const card1 = new Card(CardValue.One)
    const card2 = new Card(CardValue.Two);
    const card3 = new Card(CardValue.Three);
    const card4 = new Card(CardValue.Four);
    const card5 = new Card(CardValue.Five);
    const card6 = new Card(CardValue.Six);
    const card7 = new Card(CardValue.Seven);
    const card8 = new Card(CardValue.Eight);
    const card9 = new Card(CardValue.Nine);
    const card10 = new Card(CardValue.Ten);

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
    const card1 = new Card(CardValue.One);
    const card3 = new Card(CardValue.Three);
    if (isDeck) { 
        return(card1)}
    else {
        return(card1)}

}
