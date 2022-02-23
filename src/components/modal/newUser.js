import React from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
  ModalFooter,
  Button,
  FormGroup,
  Form,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import authHeader from "../../services/auth-header";

function UserModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const request = {
      username: data.username,
      password: data.password,
      email: data.email,
      role: data.role,
    };
    axios
      .post("http://localhost:3000/auth/register", request,{headers:authHeader()})
      .then((result) => {
        alert("Exito");
      })
      .catch((error) => alert("error"));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      onExit={props.reload}
    >
      <ModalHeader toggle={props.toggle} style={{backgroundColor:"#6be303",borderColor:"green"}}>
        Agregar Usuario
      </ModalHeader>
            <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ "alignContent": "center", "alignItems": "center" }}
        >
      <ModalBody>
          <Row>
            <Col xs="1">
            </Col>
            <Col>
              <FormGroup>
                <Label
                  style={{
                    "fontFamily": " Georgia, serif",
                    "fontSize": "30px",
                  }}
                >
                  Ingreso
                </Label>
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ "paddingTop": "10px", "paddingBottom": "10px" }}>
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
          <Row style={{ "paddingTop": "10px", "paddingBottom": "10px" }}>
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
          <Row style={{ "paddingTop": "10px", "paddingBottom": "10px" }}>
            <Col xs="1">
              <FontAwesomeIcon icon={faAddressCard} />{" "}
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="E-mail"
                  {...register("email", {
                    required: true,
                    pattern:"/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i",
                  })}
                />
              {errors.email && errors.email.type === "required" && (
                <span role="alert">This is required</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span role="alert">Invalid Email</span>
              )}
              </FormGroup>
            </Col>
          </Row>
          <Row style={{ "paddingTop": "10px", "paddingBottom": "10px" }}>
            <Col xs="1">
              <FontAwesomeIcon icon={faUser} />{" "}
            </Col>
            <Col>
              <FormGroup>
                <Input
                  type="radio"
                  id="role"
                  name="role"
                  value="ADMIN"
                  placeholder="Role"
                  {...register("role")}
                />ADMIN<Input
                type="radio"
                id="role"
                name="role"
                value="DOCTOR"
                placeholder="Role"
                {...register("role")}
              />DOCTOR
              </FormGroup>
            </Col>
          </Row>
            </ModalBody>
                      <ModalFooter>
                        <Button type="submit" value="submit" color="primary">
                          Ingresar
                        </Button>
                        <Button color="secondary">Cancelar</Button>
                      </ModalFooter>
                      </Form>
                      </Modal>
  )}
export default UserModal;