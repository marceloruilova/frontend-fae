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
import logo from '../logo.svg';

function Burger() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);
  return (
    <div className="navleft">
      <Nav tabs vertical>
        <NavItem>
          <NavLink href="#" active>
            <img src={logo} style={{ width: '100px', height: '100px' }} />
          </NavLink>
        </NavItem>
        <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle nav caret>
            drop down
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>1</DropdownItem>
            <DropdownItem disabled>2</DropdownItem>
            <DropdownItem>3</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>4</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavItem>
          <NavLink href="#">another link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">some Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">
            disabled
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
export default Burger;
