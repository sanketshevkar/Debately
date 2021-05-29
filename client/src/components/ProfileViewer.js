import React, { useState, useEffect } from "react";
import { Descriptions, Row, Col, Card, Skeleton, Avatar, Button } from "antd";
import { UserOutlined, UsergroupAddOutlined } from "@ant-design/icons";

const ProfileViewer = (props) => {
  const [userProfile, setUserProfile] = useState({
    userName: "test",
    email: "test@gmail.com",
    rating: 2,
    walletAmount: 200,
  });

  // const {debate, setDebate} = useState(props.debate);

  const { Meta } = Card;

  useEffect(() => {
    //fetch data from database
    //set UserProfile
  }, []);

  const onClickHandler = () =>{
    console.log(props)
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
                  <b>Username</b>
                </span>
                <div style={{fontSize: '15px'}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. it to make a type specimen book.
                </div>
                <div style={{fontSize: '15px', marginTop: '5px'}}>
                  <span><b>Birth-Date:</b> </span><span>23/12/2000</span>
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
