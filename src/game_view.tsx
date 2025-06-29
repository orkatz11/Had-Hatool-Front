import React, { FC, useState } from 'react';
import { Typography, Button, Grid2, Box, TextField, Card, CardContent, CardActions, CardMedia, GridDirection } from '@mui/material';
import './game_view.css';
import './backend_mockup';

import { GameActions } from './game_actions';

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
    const [cardsShowed, setCardsShowed] = useState(CardShowedOptions.NoCards);

    function handleFirstLookClick() {
        setCardsShowed(CardShowedOptions.FirstLook)
    }

    return (
        <Box>  {/* The 4 cards placements*/}
            <Box className="PlayerOneBox">
                <PlayerHand width={100} height={140} spacing={1} columns={12} direction='row' cardsShowed={CardShowedOptions.NoCards}
                />
            </Box>
            <Box className="PlayerTwoBox">
                <PlayerHand width={50} height={70} spacing={1} columns={24} direction='row' cardsShowed={cardsShowed}
                />
            </Box>
            <Box className="CardsDeck">
                <CardsDeck />

            </Box>
            <Box className="UsedPile">
                <UsedPile />
            </Box>
            <Button onClick={handleFirstLookClick}>
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
                        isshowed={(cardShown == idx) || ((firstLook) && (idx == 0 || (idx == 3)))}
                        content={cardValues[idx]} />
                </Grid2>
            ))}
        </Grid2>
    );
}


function CardsDeck() {
    return (
        <HadHatoolCard
            width={100}
            height={140}
            isshowed={false}
            content='none' />
    );
}

function UsedPile() {
    return (
        <HadHatoolCard
            width={100}
            height={140}
            isshowed={true}
            content='5' />
    );
}





interface HadHatoolCardProps {
    width: number;
    height: number;
    isshowed: boolean;
    content: string;
}


function HadHatoolCard({ width, height, isshowed, content }: Readonly<HadHatoolCardProps>) {
    return (
        <Card sx={{
            width: width,
            height: height
        }}>
            <CardContent>
                <Typography variant="h4" component="div" textAlign={"center"}>
                    {isshowed ? content : null}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default GameView;
