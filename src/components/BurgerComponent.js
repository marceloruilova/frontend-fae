import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import logo from "../R.png";

function Burger() {
  return (
    <div id="grad2" className="navleft">
      <Nav tabs vertical>
        <NavItem>
          <NavLink
            href="/login"
            style={{ "background-color": "rgb(108, 187, 68)" }}
          >
            <img
              src={logo}
              style={{ width: "102px", height: "100px" }}
              alt="fae-logo"
            />
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/calendar">Calendario</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/vitals">Preparación</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/evolucion">HCE</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/cie">Cie10</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/inventory">Inventario</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
export default Burger;
