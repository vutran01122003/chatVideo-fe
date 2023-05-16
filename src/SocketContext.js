import React, { useState, useEffect, useRef,createContext } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { Backdrop, CircularProgress} from '@material-ui/core';

const SocketContext = createContext();
const socket = io(process.env.REACT_APP_URL_BASE_API);

function ContextProvider({children}) {
    const [stream, setstream] = useState("null");
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');
    const [pedding, setPedding] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
            .then((currentStream) => {
                setstream(currentStream);
                myVideo.current.srcObject = currentStream;
            })
            .catch((e) => {
                alert('Không thể call video do người dùng không cấp quyền truy cập');
            })
            
            // Set id cho bản thân
            socket.on('me', (id) => {
                setMe(id);
            })

            // Nhận thông tin từ người gọi
            socket.on('calluser', ({from, name: callerName, signal}) => {
                setCall({isReceivedCall: true, from, name: callerName, signal});
                setPedding(false);
            })
            // eslint-disable-next-line
    }, [])

    const callUser = (id) => {
        const peer = new Peer({initiator: true, trickle: false, stream});
        if(id) setPedding(true);
        else return;
     
        peer.on('signal', (data) => {
            // Gửi một sự kiện có tên là calluser đến server 
            // Nhằm truyền dữ liệu video và audio đến người nhận cuộc gọi (userToCall: id)
            socket.emit('calluser', {userToCall: id, signalData: data, from: me, name});
        })

        // Hiển thị video từ camera và mic lap của mình
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);
            // peer.signal(), nó sẽ sử dụng dữ liệu này để xác định địa chỉ IP và các thông số khác của bên kia, 
            // Sau đó bắt đầu thiết lập kết nối WebRTC.
            peer.signal(signal);
        })

        socket.on('pedding', (data) => {
            setPedding(false);
        })

        connectionRef.current = peer;
    }

    const anwserCall = () => {
        setCallAccepted(true);
        const peer = new Peer({initiator: false, trickle: false, stream});

        peer.on('signal', (data) => {
            // Gửi một sự kiện có tên là answercall đến server 
            // Nhằm truyền dữ liệu video và audio đến người gọi (to: call.from => call.from)
            socket.emit('answercall', {signal: data, to: call.from});
        })

        // Hiển thị video từ camera và mic lap của mình
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        })

        peer.signal(call.signal);
        
        connectionRef.current = peer;
    }

    const leaveCall = () => {
       try {
            setCallEnded(true);
            connectionRef.current.destroy();
            window.location.reload();
       } catch (error) {
            console.log(error);
       }
    }

    return (
      <SocketContext.Provider value={
        {
            me, 
            call, 
            name, 
            stream, 
            myVideo,
            userVideo,
            callEnded, 
            callAccepted, 
            connectionRef,
            pedding, 
            setPedding,
            setMe,
            setCall,
            setName,
            callUser,
            leaveCall,
            setstream,
            anwserCall,
            setCallEnded,
            setCallAccepted,
        }
      }>
         
            {
                !me && 
                <Backdrop
                    sx={{ color: '#fff'}}
                    open={true}
                    style={{zIndex: 999999, display: 'flex', flexDirection: 'column', gap: 20}}
                >
                    <CircularProgress style={{color: 'white'}} />
                    <h2 style={{color: 'white', textAlign: 'center'}}>Vui lòng chờ, máy chủ cần thời gian để khởi động</h2>
                </Backdrop>
            }

            {children}
      </SocketContext.Provider>
    );
  }

  
  export {ContextProvider, SocketContext} ;