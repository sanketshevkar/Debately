import React from 'react';
import AudioPlayer from './AudioPlayer';
import { Row, Col, Button } from 'antd';

const DebateRoom = () => {

  return (
    <div>
        <span style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "40px"}}>Mandir v/s Masjid</span>
      <span style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "25px"}}>
        00:00
      </span>
      <div>
      <Row align="middle">
              <Col span={10}><AudioPlayer /></Col>
              <Col span={10} push={3}><AudioPlayer /></Col>
        </Row>
      </div>
      <div>
        
      </div>
      <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "20px"}}>
        DebateRoom Id
      </div>
      <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "20px", marginTop: "1rem"}}>
        <Button type="primary" style={{margin: "1rem"}}>
          Start Microphone
        </Button>
        <Button type="primary" style={{margin: "1rem"}}> 
          Create Debate Room
        </Button>
        <Button type="primary" style={{margin: "1rem"}}>
          Join by Id
        </Button>
        <Button type="danger" style={{margin: "1rem"}}>
          End Debate
        </Button>
      </div>
    </div>
  );
};
export default DebateRoom;