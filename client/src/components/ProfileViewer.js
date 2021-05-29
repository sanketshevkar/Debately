import React, { useState, useEffect } from "react";
import { Descriptions, Row, Col, Card } from "antd";

const ProfileViewer = () => {
  const [userProfile, setUserProfile] = useState({
    userName: "test",
    email: "test@gmail.com",
    rating: 2,
    walletAmount: 200,
  });

  useEffect(() => {
    //fetch data from database
    //set UserProfile
  }, []);
  return (
    <div>
      <Row>
        <Col span={8} offset={7}>
          <Card>
            <Descriptions title="User Info">
              <Descriptions.Item label="UserName">
                {userProfile.userName}
              </Descriptions.Item>

              <Descriptions.Item label="Email">
                {userProfile.email}
              </Descriptions.Item>

              <Descriptions.Item label="Rating">
                {userProfile.rating}
              </Descriptions.Item>

              <Descriptions.Item label="Wallet">
                {userProfile.walletAmount}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileViewer;
