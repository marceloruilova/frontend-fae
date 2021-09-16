import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import logo from '../R.png';

function Burger() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
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
          <NavLink href="/vitals">
            Signos Vitales
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/evolucion">
            Evolucion
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
export default Burger;
