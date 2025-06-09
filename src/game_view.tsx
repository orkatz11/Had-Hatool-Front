import React, { FC, useState } from 'react';
import { Typography, Button, Grid2, Box, TextField, Card, CardContent, CardActions, CardMedia, GridDirection } from '@mui/material';
import './gameView.css';


function Game_view() {
    return (
        <Box>  \\ The 4 cards placements
            <Box className="PlayerOneBox">
                <PlayerHand width={100} height={140} spacing={1} columns={12} direction='row'
                />
            </Box>
            <Box className="PlayerTwoBox">
                <PlayerHand width={70} height={50} spacing={1} columns={24} direction='column'
                />
            </Box>
            <Box className="PlayerThreeBox">
                <PlayerHand width={50} height={70} spacing={1} columns={24} direction='row'
                />
            </Box>
            <Box className="PlayerFourBox">
                <PlayerHand width={70} height={50} spacing={1} columns={24} direction='column'
                />
            </Box>
            <Box className="CardsDeck">
                <CardsDeck />

            </Box>
            <Box className="UsedPile">
                <UsedPile />

            </Box>
            <Game_Table />
        </Box>
    );
}

function Game_Table() {
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
}


function PlayerHand({ width, height, spacing, columns, direction }: Readonly<PlayerHandProps>) {
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
                        isshowed={false}
                        content='none' />
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

export default Game_view;
