import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid2, Box, Card as CardMUI, CardContent, GridDirection, CardActionArea} from '@mui/material';
import './gameView.css';
import {Card, createPlayerHandByLocation, UNKNOWN_VALUE, user_id} from './gameClasses'
import { createNewGame, CreateNewGameOut, FirstLookAction, FirstLookIn, FirstLookOut, TakeCardAction, TakeCardIn, TakeCardOut  } from './gameActions';


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
            } catch(err) {
                console.error("createNewGame failed:", err);
            }
        };
        void helperGetGame();
    },
    []);

//use the first solution 

    function handleFirstLookClick(): void {   //SHOULD ALSO RETURN THE NEXT TURN
        const firstLookIn: FirstLookIn = new FirstLookIn;
        const cardsLocation = [0,3];
        firstLookIn.playerNumber = playerIdNumbers[0];
        firstLookIn.cardsNeeded = {cardsSource:  firstLookIn.playerNumber, cardsLocation: cardsLocation};
        const firstLookCall = new FirstLookAction;  //creating an object of the action class
        const firstLookRes: FirstLookOut = firstLookCall.excecuteAction(firstLookIn); // recieve the 2 cards wanted, in the 0,3 locations
        const firstLookCards : Card[] = firstLookRes.cardsRecived; //reciving the cards from the back
        const newallPlayersCards = new Map<number,Card[]>();
        const playerHand : Card[]= createPlayerHandByLocation(cardsLocation,firstLookCards )
        newallPlayersCards.set( firstLookIn.playerNumber, playerHand);
        setAllPlayersCards(newallPlayersCards);

        setTimeout(() => {
            const emptyHand: Card[]= createPlayerHandByLocation();  // getting a new empty hand after time's up
            const mainPlayerEmptyHand = new Map<number,Card[]>();
            mainPlayerEmptyHand.set( firstLookIn.playerNumber, emptyHand);
            setAllPlayersCards(mainPlayerEmptyHand);
          }, 5000);
        setFirstLookDisabled(true);
        //reset the 'cardsShowed' state
    }

    function handleStackClick(isDeck: boolean): Card {
        const takeCardInput: TakeCardIn = new TakeCardIn;
        takeCardInput.isDeck = isDeck;
        takeCardInput.playerNumber = playerIdNumbers[1];
        const takeCardAction: TakeCardAction = new TakeCardAction;
        const cardOut: TakeCardOut = takeCardAction.excecuteAction(takeCardInput);  // returns [Card]
        const card: Card = cardOut.cardsRecived[0];
        return(card)
    }

    function handleDeckClick(): void {   
        const cardReturned = handleStackClick(true);
        setDeckCard(cardReturned);
    }

    function handlePileClick(): void { /* document why this function 'handlePileClick' is empty */}
    

    return (
        <Box>  {/* The 4 cards placements*/}
            <GameTable>
                <Box className="MainPlayerBox">
                    <PlayerHand width={100} height={140} spacing={1} columns={12} direction='row' cards={allPlayersCards.get(playerIdNumbers[0]) ?? createPlayerHandByLocation()}  // get the Cards array form the playerCards map, if it is undefigned - return an empty Card array.
                    />
                </Box>
                <Box className="TopPlayerBox">
                    <PlayerHand width={50} height={70} spacing={1} columns={24} direction='row' cards={allPlayersCards.get(playerIdNumbers[1]) ?? createPlayerHandByLocation()}
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
}


function PlayerHand({ width, height, spacing, columns, direction, cards}: Readonly<PlayerHandProps>) {
    
    function TempOnClick(){ /* for check */ };

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
                        onClick={TempOnClick}
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
    let isShowed = false
    if (card.value != UNKNOWN_VALUE) {isShowed = true}
    return (
        <CardMUI sx={{
            width: width,
            height: height
        }}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Typography variant="h4" component="div" textAlign={"center"}>
                        {isShowed ? card.value : null} 
                    </Typography>
                </CardContent>
            </CardActionArea>
        </CardMUI>
    );
}

export default GameView;
