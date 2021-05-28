import './App.css';
import React, { useState, useRef } from 'react';

function App() {
  const [mediaButton, setMediaButton] = useState(false);
  const [createRoomButton, setCreateRoomButton] = useState(true);
  const [joinRoomButton, setJoinRoomButton] = useState(true);
  const [hangUpButton, setHangUpButton] = useState(true);
  const [roomId, setRoomId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const localStream = useRef();
  const remoteStream = useRef();

  return (
    <div className="App">
      <button type="button">create room</button>
      <button type="button">join room</button>
      <button type="button">hang up</button>
    </div>
  );
}

export default App;
