import {
  Label,
  Row,
  Container,
  Col,
  FormGroup,
  Input,
  Form,
  Button,
} from "reactstrap";
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import axios from "axios";
import UserModal from "./modal/newUser";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [value, setValue] = useState({user:{username:"",password:"",email:"",role:""}});
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const reload=()=>window.location.reload();
  
  const onSubmit = (data) => {
    const request = {
      username: data.username,
      password: data.password,
    };
    axios
      .post("http://localhost:3000/auth/login/", request)
      .then((result) => {
        if(result.data.jwt_token){
          if(result.data.user.role==="ADMIN"){
            setIsOpen(!isOpen);}
          sessionStorage.setItem("user", JSON.stringify(result.data));
          setValue(result.data);
        }
      })
      .catch((error) => alert("Error"));
  };
  return (
    <div className="login-box-container">
      <Container
        className="loginwidth"
      >
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ "align-content": "center", "align-items": "center" }}
        >
          <Row>
            <Col>
              <FontAwesomeIcon
                icon={faUser}
                style={{ "font-size": "90px", "align-items": "center" }}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label
                  style={{
                    "font-family": " Georgia, serif",
                    "font-size": "30px",
                  }}
                >
                  Ingreso
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
            <Col xs="1">
              <FontAwesomeIcon icon={faUser} />{" "}
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Usuario"
                  {...register("username", {
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                  })}
                />
                {/* use role="alert" to announce the error message */}
              {errors.username && errors.username.type === "required" && (
                <span role="alert">This is required</span>
              )}
              {errors.username && errors.username.type === "maxLength" && (
                <span role="alert">Max length exceeded</span>
              )}
              {errors.username && errors.username.type === "minLength" && (
                <span role="alert">Min length exceeded</span>
              )}
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
            <Col xs="1">
              <FontAwesomeIcon icon={faLock} />{" "}
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Contraseña"
                  {...register("password", {
                    required: true,
                    minLength: 5,
                    maxLength: 100,
                  })}
                />
                {/* use role="alert" to announce the error message */}
              {errors.password && errors.password.type === "required" && (
                <span role="alert">This is required</span>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <span role="alert">Max length exceeded</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span role="alert">Min length exceeded</span>
              )}
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ "padding-top": "10px", "padding-bottom": "10px" }}>
            <Col xs="1">
              <FormGroup>
                <Input
                  type="radio"
                  id="remember"
                  name="remember"
                  {...register("remember")}
                />
              </FormGroup>
            </Col>
            <Col xs="2">
              <Label style={{ "padding-left": "5px" }}>Recuérdame</Label>
            </Col>
          </Row>
          <Row style={{ "padding-left": "40px", "padding-right": "10px" }}>
            <Button type="submit" value="submit" color="light" block>
              Ingresar
            </Button>
          </Row>
        </Form>
      </Container>
      {isOpen?<UserModal 
            isOpen={isOpen}
            toggle={toggle}
            reload={reload}/>:""}
      {JSON.parse(sessionStorage.getItem("user"))===null?"":
      JSON.parse(sessionStorage.getItem("user")).user.role==="DOCTOR2"||value.user.role==="DOCTOR2"?<Redirect to="/evolucion"/>:""}
      {JSON.parse(sessionStorage.getItem("user"))===null?"":
      JSON.parse(sessionStorage.getItem("user")).user.role==="DOCTOR"||value.user.role==="DOCTOR1"?<Redirect to="/inventory"/>:""}
      {JSON.parse(sessionStorage.getItem("user"))===null?"":
      JSON.parse(sessionStorage.getItem("user")).user.role==="CITE"||value.user.role==="CITE"?<Redirect to="/calendar"/>:""}
      </div>
  );
}

export default Login;
