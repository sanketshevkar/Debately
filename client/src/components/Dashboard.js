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
  const [profile, setProfile] = useState(null);
  const { email } = useContext(UserContext);
  const history = useHistory();
  useEffect(() => {
    const getProfile = async() =>{
      const response = await axios.get(`https://debately.herokuapp.com/profiles/${email}`);
      setProfile(response.data);
      console.log(response.data);
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

  const onClickAnalyse = async(meeting_id) =>{
    const response = await axios.get(`https://debately.herokuapp.com/profiles/analytics/${meeting_id}`);
    console.log(response.data)
  }

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
    return( 
    <div style={{ margin: "2rem" }}>
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
        {profile!==null && profile.meeting_id_list.length!==0?<span style={{display: "flex",
          justifyContent: "center",
            alignItems: "center", marginTop: '2rem', fontSize: '3rem'}}>Your Debates</span>:<div/>}
        
            {profile!==null && profile.meeting_id_list.map((meeting_id) =>
            <div style={{display: "flex",
            justifyContent: "center",
              alignItems: "center", margin: '0.5rem'}}>
            <div style={{padding: '6px 25px 10px 10px', marginTop: '2rem',border: '1px solid gray', borderRadius: '10px', height: '3rem', width: '50rem'}}>
              <span style={{fontSize: '20px'}}>{meeting_id}</span>
              <Button type='primary' style={{float: 'right'}} onClick={()=>onClickAnalyse(meeting_id)}>Get Analytics</Button>
            </div>
          </div>
)}
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
