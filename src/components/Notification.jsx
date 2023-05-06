import React, { useContext } from "react";
import { Button } from '@material-ui/core';
import { SocketContext } from "../SocketContext";
import { Backdrop, CircularProgress} from '@material-ui/core';

function Notification() {
    const {anwserCall, call, callAccepted, pedding} = useContext(SocketContext);
    return ( 
    <div>
        {
            call.isReceivedCall && !callAccepted && (
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <h1>{call.name || 'Stranger'} is calling: </h1>
                    <Button variant="contained" color="primary" onClick={anwserCall}>
                        Answer
                    </Button>
                </div>
            ) 
        }
        {
            pedding && 
            <Backdrop
                    sx={{ color: '#fff'}}
                    open={true}
                    style={{zIndex: 999999}}
                >
                    <CircularProgress style={{color: 'white'}} />
            </Backdrop>
        }
    </div> 
    );
}

export default Notification;