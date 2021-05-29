import React, { useState, useEffect } from "react";
import { Descriptions, Row, Col, Card, Skeleton, Avatar, Button } from "antd";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const ProfileViewer = (props) => {

  const { Meta } = Card;

  useEffect(() => {
    //fetch data from database
    //set UserProfile
  }, []);

  const onClickHandler = () =>{
    props.debate(true)
  }
  return (
    <div>
            <span style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "40px"}}>Hello User 👋</span>
      <Row>
        <Col span={8} offset={8}>
          <Card bodyStyle={{borderStyle:'solid' ,borderRadius: '10px', borderColor: 'gray'}}>
          <Skeleton loading={false} avatar active>
            <Meta
              style={{fontSize: '20px'}}
              avatar={
                <Avatar size={64} icon={<UserOutlined />}/>
              }
              description={
              <div>
                <span style={{fontSize: '30px', fontWeight: 'strong'}}>
                  <b>{props.profile.user_name}</b>
                </span>
                <div style={{fontSize: '15px'}}>
                {props.profile.description}
                </div>
                <div style={{fontSize: '15px', marginTop: '5px'}}>
                  <span><b>Birth-Date:</b> </span><span>{props.profile.birth_date}</span>
                </div>
              </div>}
            />
          </Skeleton>
          </Card>
        </Col>
      </Row>
      <div style={{display: "flex",
          justifyContent: "center",
            alignItems: "center", marginTop: '2rem'}}>
        <Button icon={<UsergroupAddOutlined />} type="primary" shape="round" size="large" onClick={onClickHandler}>Start Debate</Button>
      </div>
    </div>
  );
};

export default ProfileViewer;
