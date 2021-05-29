import React from 'react';
import AudioPlayer from './AudioPlayer';

const DebateRoom = () => {

  return (
    <div>
      <div>
        Debate Topic
      </div>
      <div>
        Timer
      </div>
      <div>
        <AudioPlayer />
      </div>
      <div>
        <AudioPlayer />
      </div>
      <div>
        DebateRoom id
      </div>
      <button>
        Start Microphone
      </button>
      <button>
        Create Debate Room
      </button>
      <button>
        Join by Id
      </button>
      <button>
        End Debate
      </button>
    </div>
  );
};
export default DebateRoom;