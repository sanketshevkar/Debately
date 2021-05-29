import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../services/magic";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Image,
  Layout,
} from "antd";
import logo from "../assets/logo512.png";

const Authenticate = () => {
  const { Title } = Typography;
  const { Footer, Content } = Layout;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const handleSubmit = async (event) => {
    // event.preventDefault();
    setLoading(true);
    if (!email) {
      setLoading(false);
      setError("Email is Invalid");
      return;
    }
    try {
      await loginUser(email);
      setLoading(false);
      history.push("/dashboard");
      window.location.reload();
    } catch (error) {
      setError("Unable to log in");
      console.error(error);
    }
  };
  const handleChange = (event) => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  return (
    <div>
      <Row>
        <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          <Card>
            <Title>Login</Title>

            <Form onFinish={handleSubmit}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {loading ? "Loading..." : "Send"}
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
        </Col>

        <Col span={4}></Col>

        <Col span={4}>
          <Image src={logo} />
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
          <h1>Content</h1>
        </Col>
      </Row>



      <Footer style={{ textAlign: 'center' }}>Developed by team Tier-4</Footer>
    </div>
  );
};
export default Authenticate;
