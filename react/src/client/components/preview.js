import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const boxProps = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  border: 1,
  borderRadius: "borderRadius",
  m: 1
};

const Preview = () => {
  return (
    <div>
      <Grid item xs={3}>
        <Box {...boxProps} style= {{ width: '15vw', height: '15vh' }}>
          <p>PREVIEW</p>
        </Box>
        <Box {...boxProps} style= {{ width: '15vw', height: '10vh' }}>
          <p>SCORE</p>
        </Box>
      </Grid>
    </div>
  );
}
export default Preview
