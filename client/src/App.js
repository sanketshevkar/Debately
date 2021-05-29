import React, { useState, useEffect } from "react";
import './App.css';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Spinner from "react-bootstrap/Spinner";
import { UserContext } from "./context/UserContext";
import { checkUser } from "./services/magic";
import Authenticate from "./components/Authenticate";
import Dashboard from "./components/Dashboard";
import Meeting from "./components/Meeting";
import DebateRoom from "./components/DebateRoom";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from './components/ProfilePage';
import ProfileViewer from './components/ProfileViewer'


const App = () => {
  const [user, setUser] = useState({ isLoggedIn: null, email: "" });
  const [loading, setLoading] = useState();
  useEffect(() => {
    const validateUser = async () => {
      setLoading(true);
      try {
        await checkUser(setUser);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    validateUser();
  }, [user.isLoggedIn]);
  if (loading) {
    return (
      <div>
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <UserContext.Provider value={user}>
        <Router>
          {user.isLoggedIn && <Redirect to={{ pathname: "/dashboard" }} />}
          <Switch>
            <Route exact path="/" component={Authenticate} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/meetings" component={Meeting} />
            <PrivateRoute path="/debateRoom" component={DebateRoom} />
            <Route path="/profilePage" component={ProfilePage} />
            <Route path="/profileViewer" component={ProfileViewer} />
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
};
export default App;