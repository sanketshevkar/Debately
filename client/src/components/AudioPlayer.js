import React from "react";
import { Avatar, Button } from "antd";
import {
  UserOutlined,
  CheckSquareFilled,
  AudioOutlined,
  AudioMutedOutlined
} from "@ant-design/icons";
import "antd/dist/antd.css";

const MuteLogo = (props) =>{
  if(props.status === false){
    return(<AudioOutlined />)
  }else{
    return(<AudioMutedOutlined />)
  }
}

const AudioPlayer = (props) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar size={200} icon={<UserOutlined />} />
      </div>
      <span
        style={{
          fontColor: "black",
          font: "roboto",
          fontSize: "25px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <strong>{props.user}</strong>
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckSquareFilled style={{ color: "green" }} />
        <span style={{ fontColor: "black", font: "roboto", fontSize: "20px" }}>
          {props.status}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button shape="circle" size="large" icon={<MuteLogo status={props.mute} />} onClick={props.setMute}>{props.mute}</Button>
      </div>
    </div>
  );
};
export default AudioPlayer;
