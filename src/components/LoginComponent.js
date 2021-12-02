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
import React, { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [value,setValue]=useState({user:{username:"",password:"",role:""},jwt_token:""});

  const onSubmit = (data) => {
    const request = {
      username: data.username,
      password: data.password,
      role: data.role,
    };
    axios
      .post("http://localhost:3000/auth/login/", request)
      .then((result) => {
        if(result.data.jwt_token){
          localStorage.setItem("user", JSON.stringify(result.data));
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
                  {...register("username")}
                />
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
                  {...register("password")}
                />
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
      </Container>{value.user.role==="ADMIN"?<Redirect to="/calendar"/>:""}
    </div>
  );
}

export default Login;
