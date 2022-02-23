import React,{useState,useEffect} from "react";
import {Button,Row,Col} from "reactstrap";

function Header() {
  const [isLogged,setIsLogged]=useState(false);
  useEffect(() => {
    const user= JSON.parse(sessionStorage.getItem("user"));
    if(user!==null){
      setIsLogged(!isLogged);
    }
  }, [isLogged]);

  return (
    <div id="grad1" className="container-fluid header">
      <Row>
      <Col >
      <h1>Bienvenido a tu trabajo</h1>
      </Col>
      {isLogged&&<Col xs="2">
      {sessionStorage.removeItem("user")===null?"":<Button onClick={ () => {
  sessionStorage.removeItem("user");setIsLogged(!isLogged);
}} color="outline-success" style={{marginTop:"8px"}}>Logout</Button>}
  </Col>}</Row></div>
  );
}
export default Header;
