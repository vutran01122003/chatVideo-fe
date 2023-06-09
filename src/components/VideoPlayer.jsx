import React, { useContext } from "react";
import { Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '5px',
      border: '2px solid gray',
      margin: '10px',
    },
  }));

function VideoPlayer() {
    const classes = useStyles();
    const { myVideo, userVideo, callAccepted, name, callEnded, stream, call} = useContext(SocketContext);
    return ( 
        <Grid container className={classes.gridContainer}>
            {/* My video */}
            {
                stream &&
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{ name || 'Me'}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                    </Grid>
                 </Paper>
            }

            {/* User video */}
            {
                !callEnded && callAccepted &&
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{call.name || 'Stranger'}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper>
            }
        </Grid>
    );
}

export default VideoPlayer;