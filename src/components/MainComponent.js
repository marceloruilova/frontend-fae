import { Switch,Route,Redirect } from 'react-router-dom';
import {React} from "react";
import Burger from './BurgerComponent';
import Header from './HeaderComponent';
import Calendar from './CalendarComponent';
import Evolucion from './EvolucionComponent';
import Login from './LoginComponent';
import Vitals from './LifesignsComponent';

function Main() {

  return (
    <div className="global">
        <Burger />
        <div className="content">
            <Header />
            <Switch>
              <Route path="/login" component={() => <Login />}/>
              <Route path="/calendar" component={() => <Calendar />}/>
              <Route path="/vitals" component={() => <Vitals />}/>
              <Route path="/evolucion" component={() => <Evolucion />}/>
            </Switch>
        </div>
    </div>
  );
}

export default Main;