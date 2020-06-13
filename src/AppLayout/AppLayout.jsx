import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

export default function AppLayout(props) {
    return (
      <>
        <Box mt={10} px={2}>
          <Grid container>
            <Grid item xs={12}>
              <Paper square>
                <Box p={2}>
                  {props.children}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </>
    )
}