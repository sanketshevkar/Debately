import React, { useState, useEffect } from 'react';
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from './context/UserContext';
import { checkUser } from './services/magic';
import Authenticate from './components/Authenticate';
import Dashboard from './components/Dashboard';
import Meeting from './components/Meeting';
import DebateRoom from './components/DebateRoom';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
const App = () => {
  const [user, setUser] = useState({ isLoggedIn: null, email: '' });
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <Spinner animation="border" />
      </div>
    );
  }
  return (
    <UserContext.Provider value={user}>
      <Navbar />
      <Router>
        {user.isLoggedIn && <Redirect to={{ pathname: '/app' }} />}
        <Switch>
          <Route exact path="/" component={Authenticate} />
          <PrivateRoute path="/app" component={Dashboard} />
          <PrivateRoute path="/meetings" component={Meeting} />
          <PrivateRoute path="/debateRoom" component={DebateRoom} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};
export default App;