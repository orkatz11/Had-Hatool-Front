import {createNewGameApiCall, ApiResultNewGame, getFirstLookCards, ApiFirstLookCards, clickDeck,clickPile, APIStackCard} from './apiHandling';
import { getPlayersCards, getPileOrDeckCard } from './backendMockup';
import {Card, CardValue, user_id } from './gameClasses'
import {string_to_card_value_enum} from './utils'


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


export async function createNewGame(user_id: number): Promise<CreateNewGameOut> { //return player number of main player, and the only card in the usedPile
    const result : ApiResultNewGame = await createNewGameApiCall(user_id)
    const newGameResult = new CreateNewGameOut  // needs to be an API call + takes result json and inserts it to the newgameout object
    newGameResult.playerIdNumbers = result.player_numbers;
    newGameResult.pileCard = new Card(string_to_card_value_enum(result.pile_Card))
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
    playerUserId: number;
    gameID: number;

    constructor() {
        this.cardsNeeded = {cardsSource: 1, cardsLocation: [9]}
        this.playerUserId = 1;  
        this.gameID = 0;
    }
}

class ExecutActionOut {
    cardsRecived: Card[];

    constructor() {
        this.cardsRecived = [];
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
    playerUserId: number

    constructor() {
        super()
        this.playerUserId = 0;  // since it is for every player
    }
}

export class FirstLookOut extends ExecutActionOut{
    nextTurn: number;

    constructor() {
        super()
        this.nextTurn = 0;
    }
}

export class FirstLookAction extends GameAction {
    async excecuteAction(firstLookIn: FirstLookIn): Promise<FirstLookOut> {
        const apiResult: ApiFirstLookCards = await getFirstLookCards(firstLookIn.playerUserId, firstLookIn.gameID); // check that this is an allowed action, and return the cards
        const res: FirstLookOut = new FirstLookOut();
        res.cardsRecived = apiResult.player_outer_cards.map(stringCard => new Card(string_to_card_value_enum(stringCard)));
        res.nextTurn = apiResult.next_turn;
        return res;
    }
}

export class ClickCardStackIn extends ExecutActionIn {
    isDeck: boolean;
    constructor() {
        super()
        this.playerUserId = 1;
        this.isDeck = false;
    }
}

export class ClickCardStackOut extends ExecutActionOut {
    constructor() {
        super()
    }
}

export class ClickCardStackAction extends GameAction {
    async excecuteAction(clickDeckIn: ClickCardStackIn): Promise<ClickCardStackOut> {
        let apiResult: APIStackCard;
        if (clickDeckIn.isDeck) {
            apiResult = await clickDeck(clickDeckIn.playerUserId, clickDeckIn.gameID);
        } else {
            apiResult = await clickPile(clickDeckIn.playerUserId, clickDeckIn.gameID);
        }

        const card: Card  = new Card(string_to_card_value_enum(apiResult.chosen_card))
        const res: ClickCardStackOut = new ClickCardStackOut();
        res.cardsRecived = [card];
        return res;

    }
}


// (actionChosen: GameActions, playerUserId: number, ownCard?: number, playerCard?: number):  {



// function availbleAction(actionChosen: GameActions, ownCard?: number, playerUserId?: number, playerCard?: number) {
//     send request availbleAction(actionChosen: string, ownCard ?: number, playerUserId ?: number, playerCard ?: number)
//     if response.actionChosen == 'action name':
//         doActionFunc(card, ...)
// }