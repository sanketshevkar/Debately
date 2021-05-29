import React, {useState, useRef} from 'react';
import AudioPlayer from './AudioPlayer';
import { Row, Col, Button } from 'antd';
import firebase from '../firebase/index';
import Modal from './Modal';
import symblToken from '../symblToken';
import axios from 'axios';
import { PropertySafetyFilled } from '@ant-design/icons';

const DebateRoom = (props) => {
  const [mediaButton, setMediaButton] = useState(false);
  const [createRoomButton, setCreateRoomButton] = useState(true);
  const [joinRoomButton, setJoinRoomButton] = useState(true);
  const [hangUpButton, setHangUpButton] = useState(true);
  const [roomId, setRoomId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [host, setHost] = useState("");
  const [guest, setGuest] = useState("");
  const [status, setStatus] = useState("Not Connected");
  const [mute, setMute] = useState(false);
  const [conversationId, setConversationId] = useState("");

  const localStream = useRef();
  const remoteStream = useRef();
  const wsRef = useRef();

  const registerPeerConnectionListeners = () =>{
    console.log(peerConnection)
    peerConnection.addEventListener('icegatheringstatechange', () => {
      console.log(
          `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
    });
  
    peerConnection.addEventListener('connectionstatechange', () => {
      setStatus(peerConnection.connectionState);
      console.log(`Connection state change: ${peerConnection.connectionState}`);
    });
  
    peerConnection.addEventListener('signalingstatechange', () => {
      console.log(`Signaling state change: ${peerConnection.signalingState}`);
    });
  
    peerConnection.addEventListener('iceconnectionstatechange ', () => {
      console.log(
          `ICE connection state change: ${peerConnection.iceConnectionState}`);
    });
  }

  const configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  let peerConnection = null;

  const onClickCreateRoom = async() =>{
    setCreateRoomButton(false);
    setJoinRoomButton(false);
    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').doc();
    console.log('Create PeerConnection with configuration: ', configuration);
    peerConnection = new RTCPeerConnection(configuration); 
    registerPeerConnectionListeners();
    localStream.current.srcObject.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream.current.srcObject);
      });
    // Code for collecting ICE candidates below
    const callerCandidatesCollection = roomRef.collection('callerCandidates');

    peerConnection.addEventListener('icecandidate', event => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        callerCandidatesCollection.add(event.candidate.toJSON());
      });
    // Code for collecting ICE candidates above

    // Code for creating a room below
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('Created offer:', offer);

    const roomWithOffer = {
        'offer': {
        type: offer.type,
        sdp: offer.sdp,
        user: props.profile.user_name
        },
    };
    await roomRef.set(roomWithOffer);
    setRoomId(roomRef.id);
    // Code for creating a room above

    peerConnection.addEventListener('track', event => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach(track => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.current.srcObject.addTrack(track);
      });
    });

    // Listening for remote session description below
    roomRef.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        setGuest(data.answer.user);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above
  }

  const joinRoom = async() =>{
    setCreateRoomButton(true);
    setJoinRoomButton(true);
    console.log('Join room: ', roomId);
    await joinRoomById(roomId);
  }

  const joinRoomById = async() =>{
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(`${roomId}`);
    const roomSnapshot = await roomRef.get();
    console.log('Got room:', roomSnapshot.exists);
    if (roomSnapshot.exists) {
      console.log('Create PeerConnection with configuration: ', configuration);
      peerConnection = new RTCPeerConnection(configuration);
      registerPeerConnectionListeners();
      localStream.current.srcObject.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream.current.srcObject);
      });

      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
      peerConnection.addEventListener('icecandidate', event => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        calleeCandidatesCollection.add(event.candidate.toJSON());
      });
      // Code for collecting ICE candidates above

      peerConnection.addEventListener('track', event => {
        console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach(track => {
          console.log('Add a track to the remoteStream:', track);
          remoteStream.current.srcObject.addTrack(track);
        });
      });

      // Code for creating SDP answer below
      const offer = roomSnapshot.data().offer;
      console.log('Got offer:', offer);
      setHost(offer.user);
      await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.createAnswer();
      console.log('Created answer:', answer);
      await peerConnection.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
          user: props.profile.user_name
        },
      };
      await roomRef.update(roomWithAnswer);
      // Code for creating SDP answer above

      // Listening for remote ICE candidates below
      roomRef.collection('callerCandidates').onSnapshot(snapshot => {
        snapshot.docChanges().forEach(async change => {
          if (change.type === 'added') {
            let data = change.doc.data();
            console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listening for remote ICE candidates above
    }
  }

  const onClickMedia = async() =>{
    const stream = await navigator.mediaDevices.getUserMedia({video: false, audio: true});
    localStream.current.srcObject = stream;
    remoteStream.current.srcObject = new MediaStream();
    onClickSymbl();
    setMediaButton(true);
    setJoinRoomButton(false);
    setCreateRoomButton(false);
    setHangUpButton(false);
  }

  const onClickHangUp = async() =>{
    await axios.post('https://debately.herokuapp.com/profiles/add_meeting', {profile_email: props.profile.email, meeting_id: conversationId})
    const tracks = localStream.current.srcObject.getTracks();
    tracks.forEach(track => {
      track.stop();
    });

    if (remoteStream.current.srcObject) {
      remoteStream.current.srcObject.getTracks().forEach(track => track.stop());
    }

    if (peerConnection) {
      peerConnection.close();
    }

    wsRef.current.send(JSON.stringify({
      "type": "stop_request"
    }));

    localStream.current.srcObject = null;
    remoteStream.current.srcObject = null;
    setMediaButton(false);
    setJoinRoomButton(true);
    setCreateRoomButton(true);
    setHangUpButton(true);
    setRoomId("");
    props.debate(false);
  }

  const onClickMute = async() =>{
    if(mute === false){
      localStream.current.srcObject.getAudioTracks()[0].enabled = false;
      setMute(true);
    }else{
      localStream.current.srcObject.getAudioTracks()[0].enabled = true;
      setMute(false);
    }
  }

  const onClickSymbl = () =>{
    const accessToken = symblToken.bearer;
    const uniqueMeetingId = btoa("user@example.com")
    const symblEndpoint = `wss://api.symbl.ai/v1/realtime/insights/${uniqueMeetingId}?access_token=${accessToken}`;
    
    const ws = new WebSocket(symblEndpoint);

    wsRef.current = ws;
    
    // Fired when a message is received from the WebSocket server
    wsRef.current.onmessage = (event) => {
      // You can find the conversationId in event.message.data.conversationId;
      const data = JSON.parse(event.data);
      if (data.type === 'message' && data.message.hasOwnProperty('data')) {
        setConversationId(data.message.data.conversationId);
        console.log('conversationId', data.message.data.conversationId);
      }
      if (data.type === 'message_response') {
        for (let message of data.messages) {
          let format = /[*]/;
          console.log(format.test(message.payload.content))
          console.log('Transcript (more accurate): ', message.payload.content);
          if(format.test(message.payload.content)){
            alert('Debate ended for using cuss words!');
            onClickHangUp();
          }
        }
      }
      if (data.type === 'topic_response') {
        for (let topic of data.topics) {
          // console.log('Topic detected: ', topic.phrases)
        }
      }
      if (data.type === 'insight_response') {
        for (let insight of data.insights) {
          // console.log('Insight detected: ', insight.payload.content);
        }
      }
      if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
        // console.log('Live transcript (less accurate): ', data.message.punctuated.transcript)
      }
      // console.log(`Response type: ${data.type}. Object: `, data);
    };
    
    // Fired when the WebSocket closes unexpectedly due to an error or lost connetion
    wsRef.current.onerror  = (err) => {
      console.error(err);
    };
    
    // Fired when the WebSocket connection has been closed
    wsRef.current.onclose = (event) => {
      console.info('Connection to websocket closed');
    };
    
    // Fired when the connection succeeds.
    wsRef.current.onopen = (event) => {
      wsRef.current.send(JSON.stringify({
        type: 'start_request',
        meetingTitle: 'Websockets How-to', // Conversation name
        insightTypes: ['question', 'action_item'], // Will enable insight generation
        config: {
          confidenceThreshold: 0.5,
          languageCode: 'en-US',
          speechRecognition: {
            encoding: 'LINEAR16',
            sampleRateHertz: 44100,
          }
        },
        speaker: {
          userId: 'example@symbl.ai',
          name: 'Example Sample',
        }
      }));
    };

    const AudioContext = window.AudioContext;
    const context = new AudioContext();
    const source = context.createMediaStreamSource(localStream.current.srcObject);
    const processor = context.createScriptProcessor(1024, 1, 1);
    const gainNode = context.createGain();
    source.connect(gainNode);
    gainNode.connect(processor);
    processor.connect(context.destination);
    processor.onaudioprocess = (e) => {
      // convert to 16-bit payload
      const inputData = e.inputBuffer.getChannelData(0) || new Float32Array(this.bufferSize);
      const targetBuffer = new Int16Array(inputData.length);
      for (let index = inputData.length; index > 0; index--) {
          targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
      }
      // Send audio stream to websocket.
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(targetBuffer.buffer);
      }
    };

  }

  

  return (
    <div>
        <span style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "40px"}}>Mandir v/s Masjid</span>
      {/* <span style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "25px"}}>
        00:00
      </span> */}
      <div>
      <Row align="middle">
              <Col span={10}><AudioPlayer user={host} status={status} mute={mute} setMute={onClickMute}/></Col>
              <Col span={10} push={3}><AudioPlayer user={guest} status={status}/></Col>
        </Row>
      </div>
      <div>
        
      </div>
      <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "20px"}}>
        {roomId}
      </div>
      <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "20px", marginTop: "1rem"}}>
        <Button type="primary" style={{margin: "1rem"}} onClick={onClickMedia}>
          Start Microphone
        </Button>
        <Button type="primary" style={{margin: "1rem"}} onClick={onClickCreateRoom}> 
          Create Debate Room
        </Button>
        <Button type="primary" style={{margin: "1rem"}} onClick={()=>setShowModal(true)}>
          Join by Id
        </Button>
        <Button type="danger" style={{margin: "1rem"}} onClick={onClickHangUp}>
          End Debate
        </Button>
        <div>
            <audio id="localVideo" muted autoPlay ref={localStream} playsInline ></audio>
            <audio id="remoteVideo" autoPlay playsInline ref={remoteStream}></audio>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} joinRoom={joinRoom} roomId={roomId} setRoomId={setRoomId} />
      </div>
    </div>
  );
};
export default DebateRoom;