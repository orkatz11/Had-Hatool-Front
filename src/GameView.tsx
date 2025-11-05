import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid2, Box, Card as CardMUI, CardContent, GridDirection, CardActionArea} from '@mui/material';
import './gameView.css';
import {Card, CardValue, createPlayerHandByLocation, UNKNOWN_VALUE, user_id} from './gameClasses'
import { createNewGame, CreateNewGameOut, FirstLookAction, FirstLookIn, FirstLookOut, ExecutActionOut,ClickCardStackAction, ClickCardStackIn, ClickCardStackOut, ClickSelfCardAction, ClickSelfCardIn} from './gameActions';

function GameTable({ children }: { children?: React.ReactNode }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 900,           // overall width
                height: 400,          // overall height
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#0b6623',
                border: '5px solid #3e3e3e',
                borderRadius: '200px', // = height / 2
                zIndex: 0,
                overflow: 'visible',
            }}
            
        >
            {children}
        </Box>
    );
}

function GameView() {
    const [gameID, setGameID] = useState(0)
    const [allPlayersCards, setAllPlayersCards] = useState(new Map<number,Card[]>());
    const [firstLookDisabled, setFirstLookDisabled] = useState(false);

    const [deckCard, setDeckCard] = useState(new Card);
    const [playerIdNumbers, setPlayerIdNumbers] = useState([0]); // Should be Map object, in future (will create typing problems with get func)
    const [pileCard, setPileCard] = useState(new Card);  // Will be filled by the starting game useEffect

    
    useEffect(() => {
        const helperGetGame = async (): Promise<void> => {
            try {
                const result: CreateNewGameOut= await createNewGame(user_id);
                console.log(result);
                setPlayerIdNumbers(result.playerIdNumbers); 
                setPileCard(result.pileCard);
                setGameID(result.gameIdNumber)
            } catch(err) {
                console.error("createNewGame failed:", err);
            }
        };
        void helperGetGame();
    },
    []);

//use the first solution 

    async function handleFirstLookClick(): Promise<void> {   //SHOULD ALSO RETURN THE NEXT TURN
        const firstLookIn: FirstLookIn = new FirstLookIn;
        const cardsLocation: number[] = [0,3];
        firstLookIn.playerUserId = user_id;
        firstLookIn.gameID = gameID;
        const firstLookCall = new FirstLookAction;  //creating an object of the action class
        try{
            const firstLookRes: FirstLookOut = await firstLookCall.excecuteAction(firstLookIn); // recieve the 2 cards wanted, in the 0,3 locations
            console.log(firstLookRes);
            const firstLookCards : Card[] = firstLookRes.cardsRecived; //reciving the cards from the back
            const newallPlayersCards = new Map<number,Card[]>();
            const playerHand : Card[]= createPlayerHandByLocation(cardsLocation,firstLookCards)
            newallPlayersCards.set(firstLookIn.playerUserId, playerHand);
            setAllPlayersCards(newallPlayersCards);

            setTimeout(() => {
                const emptyHand: Card[]= createPlayerHandByLocation();  // getting a new empty hand after time's up
                const mainPlayerEmptyHand = new Map<number,Card[]>();
                mainPlayerEmptyHand.set( firstLookIn.playerUserId, emptyHand);
                setAllPlayersCards(mainPlayerEmptyHand);
            }, 5000);
            setFirstLookDisabled(true);
            //reset the 'cardsShowed' state
        } catch (err) {
            console.error("firstLook failed:", err);
        }
        
    }

    async function handleStackClick(isDeck: boolean): Promise<Card> {
        const clickStackInput: ClickCardStackIn = new ClickCardStackIn;
        clickStackInput.playerUserId = user_id;
        clickStackInput.gameID = gameID;
        clickStackInput.isDeck = isDeck;
        const clickStackAction: ClickCardStackAction = new ClickCardStackAction;
        try {
            const cardOut: ClickCardStackOut = await clickStackAction.excecuteAction(clickStackInput);  // returns [Card]
            const cardReturned: Card = cardOut.cardsRecived[0];
            console.log(cardOut.action_description)
            return (cardReturned)

        } catch (err) {
            console.error("stack click failed:", err);
            throw err;
        }
    }

    
    async function handleDeckClick(): Promise<void> {
        try{
            const cardRecived: Card = await handleStackClick(true);
            setDeckCard(cardRecived)
        } catch (err) {
            console.error("Deck click failed:", err);
            throw err;
        }
        
    }


    async function handlePileClick(): Promise<void> {
        try{
            const cardRecived: Card = await handleStackClick(false);
            setPileCard(cardRecived)
            setDeckCard(new Card())
        } catch (err){
            console.error("Pile click failed:", err);
            throw err;
        }
    }



    async function handleSelfCardClick(position: number):Promise<void> {
        const clickSelfCardInput: ClickSelfCardIn = new ClickSelfCardIn;
        clickSelfCardInput.playerUserId = user_id;
        clickSelfCardInput.gameID = gameID;
        clickSelfCardInput.cardPosition = position;
        const clickPlayerHandAction: ClickSelfCardAction = new ClickSelfCardAction;
        try {
            const SelfcardOut: ExecutActionOut = await clickPlayerHandAction.excecuteAction(clickSelfCardInput);  // returns [Card]
            const newPileCard: Card = SelfcardOut.cardsRecived[0];
            console.log(SelfcardOut.action_description)
            setPileCard(newPileCard)
            setDeckCard(new Card())

        } catch (err) {
            console.error("player's hand click failed:", err);
            throw err;
        }

    }

        async function handleOpponentCardClick(position: number):Promise<void> {
  

    }

    return (
        <Box>  {/* The 4 cards placements*/}
            <GameTable>
                <Box className="MainPlayerBox">
                    <PlayerHand width={100} height={140} spacing={1} columns={12} direction='row' cards={allPlayersCards.get(playerIdNumbers[0]) ?? createPlayerHandByLocation()} onClick={handleSelfCardClick} // get the Cards array form the playerCards map, if it is undefigned - return an empty Card array.
                    />
                </Box>
                <Box className="TopPlayerBox">
                    <PlayerHand width={50} height={70} spacing={1} columns={24} direction='row' cards={allPlayersCards.get(playerIdNumbers[1]) ?? createPlayerHandByLocation()} onClick={handleOpponentCardClick}
                    />
                </Box>
                <Box className="CardsDeck">
                    <CardsStack  onStackClick={handleDeckClick} stackHighestCard={deckCard} 
                    />

                </Box>
                <Box className="UsedPile">
                    <CardsStack  onStackClick={handlePileClick} stackHighestCard={pileCard}
                    />
                </Box>
                <Button disabled = {firstLookDisabled} onClick={handleFirstLookClick} className='FirstLookButton'>
                    First look
                </Button>
            </GameTable>
        </Box>
    );
}



interface PlayerHandProps {
    width: number;
    height: number;
    spacing: number;
    columns: number;
    direction: GridDirection;
    cards: Card[]
    onClick: (index:number) => void;

}


function PlayerHand({ width, height, spacing, columns, direction, cards, onClick}: Readonly<PlayerHandProps>) {


    return (

        <Grid2
            container
            direction={direction}
            columns={columns}
            spacing={spacing}
            justifyContent="center"   // center the items within available width
            sx={{ pointerEvents: 'auto' }} // let only cards be clickable
        >
            {[0, 1, 2, 3].map((idx) => (
                <Grid2 size={1
                } key={idx}>
                    <HadHatoolCard
                        width={width}
                        height={height}
                        card={cards[idx]} 
                        onClick={() => onClick(idx)}
                        />
                </Grid2>
            ))}
        </Grid2>
    );
}


interface CardStackProps {
    onStackClick: () => void;
    stackHighestCard: Card;
}

function CardsStack({onStackClick, stackHighestCard}: Readonly<CardStackProps>) {
    
    return(
        <HadHatoolCard
            width={100}
            height={140}
            card={stackHighestCard}
            onClick={onStackClick}
            />
    );
    
}


interface HadHatoolCardProps {
    width: number;
    height: number;
    card: Card;
    onClick: () => void; 
}


function HadHatoolCard({ width, height, card, onClick}: Readonly<HadHatoolCardProps>) {  
    let isShowed = false;
    let cardStringValue = ''; 
    if (card.value != UNKNOWN_VALUE) {  // if the card has a value - get the string
        isShowed = true;
        if ([CardValue.DRAW2, CardValue.PEAK, CardValue.SWAP].includes(card.value)) {
            cardStringValue = CardValue[card.value];
        }else {
            cardStringValue = String(card.value);
        }
        
    }
    return (
        <CardMUI sx={{
            width: width,
            height: height
        }}>
            <CardActionArea onClick={onClick}>
                <CardContent
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                   }}
                >
                    <Typography 
                        variant="h5"    component="div" textAlign={"center"} >
                        {isShowed ? cardStringValue : null} 
                    </Typography>
                </CardContent>
            </CardActionArea>
        </CardMUI>
    );
}

export default GameView;
