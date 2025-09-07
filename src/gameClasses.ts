export {HadHatoolCard as Card, HadHatoolCardValue as CardValue}

enum HadHatoolCardValue{
Zero = 0,
One = 1, 
Two = 2, 
Three = 3,
Four = 4,
Five = 5,
Six = 6, 
Seven = 7, 
Eight = 8, 
Nine = 9,
Ten = 10,
// Add special card Values in the future
}


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