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


export function createPlayerHandByLocation(locations: number[], cards: HadHatoolCard[]) :HadHatoolCard[] {

    const playerHand: HadHatoolCard[] = Array.from({ length: 4 }, () => new HadHatoolCard());

    for (let locationIndex:number = 0; locationIndex < 4; locationIndex++) {

            playerHand[locations[locationIndex]] =  cards[locationIndex]; 
            locationIndex++;  // moving to the next location needed to feel, they are sorted so this will work
        }
    
        return(playerHand);
    }      
    
