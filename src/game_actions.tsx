import { getPlayersCards } from './backend_mockup';


export enum GameActions {
    FirstLook = 'firstLook',
    PickCard = 'pickCard',
}


class ExecutActionOut {

    cardsRecived: Map<[string, number[]], string[]>;

    constructor() {
        this.cardsRecived = new Map();
    }
}

class GameAction {

    executeAction<ExecutActionIn>(arg: ExecutActionIn): ExecutActionOut {
        const cardReturned = new ExecutActionOut();
        return cardReturned;
    }
}

class FirstLookIn {
    playerNumber: number

    constructor() {
        this.playerNumber = 1;
    }
}

class FirstLookOut {
    returnedCards: string[]

    constructor() {
        this.returnedCards = [];
    }
}

export class FirstLookAction extends GameAction {
    excecuteAction(firstLookIn: FirstLookIn): FirstLookOut {
        const cards: string[] = getPlayersCards(firstLookIn.playerNumber, [0, 3]); // check that this is an allowed action, and return the cards
        const res: FirstLookOut = new FirstLookOut
        res.returnedCards = cards;
        return res;
    }

}

// (actionChosen: GameActions, playerNumber: number, ownCard?: number, playerCard?: number):  {



// function availbleAction(actionChosen: GameActions, ownCard?: number, playerNumber?: number, playerCard?: number) {
//     send request availbleAction(actionChosen: string, ownCard ?: number, playerNumber ?: number, playerCard ?: number)
//     if response.actionChosen == 'action name':
//         doActionFunc(card, ...)
// }