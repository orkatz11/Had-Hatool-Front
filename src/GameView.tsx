import React, { useState, useEffect } from 'react';
import { Typography, Button, Grid2, Box, Card, CardContent, GridDirection, CardActionArea} from '@mui/material';
import './gameView.css';
import {createNewGame} from './backendMockup';

import { FirstLookAction, FirstLookIn, TakeCardAction, TakeCardIn, TakeCardOut  } from './gameActions';

function createCardsArray(location: number[], values: string[]): string[]{
    const res = ['none', 'none', 'none', 'none'];
    let value_index = 0;
    for (const index of location) {
        res[index] = values[value_index];
        value_index ++;
    }
    return res
}

enum CardShowedOptions {
    FirstCard = 0,
    SecondCard = 1, 
    ThirdCard = 2,
    ForthCard = 3,
    FirstLook = 4,
    AllCards = 5,
    NoCards = 6,
}

function GameView() {
    const [playerCardsShowed, setPlayerCardsShowed] = useState(CardShowedOptions.NoCards);
    const[playersCards, setPlayersCards] = useState(new Map<number,string[]>());
    const [firstLookDisabled, setFirstLookDisabled] = useState(false);

    const [deckCardContent, setDeckCardContent] = useState('none');
    const [isDeckCardsShowed, setIsDeckCardsShowed] = useState(false);
    const [mainPlayerNumber, setMainPlayerNumber] = useState(0); // Will be filled by the starting game useEffect
    const [pileCardContent, setPileCardContent] = useState('');  // Will be filled by the starting game useEffect
    
    useEffect(() => {
        const startGameData = createNewGame();
        setMainPlayerNumber(startGameData[0]); 
        setPileCardContent(startGameData[1].toString());
    },
    [])


    function handleFirstLookClick(): void {   //SHOULD ALSO RETURN THE NEXT TURN
        const firstLookIn: FirstLookIn = new FirstLookIn;
        firstLookIn.playerNumber = mainPlayerNumber;
        firstLookIn.cardsNeeded = {cardsSource: mainPlayerNumber, cardsLocation: [0,3]};
        const firstLookCall = new FirstLookAction;  //creating an object of the action class
        const firstLookRes = firstLookCall.excecuteAction(firstLookIn);
        const firstLookCards : string[] = firstLookRes.cardsRecived; //reciving the cards from the back
        const newPlayersCards = new Map<number,string[]>();
        newPlayersCards.set(mainPlayerNumber, createCardsArray(firstLookIn.cardsNeeded.cardsLocation,firstLookCards));
        setPlayersCards(newPlayersCards);
        setPlayerCardsShowed(CardShowedOptions.FirstLook);

        setTimeout(() => {
            setPlayerCardsShowed(CardShowedOptions.NoCards);
          }, 5000);
        setFirstLookDisabled(true);
        //reset the 'cardsShowed' state
    }

    function handleStackClick(isDeck: boolean): string {
        const takeCardInput: TakeCardIn = new TakeCardIn;
        takeCardInput.isDeck = isDeck;
        takeCardInput.playerNumber = mainPlayerNumber;
        const takeCardAction: TakeCardAction = new TakeCardAction;
        const cardOut: TakeCardOut = takeCardAction.excecuteAction(takeCardInput);
        const cardValue:string = cardOut.cardsRecived[0];
        return(cardValue)
    }

    function handleDeckClick(): void {   
        const cardReturned = handleStackClick(true);
        setDeckCardContent(cardReturned);
        setIsDeckCardsShowed(true);
    }

    function handlePileClick(): void { /* document why this function 'handlePileClick' is empty */     }
    

    return (
        <Box>  {/* The 4 cards placements*/}
            <Box className="MainPlayerBox">
                <PlayerHand width={100} height={140} spacing={1} columns={12} direction='row' cardsShowed={playerCardsShowed} cardValues={playersCards.get(mainPlayerNumber)}
                />
            </Box>
            <Box className="TopPlayerBox">
                <PlayerHand width={50} height={70} spacing={1} columns={24} direction='row' cardsShowed={CardShowedOptions.NoCards}
                />
            </Box>
            <Box className="CardsDeck">
                <CardsStack mainPlayerNumber={mainPlayerNumber} onStackClick={handleDeckClick} StackCardContent={deckCardContent} isCardsShowed={isDeckCardsShowed}
                />

            </Box>
            <Box className="UsedPile">
                <CardsStack mainPlayerNumber={mainPlayerNumber} onStackClick={handlePileClick} StackCardContent={pileCardContent} isCardsShowed={true}
                />
            </Box>
            <Button disabled = {firstLookDisabled} onClick={handleFirstLookClick}>
                First look
            </Button>
            <GameTable />
        </Box>
    );
}

function GameTable() {
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
            }}
        />
    );
}

interface PlayerHandProps {
    width: number;
    height: number;
    spacing: number;
    columns: number;
    direction: GridDirection;
    cardsShowed: CardShowedOptions; // 0-3 ->  specific card, 4 -> hidden, 5 -> first look
    cardValues?: string[];

}


function PlayerHand({ width, height, spacing, columns, direction, cardsShowed, cardValues = ['none', 'none', 'none', 'none'] }: Readonly<PlayerHandProps>) {
    let cardShown = CardShowedOptions.NoCards;
    let firstLook = false;
    if (cardsShowed == CardShowedOptions.FirstCard || cardsShowed == CardShowedOptions.SecondCard || cardsShowed == CardShowedOptions.ThirdCard || cardsShowed == CardShowedOptions.ForthCard) {
        cardShown = cardsShowed;
    }
    else if (cardsShowed == CardShowedOptions.FirstLook) {
        firstLook = true;
    }
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
                        isShowed={(cardShown == idx) || ((firstLook) && (idx == 0 || (idx == 3)))}
                        content={cardValues[idx]} 
                        onClick={TempOnClick}
                        />
                </Grid2>
            ))}
        </Grid2>
    );
}


interface CardStackProps {
    mainPlayerNumber?: number;
    onStackClick: () => void;
    isCardsShowed: boolean;
    StackCardContent: string;
}

function CardsStack({onStackClick,isCardsShowed, StackCardContent }: Readonly<CardStackProps>) {
    
    return(
        <HadHatoolCard
            width={100}
            height={140}
            isShowed={isCardsShowed}
            content={StackCardContent}
            onClick={onStackClick}
            />
    );
    
}


interface HadHatoolCardProps {
    width: number;
    height: number;
    isShowed: boolean;
    content: string;
    onClick: () => void; 
}


function HadHatoolCard({ width, height, isShowed, content, onClick}: Readonly<HadHatoolCardProps>) {
    return (
        <Card sx={{
            width: width,
            height: height
        }}>
            <CardActionArea onClick={onClick}>
                <CardContent>
                    <Typography variant="h4" component="div" textAlign={"center"}>
                        {isShowed ? content : null}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default GameView;
