import React from 'react';
import Card from '@material-ui/core/Card';
import PreviewPiece from './PreviewPiece';
import OtherPlayerGrid from './OtherPlayerGrid';

const boxProps = {
  bgcolor: 'background.paper',
  bordercolor: 'text.primary',
  border: 1,
  borderradius: "borderRadius",
  style: { backgroundColor: 'white', width: '100vw'},
};

const Preview = ({ mapGamePreview, isAlone, isVisitor, score, sheet }) => {
  return (
    <div className="d-flex jcnt--start fdir--column">
      {!isVisitor && sheet && (
          <div className="aself--fstart width-100">
            <Card className="pt-3" {...boxProps} style= {{ width: '30vw' }} variant="outlined">
              <p className="pl-2">Prochaine piece:</p>
              <PreviewPiece sheet={sheet}/>
            </Card>
          </div>
      )}
      <div className="aself--fstart">
        <Card {...boxProps} style= {{ width: '30vw', height: '5vh' }} variant="outlined">
          <p className="pl-3">
            Score: <span className="bold">{ score }</span>
          </p>
        </Card>
      </div>
      <div className="aself--fstart">
        <OtherPlayerGrid isAlone={isAlone} mapGamePreview={mapGamePreview}/>
      </div>
    </div>
  );
}
export default Preview
