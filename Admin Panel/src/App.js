import { useState} from 'react';
import 'antd/dist/antd.css';

import Login from "./Components/Login";
import Dashboard from './Components/Dashboard';
import Customers from './Components/Customers';
import Salons from './Components/Salons';
import Header from './Components/Header';
import MembershipPlans from './Components/MembershipPlans';
import Complains from './Components/Complains'
import { UserContext } from './userContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  const [ isloggedIn, setloggedIn ] = useState(false);
  return (
    <div>
      <UserContext.Provider value={{ isloggedIn, setloggedIn }}>
        {(isloggedIn) ?
          (<Router>
            <Header />
            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route path="/customers">
                <Customers />
              </Route>
              <Route path="/salons">
                <Salons />
              </Route>
              <Route path="/membershipplans">
                <MembershipPlans />
              </Route>
              <Route path="/complains">
                <Complains />
              </Route>
            </Switch>
          </Router>) :
          <Login />
        }
      </UserContext.Provider>
    </div>
  );
};
export default App;
