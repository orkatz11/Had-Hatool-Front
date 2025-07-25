import { getPlayersCards, getPileOrDeckCard } from './backend_mockup';


export enum GameActions {
    FirstLook = 'firstLook',
    PickCard = 'pickCard',
}

interface GetCardsExcecuteInput {
    cardsSource: number;  // 5 = deck, 6 = pile
    cardsLocation: number[];

}

class ExecutActionIn {

    cardsNeeded: GetCardsExcecuteInput;  //[which player, which cards] --> 
    playerNumber: number;

    constructor() {
        this.cardsNeeded = {cardsSource: 1, cardsLocation: [9]}
        this.playerNumber = 1;  
    }
}

class ExecutActionOut {

    cardsRecived: string[];
    nextTurn: number;

    constructor() {
        this.cardsRecived = [];
        this.nextTurn = 0;  //thisplayernumber + 1 modulu 2
    }
}

export class GameAction {

    executeAction<ExecutActionIn>(input: ExecutActionIn): ExecutActionOut {
        const cardReturned = new ExecutActionOut();
        return cardReturned;
    }
}

export class FirstLookIn extends ExecutActionIn{
    playerNumber: number

    constructor() {
        super()
        this.playerNumber = 0;  // since it is for every player
    }
}

export class FirstLookOut extends ExecutActionOut{
    
    constructor() {
        super()
        this.nextTurn = 1;
    }
}

export class FirstLookAction extends GameAction {
    excecuteAction(firstLookIn: FirstLookIn): FirstLookOut {
        const cards: string[] = getPlayersCards(firstLookIn.playerNumber, [0, 3]); // check that this is an allowed action, and return the cards
        const res: FirstLookOut = new FirstLookOut;
        res.cardsRecived = cards;
        // res.nextTurn = getNextTurn() !!

        return res;
    }

}

export class TakeCardIn extends ExecutActionIn {
    isDeck: boolean;

    constructor() {
        super()
        this.playerNumber = 1;
        this.isDeck = false;
    }
}

export class TakeCardOut extends ExecutActionOut {

    constructor() {
        super()
        this.nextTurn = 1;
    }


}

export class TakeCardAction extends GameAction {
    excecuteAction(takeCardIn: TakeCardIn): TakeCardOut {
        const card: string = getPileOrDeckCard(takeCardIn.isDeck); // check that this is an allowed action, and return the card
        const res: FirstLookOut = new FirstLookOut;
        res.cardsRecived[0] =  card;
        // res.nextTurn = getNextTurn() !!

        return res;

    }
}


// (actionChosen: GameActions, playerNumber: number, ownCard?: number, playerCard?: number):  {



// function availbleAction(actionChosen: GameActions, ownCard?: number, playerNumber?: number, playerCard?: number) {
//     send request availbleAction(actionChosen: string, ownCard ?: number, playerNumber ?: number, playerCard ?: number)
//     if response.actionChosen == 'action name':
//         doActionFunc(card, ...)
// }