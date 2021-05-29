import React, { useContext, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import ProfilePage from "./ProfilePage";
import ProfileViewer from "./ProfileViewer";
import { UserContext } from "../context/UserContext";
import { logoutUser } from "../services/magic";
import DebateRoom from "./DebateRoom";
const Dashboard = () => {
  const [debate, setDebate] = useState(false);
  const { email } = useContext(UserContext);
  const history = useHistory();
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
          <DebateRoom debate={setDebate}/>
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
    <ProfileViewer debate={setDebate}/>
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
