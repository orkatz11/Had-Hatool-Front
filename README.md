# Had-Hatool (Rat-a-Tat-Cat) - Online Game

This is the Frontend repository of the card game Had-Hatool (also known as Rat-a-Tat-Cat), using Typescript and React. \
[The Backend](https://github.com/orkatz11/Had-Hatool-Back) repository uses python and FastAPI, and there you can find the REST API spec.

## Running the Game

1. Clone this repo: 
```bash
git clone https://github.com/orkatz11/Had-Hatool-Front.git
cd Had-Hatool-Front
```

2. install dependencies: 

```bash 
npm install
```

3. Run the app in the development mode: \
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```bash 
npm start
```


4. You can build the app for production to the build folder: \
It correctly bundles React in production mode and optimizes the build for the best performance.

```bash
npm run build
```

**Notes:** 
* By default the development server opens a browser at http://localhost:3000. If you want to change the port, set the PORT environment variable before running npm start.
* You must run the backend server first according to the instructions in the backend repository (link above).


## Implementation references

- **Frontend framework:** React (recommended React 18.x+).  
    - Important React features used: functional components, React Hooks (useState, useEffect, useRef, etc.)  
- **Language:** TypeScript (recommended TypeScript 5.x). The codebase is compiled to ES6-compatible JavaScript for browser execution.  
- **Important libraries:**  
    - axios — HTTP client used to call the backend API (promises / async/await usage).  
    - @mui/material (Material UI) — component library for UI primitives and layout.  
    - Async/await patterns are used for API calls and side-effect management.

## DevEx — Code quality and linting

Linting:  **ESLint** (v9+)
* Plugins used in this project:

  * `eslint-plugin-sonarjs`
  * `eslint-plugin-unicorn`

The ESLint configuration files are included in the repository in the following link.

## Contributions

Not receiving contributions since this is a personal project.

## Appendix - How to play
This implementation follows the common Rat-a-Tat-Cat rules. The objective is to finish the game with the lowest total sum value of your face-down cards. \
Currently the game can be played against a computer opponent. 


**Basic flow** \
Goal: End the game with the lowest total value of cards. \
Setup: Each player gets 4 face-down cards. You can look at your two outer cards once at the start. \

**Gameplay:**
1. On your turn, draw the top card from the draw or discard pile.
2. You can swap it with one of your face-down cards or discard it.
3. If you draw a power card (Peek, Swap, or Draw 2), follow its action:
    * PEEK - allows a player to look at one of their face-down cards.
    * DRAW2 - causes the player to play 2 more turns of the game 
    * SWAP - allows the player to swap one of their cards with another player’s card.
4. Ending the Game: A player can end the game by saying “Rat-a-Tat Cat” after finishing his turn. Everyone else gets one final turn.
5. Scoring: Players reveal their cards and total the values. The lowest score wins the game!
