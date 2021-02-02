import React from 'react';
import { useContext } from 'react'
import { Context as UserContext } from "../context/UserContext";
import Preview from './preview'
import Game from './game'
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
  if (player && player.visitor) {
    return (
      <div className="d-flex jcnt--center fdir--column">
        <div className="aself--center">
          Vous regardez en tant que visiteur
        </div>
        <div className="aself--center width-100">
          <Card {...boxProps} variant="outlined">
            <CardContent>
              <Preview mapGamePreview={ { game: mapGamePreview, isOtherUser: true } } isVisitor={true} isAlone={isAlone} score={0} sheet={null}/>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } else {
    return (
      <div className="d-flex jcnt--start aitems--fs fdir--row">
        <div className="aself--str width-100">
          <Card {...boxProps} variant="outlined">
            <CardContent>
              <Game game={ { game: mapGame, isOtherUser: false } }/>
            </CardContent>
          </Card>
        </div>
        <div className="aself--str">
          <Preview
            mapGamePreview={ { game: mapGamePreview, isOtherUser: true} }
            isVisitor={false}
            isAlone={isAlone}
            score={score}
            sheet={sheet}
          />
        </div>
      </div>
    );
  }
}
export default Board
