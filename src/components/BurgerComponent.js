import React from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen, faCalendar,faNotesMedical,faHospital,faCross ,faFileArchive} from "@fortawesome/free-solid-svg-icons";
import logo from "../R.png";

function Burger() {
  return (
    <div id="grad2" className="navleft">
      <Nav tabs vertical>
        <NavItem>
          <NavLink
            href="/login"
            //style={{ "backgroundColor": "rgb(108, 187, 68)" }}
          >
            <picture>
              <source media="(max-width:768px)" srcSet={logo} width="16px" height="18px"/>
              <img src={logo} width="100px" height="100px" alt="logo"></img>
            </picture>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/login">
              <FontAwesomeIcon
                icon={faDoorOpen}
                style={{ "fontSize": "15px"}}
              />{" "}Login</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/calendar"><FontAwesomeIcon
                icon={faCalendar}
                style={{ "fontSize": "15px", "alignItems": "center" }}
              />{" "}Calendario</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/vitals">
              <FontAwesomeIcon
                icon={faCross}
                style={{ "fontSize": "15px"}}
              />{" "}Preparación</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/evolucion">
              <FontAwesomeIcon
                icon={faHospital}
                style={{ "fontSize": "15px"}}
              />{" "}HCE</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/cie">
              <FontAwesomeIcon
                icon={faNotesMedical}
                style={{ "fontSize": "15px"}}
              />{" "}Cie10</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/inventory"><FontAwesomeIcon
                icon={faFileArchive}
                style={{ "fontSize": "15px"}}
              />{" "}Inventario</NavLink>
        </NavItem>
      </Nav>
    </div>
  );
}
export default Burger;
