import React, { FC, useState } from 'react';
import { Typography, Button, Grid2, Box, TextField, Card, CardContent, CardActions, CardMedia } from '@mui/material';



function Game_view() {
    return (
        <Box>
            <PlayerHand />
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

function PlayerHand() {
    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 40,       // distance from bottom of screen
                left: 0,
                width: '100%',    // span full width so centering works
                pointerEvents: 'none', // allow clicks through empty areas
                zIndex: 1
            }}
        >
            <Grid2
                container
                columns={12}
                spacing={1}
                justifyContent="center"   // center the items within available width
                sx={{ pointerEvents: 'auto' }} // let only cards be clickable
            >
                {[0, 1, 2, 3].map((idx) => (
                    <Grid2 size={1
                    } key={idx}>
                        <HadHatoolCard
                            width={100}
                            height={140} />
                    </Grid2>
                ))}
            </Grid2>
        </Box>
    );


}


interface HadHatoolCardProps {
    width: number;
    height: number;
}


function HadHatoolCard({ width, height }: Readonly<HadHatoolCardProps>) {
    return (
        <Card sx={{
            width: width,
            height: height
        }}>
            <CardContent>
                {/* <CardMedia>
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
        </CardMedia> */}

            </CardContent>
        </Card>
    );
}

export default Game_view;
