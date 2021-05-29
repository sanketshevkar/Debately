import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Card,
  DatePicker
} from "antd";

const ProfilePage = () => {

  const onFinish = (values) => {
    //post input to api using axios
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <span style={{display: "flex",
  justifyContent: "center",
  alignItems: "center", fontSize: "40px"}}>Build Your Profile ✨</span>
      <Row>
        <Col span={8} offset={8}>
          <Card bodyStyle={{borderStyle:'solid' ,borderRadius: '10px', borderColor: 'gray'}}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              
              <Form.Item>
                <Input placeholder="Email ID"/>
              </Form.Item>

              <Form.Item>
                <Input placeholder="Username"/>
              </Form.Item>

              <Form.Item>
                <DatePicker placeholder="DOB"/>
              </Form.Item>

              <Form.Item>
                <Input.TextArea placeholder="Description About Yourself"/>
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
