import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import logo from '../R.png';

function Burger() {
  return (
    <div className="navleft">
      <Nav tabs vertical>
        <NavItem>
          <NavLink href="/calendar" active>
            <img src={logo} style={{ width: '100px', height: '100px' }} />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/calendar">Calendar</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/vitals">Signos Vitales</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/evolucion">Evolucion</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/cie">Cie10</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/inventory">Inventory</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
export default Burger;
