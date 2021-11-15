import React, { useState, useEffect, useRef, useContext } from 'react';
// import Peer from "simple-peer";
import { Socket } from "../App";


const UserCard = (props) => {
    const user = localStorage.getItem("user");
    const loginUser = JSON.parse(user);


    const socket = useContext(Socket);



    // const [me, setMe] = useState("");
    // const [stream, setStream] = useState();
    // const [receivingCall, setReceivingCall] = useState(false);
    // const [caller, setCaller] = useState("");
    // const [callerSignal, setCallerSignal] = useState();
    // const [callAccepted, setCallAccepted] = useState(false);
    // // const [idToCall, setIdToCall] = useState("");
    // const [callEnded, setCallEnded] = useState(false);
    // const [name, setName] = useState("");


    // console.log("connected.....");

    // const myVideo = useRef();
    // const userVideo = useRef();
    // const connectionRef = useRef();

    // useEffect(() => {
    //     // navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
    //     //     setStream(stream);
    //     //     myVideo.current.srcObject = stream;
    //     // });

    //     socket.on("me", (id) => {
    //         setMe(id);
    //     });

    //     socket.on("callUser", (data) => {
    //         setReceivingCall(true);
    //         setCaller(data.from);
    //         setName(data.name);
    //         setCallerSignal(data.signal);
    //     });
    // }, []);

    // const callUser = (id) => {
    //     const peer = new Peer({
    //         initiator: true,
    //         trickle: false,
    //         stream: stream
    //     });

    //     peer.on("signal", (data) => {
    //         socket.emit("callUser", {
    //             signalData: data,
    //             userToCall: id,
    //             from: me,
    //             name: name
    //         });
    //     });


    //     peer.on("stream", (stream) => {
    //         userVideo.current.srcObject = stream;
    //     });

    //     socket.on("callAccepted", (signal) => {
    //         setCallAccepted(true);
    //         peer.signal(signal);
    //     });

    //     connectionRef.current = peer;

    // }

    // const answerCall = () => {
    //     setCallAccepted(true);
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream
    //     });

    //     peer.on("signal", (data) => {
    //         socket.emit("answerCall", { signal: data, to: caller });
    //     });

    //     peer.on("stream", (stream) => {
    //         userVideo.current.srcObject = stream;
    //     });

    //     peer.signal(callerSignal);
    //     connectionRef.current = peer;

    // }

    // socket.on("endCallByUser", () => {
    //     setCallEnded(true);
    // })

    // const leaveCall = () => {
    //     socket.emit("endCallByUser", idToCall);
    //     setCallEnded(true);
    //     connectionRef.current.destroy();
    // }


    // const [eventCount, setEventCount] = useState(true);

    useEffect(() => {
        // socket.on("someOneCallingYou", function (data) {
        //         console.log(`${data.from} calling you`);
        //         // alert(`${data.from} calling you`);
        // });


        // return () => {
        //     socket.off('someOneCallingYou', function (data) {
        //         console.log(`${data.from} calling you`);
        //         // alert(`${data.from} calling you`);
        //     });
        // };

    })

    const makeCall = (id, fromId) => {
        console.log(`Make call to ${id}`);
        socket.emit("callRequest", { to: id, from: loginUser.name, fromSocketId: fromId });
    };




    return (
        <>
            {JSON.parse(user)._id !== props.id ? (<div className="users">
                <h2>{props.name}</h2>
                <div>
                    <span>
                        {props.profession}
                    </span>
                    <span>
                        {props.level}
                    </span>
                </div>

                <button className="callBtn" onClick={() => { makeCall(props.socket_id, props.mySocketId) }}>
                    <span>Start Conversation</span>
                    {/* <input value=${JSON.stringify({ key: key, from: from, fromUserName: fromUserName })} type="hidden"></input> */}
                </button>
            </div>)

                : (<div style={{ display: "none" }}></div>)}

        </>

    )


}

export default UserCard;
