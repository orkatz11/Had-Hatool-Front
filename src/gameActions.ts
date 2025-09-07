import {createNewGameApiCall, ApiResultNewGame} from './apiHandaling';
import { getPlayersCards, getPileOrDeckCard } from './backendMockup';
import {Card, CardValue } from './gameClasses'


export class CreateNewGameOut {
    gameIdNumber: number;
    playerIdNumbers: number[]; 
    pileCard: Card

    constructor (){
        this.gameIdNumber = 15;
        this.playerIdNumbers = [1, 2];
        this.pileCard = new Card;
    }

}


export async function createNewGame(): Promise<CreateNewGameOut> { //return player number of main player, and the only card in the usedPile
    const result : ApiResultNewGame = await createNewGameApiCall()
    const newGameResult = new CreateNewGameOut  // needs to be an API call + takes result json and inserts it to the newgameout object
    newGameResult.playerIdNumbers = result.player_numbers;
    newGameResult.pileCard = new Card(Number(result.pile_Card) as CardValue);
    newGameResult.gameIdNumber = result.game_id;
    return (newGameResult)
}


export enum GameActions {
    FirstLook = 'firstLook',
    PickCard = 'pickCard',
}


interface GetCardsExcecuteInput {
    cardsSource: number;  // 5 = deck, 6 = pile   //NEED TO CHANGE TO ENUM
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

    cardsRecived: Card[];
    nextTurn: number;

    constructor() {
        this.cardsRecived = [];
        this.nextTurn = 0;  //thisplayernumber + 1 modulu 2
    }
}

export class GameAction {

    // eslint-disable-next-line 
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
        const cards: Card[] = getPlayersCards(firstLookIn.playerNumber, [0, 3]); // check that this is an allowed action, and return the cards
        const res: FirstLookOut = new FirstLookOut();
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
        const card: Card = getPileOrDeckCard(takeCardIn.isDeck); // check that this is an allowed action, and return the card
        const res: TakeCardOut = new TakeCardOut();
        res.cardsRecived = [card];
        //res.cardsRecived[0] =  card;   --> FIX
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