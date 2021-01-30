import React from 'react';
import { useContext } from 'react'
import { Context as UserContext } from "../context/UserContext";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Preview from './preview'
import Game from './game'
import { createGame } from '../plugins/createGame';
import { Card, CardContent } from '@material-ui/core';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', height: '100%', width: '100%'},
  m: 1
};

const Board = ({ mapGame, mapGamePreview, isAlone, score, sheet }) => {
  const { state: { player } } = useContext(UserContext);
  if (player.visitor) {
    return (
      <div>
        Vous regardez en tant que visiteur
        <Grid
          data-testid='gameVisitorGrid'
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={3}
          style={{ backgroundColor: '#ffff', width: '100%', height: '100%'}}
          >
          <Grid item>
            <Card {...boxProps} variant="outlined">
              <CardContent>
                <Preview mapGamePreview={ { game: mapGamePreview, isOtherUser: true } } isVisitor={true} isAlone={isAlone} score={0} sheet={null}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return (
      <Grid
        data-testid='gamePlayerGrid'
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={3}
        style={{ backgroundColor: '#ffff', width: '100%', height: '100%'}}
      >
        <Grid item xs={8}>
          <Card {...boxProps} variant="outlined">
            <CardContent>
              <Game game={ { game: mapGame, isOtherUser: false } }/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Preview mapGamePreview={ { game: mapGamePreview, isOtherUser: true} } isVisitor={false} isAlone={isAlone} score={score} sheet={sheet}/>
        </Grid>
      </Grid>
    );
  }
}
export default Board
