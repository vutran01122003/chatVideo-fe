// import react from 'react'
import {Typography, AppBar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Notification from './components/Notification';
import Options from './components/Options';
import VideoPlayer from './components/VideoPlayer';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderRadius: 5,
        margin: '30px 100px',
        padding: '15px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '600px',
        border: '2px solid gray',
        [theme.breakpoints.down('xs')]: {
          width: '90%',
        },
      },
      image: {
        marginLeft: '15px',
      },
      wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      },
}))
function App() {
    const classes = useStyles();
  return (
    <div className={classes.wrapper}>
       <AppBar position='static' color='inherit' className={classes.appBar}>
            <Typography variant='h3' align='center'>
                VIDEO CHAT
            </Typography>
       </AppBar>

       <VideoPlayer />
        <Options>
            <Notification />
        </Options>
    </div>
  );
}

export default App;
