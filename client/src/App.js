import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import io from "socket.io-client";
import Peer from "simple-peer";

const socket = io.connect("http://localhost:5000");


function App() {

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");


  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        signalData: data,
        userToCall: id,
        from: me,
        name: name
      });
    });


    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;

  }

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;

  }

  socket.on("endCallByUser", () => {
    setCallEnded(true);
  })

  const leaveCall = () => {
    socket.emit("endCallByUser", idToCall);
    setCallEnded(true);
    connectionRef.current.destroy();
  }



  return (
    <>
      <h1 style={{ textAlign: "center" }}>AshApp</h1>
      <div className="container">
        <div className="video-container">
          <div className="video">
            {stream && < video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
          </div>
          <div className="video">
            {callAccepted && !callEnded ?
              <video autoPlay playsInline ref={userVideo} style={{ width: "300px" }} /> :
              null
            }
          </div>
        </div>

        <textarea placeholder="Id to call" value={idToCall} onChange={(e) => { setIdToCall(e.target.value) }} />
        <textarea placeholder="Your Id" value={me} />
        <textarea placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />



        <div>
          {callAccepted && !callEnded ? (
            <button onClick={() => { leaveCall(idToCall) }}> End</button>

          ) : (
            <button onClick={() => { callUser(idToCall) }}>Call</button>
          )}
        </div>


        <div>
          {receivingCall && !callAccepted ?
            (
              <div>
                <h1>{name} is calling.....</h1>
                <button onClick={answerCall}>Answer</button>
              </div>
            ) : null
          }
        </div>
      </div>
    </>
  );
}

export default App;
