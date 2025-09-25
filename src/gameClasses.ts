export {HadHatoolCard as Card, HadHatoolCardValue as CardValue}

enum HadHatoolCardValue{
ZERO = 0,
ONE = 1, 
TWO = 2, 
THREE = 3,
FOUR = 4,
FIVE = 5,
SIX = 6, 
SEVEN = 7, 
EIGHT = 8, 
NINE = 9,
PEAK = 10,
DRAW2 = 11,
SWAP = 12,
Ten
// Add special card Values in the future
}

export const user_id = 111;
export const UNKNOWN_VALUE = 300;
export type UnknownValue = typeof UNKNOWN_VALUE;

class HadHatoolCard{
    value: HadHatoolCardValue | UnknownValue;

    constructor(newCardValue?: HadHatoolCardValue | UnknownValue) {
        if (newCardValue != null){ 
            this.value = newCardValue;
        }
        else{ 
            this.value = UNKNOWN_VALUE;
        }
    } 
}


export function createPlayerHandByLocation(locations?: number[], cards? : HadHatoolCard[]) :HadHatoolCard[] {  // returnes empty hand if no input

    const playerHand: HadHatoolCard[] = Array.from({ length: 4 }, () => new HadHatoolCard());
    if (cards != null && locations != null) {
        for (let locationIndex = 0; locationIndex < locations.length+1; locationIndex++) {

            playerHand[locations[locationIndex]] =  cards[locationIndex]; 
        }
    }
    
    return(playerHand);
    
}