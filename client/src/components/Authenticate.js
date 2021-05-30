import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../services/magic";
import { ThunderboltOutlined } from "@ant-design/icons";
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
import logo from "../assets/LandingVector.png";

const Authenticate = () => {
  const { Title } = Typography;
  const { Footer, Content } = Layout;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    alert("Please ensure that you connect using mobile internet hotspot! This app uses TURN severs for WebRTC connections, so NAT traversal for devices connected to wifi or behind firewall is not possible! Sorry for the inconvinience!")
  }, []);

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
        <Col span={8}>
          <div style={{borderStyle:'solid' ,borderRadius: '20px',  margin: '3rem',borderColor: 'gray', width: '30rem', padding: '10px'}}>
            <Title><span style={{fontSize: '3rem', color: 'gray', display: "flex",
  justifyContent: "center",
  alignItems: "center"}}>Login 🔒</span></Title>

            <Form onFinish={handleSubmit}>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input
                  size="large"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item>
                <div style={{display: "flex",
  justifyContent: "center",
  alignItems: "center"}}>
                <Button type="danger" size="large" shape="round" htmlType="submit" icon={<ThunderboltOutlined />}>
                  {loading ? "Loading..." : "Go"}
                </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
          <div style={{margin: "3rem"}}>
            <span style={{fontSize: "2.6rem"}}>
               New, Fun and Safe Way To Practice Debating!
            </span>
          </div>
        </Col>


        <Col span={10} push={5}>
          <Image src={logo} />
        </Col>
      </Row>
    </div>
  );
};
export default Authenticate;
