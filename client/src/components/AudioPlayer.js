import React from 'react';
import { Avatar, Button } from 'antd';
import { UserOutlined, CheckSquareFilled, AudioOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

const AudioPlayer = () => {

  return (
    <div>
      <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center"}}>
        <Avatar size={200} icon={<UserOutlined />} />
      </div>
      <span style={{fontColor: "black", font: 'roboto', fontSize: '25px', display: "flex",
  justifyContent: "center",
  alignItems: "center"}}>
          <strong>username</strong>
      </span>
      <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center"}}>
          <CheckSquareFilled style={{color: "green"}}/> 
          <span style={{fontColor: "black", font: 'roboto', fontSize: '20px'}}>online</span>
      </div>
      <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center"}}>
      <Button shape="circle" size="large" icon={<AudioOutlined />} />
  </div>
    </div>
  );
};
export default AudioPlayer;