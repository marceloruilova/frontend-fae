import { Switch, Route, Redirect } from 'react-router-dom';
import { React } from 'react';
import Burger from './BurgerComponent';
import Header from './HeaderComponent';
import Calendar from './CalendarComponent';
import Evolucion from './EvolucionComponent';
import Login from './LoginComponent';
import Cie from './CieComponent';
import Vitals from './LifesignsComponent';
import Inventory from './InventoryComponent';
import {PrivateRoute} from './PrivateRoute';

function Main() {
  const Role={Admin:"ADMIN",Doctorp:"DOCTORP",Doctorh:"DOCTORH",Citas:"Citas",Inventario:"Inventario"}
  return (
    <div className="global">
      <Burger />
      <div className="container-fluid content">
        <Header />
        <Switch>
          <Route path="/login" component={() => <Login />} />
          <PrivateRoute path="/calendar" roles={[Role.Citas]} component={() => <Calendar />} />
          <PrivateRoute path="/vitals" roles={[Role.Doctorp,Role.Doctorh]} component={() => <Vitals />} />
          <PrivateRoute path="/evolucion" roles={[Role.Doctorh,Role.Doctorp]} component={() => <Evolucion />} />
          <PrivateRoute path="/cie" roles={[Role.Doctorh,Role.Doctorp]} component={() => <Cie />} />
          <PrivateRoute path="/inventory" roles={[Role.Inventario]} component={()=><Inventory/>} />
          <Redirect to="/login" />
        </Switch>
      </div>
    </div>
  );
}

export default Main;
