import { Card, createPlayerHandByLocation } from './card';

class handCreationTest {
    hand1InputLocation : number[];
    hand1InputCards: Card []; 

    constructor() {
        this.hand1InputLocation = [0,3];
        this.hand1InputCards = [new Card, new Card];
    }

    executeTest() {
        let result = createPlayerHandByLocation(this.hand1InputLocation, this.hand1InputCards);
        return(result)
    }
}


let test1 = new handCreationTest;
let result = test1.executeTest;
