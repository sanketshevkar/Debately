import React, { useContext, useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import axios from 'axios'
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import ProfilePage from "./ProfilePage";
import ProfileViewer from "./ProfileViewer";
import { UserContext } from "../context/UserContext";
import { logoutUser } from "../services/magic";
import DebateRoom from "./DebateRoom";
const Dashboard = () => {

  const [debate, setDebate] = useState(false);
  const [profile, setProfile] = useState({});
  const { email } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    const getProfile = async() =>{
      const response = await axios.get(`https://debately.herokuapp.com/profiles/${email}`);
      setProfile(response.data);
      console.log(response.data)
    }
    getProfile();
  }, []);
  const handleLogOut = async () => {
    try {
      await logoutUser();
      history.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
  if(debate === true){
    return(
      <div style={{ margin: "2rem" }}>
          <DebateRoom debate={setDebate} profile={profile}/>
          <div style={{display: "flex",
          justifyContent: "center",
            alignItems: "center", marginTop: '2rem'}}>
          <Button
            type="danger"
            shape="round"
            icon={<LogoutOutlined />}
            size="large"
            onClick={handleLogOut}
          >
            Sign Out
          </Button>
        </div>
        </div>
    )
  }else if(profile !== null ){
    return( <div style={{ margin: "2rem" }}>
    <ProfileViewer debate={setDebate} profile={profile}/>
    <div style={{display: "flex",
          justifyContent: "center",
            alignItems: "center", marginTop: '2rem'}}>
          <Button
            type="danger"
            shape="round"
            icon={<LogoutOutlined />}
            size="large"
            onClick={handleLogOut}
          >
            Sign Out
          </Button>
        </div>
  </div>
  )
  }else{
    return( <div style={{ margin: "2rem" }}>
    <ProfilePage />
    <div style={{display: "flex",
          justifyContent: "center",
            alignItems: "center", marginTop: '2rem'}}>
          <Button
            type="danger"
            shape="round"
            icon={<LogoutOutlined />}
            size="large"
            onClick={handleLogOut}
          >
            Sign Out
          </Button>
        </div>
  </div>
  )
  }
};
export default withRouter(Dashboard);
