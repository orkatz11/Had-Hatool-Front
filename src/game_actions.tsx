import './backend_mockup.tsx';


export enum GameActions {
    FirstLook = 'firstLook',
    PickCard = 'pickCard',
}


class ActionData {

    availbleActions: GameActions[];
    cardsRecived: Map<[string, number[]], string[]>;

    constructor() {
        this.availbleActions = [];
        this.cardsRecived = new Map();
    }
}

// the interface has only the 'availble action' and 'request update' functions

export function initializeGame(): GameActionsFunctions {
    return new HadHatoolActionsFunctions();  // should in future return the player number of the player!
}


interface GameActionsFunctions {

    availbleAction(actionChosen: GameActions, playerNumber?: number, ownCard?: number, playerCard?: number): ActionData;
    // requestUpdate(..) : ..;
}


class HadHatoolActionsFunctions implements GameActionsFunctions {
    gameID: number;

    constructor() {
        this.gameID = 123 //start a new object in the back
    }

    availbleAction(actionChosen: GameActions, playerNumber: number, ownCard?: number, playerCard?: number): ActionData {
        // add check that this action is ok 
        if (actionChosen == GameActions.FirstLook) {

            return this.getPlayersCards(playerNumber, [0, 3])
        }

        return new ActionData;
    }


    getPlayersCards(player: number, cards: number[]) {
        let res = new ActionData;
        // if ((player == 1) && (cards == [0, 3])) {
        //     res.cardsRecived.set(['playerCard', [0, 3]], ['0', '4'])

        // }

        return res   // supposed to go through backend_mockup
    }

}




// function availbleAction(actionChosen: GameActions, ownCard?: number, playerNumber?: number, playerCard?: number) {
//     send request availbleAction(actionChosen: string, ownCard ?: number, playerNumber ?: number, playerCard ?: number)
//     if response.actionChosen == 'action name':
//         doActionFunc(card, ...)
// }