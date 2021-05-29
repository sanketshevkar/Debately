import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  DatePicker
} from "antd";
import axios from "axios";

const ProfilePage = () => {

  const onFinish = async (values) => {
    //post input to api using axios
    // console.log("Success:", values);
    const { email,
      user_name,
      description } = values

      const profile = {
        email: email,
        user_name: user_name,
        description: description,
        birth_date: "10/01/2000",
        name: " ",
        wallet_amt: 0,
        rating: 0,
        total_debates_attended: 0,
        meeting_id_list: [
        ]
      }


    const response = await axios.post('https://debately.herokuapp.com/profiles/', profile);
    console.log(response);
    window.location.reload();

  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <span style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center", fontSize: "40px"
      }}>Build Your Profile ✨</span>
      <Row>
        <Col span={8} offset={8}>
          <Card bodyStyle={{ borderStyle: 'solid', borderRadius: '10px', borderColor: 'gray' }}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >

              <Form.Item name="email">
                <Input placeholder="Email ID" />
              </Form.Item>

              <Form.Item name="user_name">
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item name="birth_date">
                <DatePicker placeholder="DOB" />
              </Form.Item>

              <Form.Item name="description">
                <Input.TextArea placeholder="Description About Yourself" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;