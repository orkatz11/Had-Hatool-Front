import './backend_mockup.tsx';


export enum GameActions {
    FirstLook = 'firstLook',
    PickCard = 'pickCard',
}


// the interface has only the 'availble action' and 'request update' functions

export function initializeGame(): GameActionsFunctions {
    return new HadHatoolActionsFunctions();
}


interface GameActionsFunctions {

    availbleAction(actionChosen: GameActions, ownCard?: number, playerNumber?: number, playerCard?: number): [string[], number[]];
    // requestUpdate(..) : ..;
}


class HadHatoolActionsFunctions implements GameActionsFunctions {

    gameID: number;

    constructor() {
        this.gameID = 123 //start a new object in the back
    }

    availbleAction(actionChosen: GameActions, ownCard?: number, playerNumber?: number, playerCard?: number): [string[], number[]] {
        return [['null'], [3]]; //supposed to go through backend_mockup
    }

    getPlayersCards(player: number, cards: number[]) {
        return [1, 4] //supposed to go through backend_mockup
    }

}




// function availbleAction(actionChosen: GameActions, ownCard?: number, playerNumber?: number, playerCard?: number) {
//     send request availbleAction(actionChosen: string, ownCard ?: number, playerNumber ?: number, playerCard ?: number)
//     if response.actionChosen == 'action name':
//         doActionFunc(card, ...)
// }