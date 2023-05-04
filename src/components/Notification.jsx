import React, { useContext } from "react";
import { Button } from '@material-ui/core';
import { SocketContext } from "../SocketContext";

function Notification() {
    const {anwserCall, call, callAccepted} = useContext(SocketContext);
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
    </div> 
    );
}

export default Notification;