/* eslint-disable sonarjs/no-commented-code */
// import React, { FC, useState } from 'react';

// interface UsedCardsStack<> {
//     push(item: string): void;
//     pop(): string | undefined;
//     peek(): string | undefined;
//     size(): number;
// }

// class UsedCardsStack implements UsedCardsStack {

//     usedCards: string[] = [];

//     push(item: string) {
//         if (this.size() === 0) {
//             throw Error("No used cards");
//         }
//         this.usedCards.push(item);
//     }

//     pop(): string | undefined {
//         return this.usedCards.pop();
//     }

//     peek(): string | undefined {
//         return this.usedCards[this.size() - 1];
//     }

//     size(): number {
//         return this.usedCards.length;
//     }
// }

// enum GamePhase { StartGame, TakeCard, TurnAction, EndTurn, EndGame }

// interface FullGameState {
//     playerOneCards: string[];
//     playerTwoCards: string[];
//     playerThreeCards: string[];
//     playerFourCards: string[];
//     deckCards: string[];
//     usedCards: UsedCardsStack;
//     gamephase: GamePhase;
//     turn: number; // 0- start of game, 5 - end of game

//     getPlayersCards(player: number, cards: number[]): string[];
// }

// class FullGameState implements FullGameState {

//     constructor() {
//         this.playerOneCards = ['1', '3', '7', '5'];
//         this.playerTwoCards = ['1', '2', '3', '4'];
//         this.playerThreeCards = ['5', '4', '6', '4'];
//         this.playerFourCards = ['2', '3', '4', '8'];
//         this.deckCards = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
//         this.usedCards = new UsedCardsStack();
//         this.gamephase = GamePhase.StartGame
//         this.turn = 0;
//     }
// }


// function availbleAction(actionChosen: string, ownCard?: number, playerNumber?: number, playerCard?: number) {
//     if actionChosen == 'action name':
// doActionFunc(card,...)

// }


export function createNewGame() { //return ID of the new game, and the only card in the usedPile
    return ([123, 5])
}

export function getPlayersCards(player: number, cards: number[]) {
    if (cards.length == 4) {
        return (['1', '2', '3', '4', '5'])
    }
    if (cards.length == 2) {
        return (['6', '7'])
    }
    if (cards.length == 1) {
        return (['8'])
    }
}
