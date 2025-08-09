export {Card, CardValue}


enum CardValue{
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

class Card{
    value: CardValue | UnknownValue;

    constructor(newCardValue?: CardValue | UnknownValue) {
        if (newCardValue != null){ 
            this.value = newCardValue;
        }
        else{ 
            this.value = UNKNOWN_VALUE;
        }
    }





    
}