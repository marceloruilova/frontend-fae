import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "react-autocomplete";

function PatientModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [patients, setPatients] = useState([]);
  const [value, setValue] = useState({ci:"",type:""});
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const hoy = new Date().toISOString().substring(0, 10);
  const reload=()=>window.location.reload();

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await axios.get("http://localhost:3000/patient/");
      setPatients(data.data);
      setValue(
        data.data.length === 0
          ? ""
          : `${data.data[0].ci}`
      );
    };
    fetchPatients();
  }, []);

  const submitAppointment=()=>{
    const request = {
      ci: value.ci,
      appointment_hour: props.quotes,
      appointment_date: props.date.toISOString().substring(0,10),
      type:value.type,
      asigned_speciality: props.especiality,
    };
    axios
      .put("http://localhost:3000/patient/update", request)
      .then((result) => {
        alert("Exito actualizado");
      })
      .catch((error) => alert("error"));

  };
  const onSubmit = (data) => {
    const request = {
      ci: data.ci,
      firstName: data.firstname,
      surName: data.lastname,
      age: data.age,
      gender: data.gender,
      appointment_hour: props.quotes,
      appointment_date: props.date.toISOString().substring(0,10),
      type: "IESS",
      asigned_speciality: props.especiality,
      electronic_history: {},
    };
    axios
      .post("http://localhost:3000/patient/", request)
      .then((result) => {
        alert("Exito");
      })
      .catch((error) => alert("error"));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      onExit={props.reload}>
      <ModalHeader toggle={props.toggle} style={{backgroundColor:"#6be303",borderColor:"green"}}>
        Agregar Cita
      </ModalHeader>
      <ModalBody>
        <div>
          <Row><Col xs="3">
          <Label>Pacientes Registrados:</Label></Col>
            <Col xs="6">
        <Autocomplete
         getItemValue={(item) => `${item.ci}`}
         items={patients}
         renderItem={(item, isHighlighted) => (
           <div
             style={{
               background: isHighlighted ? "lightgray" : "white",
             }}
           >
             {`${item.ci} ${item.firstName} ${item.surName}`}
           </div>
         )}
         value={value.ci}
         onChange={(e) => setValue({ci:e.target.value,type:value.type})}
         onSelect={(val) => setValue({ci:val,type:value.type})}
        />
        </Col>
            <Col xs="3">
      {isOpen ? (
        <Modal isOpen={isOpen} toggle={toggle} onExit={reload}>
        <ModalHeader toggle={toggle} style={{backgroundColor:"#6be303",borderColor:"green"}}>Agregar Paciente</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
            <FormGroup>
              <Label htmlFor="ci">CI</Label>
              <Input
                type="number"
                id="ci"
                name="ci"
                {...register("ci", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                })}
              />
              {/* use role="alert" to announce the error message */}
              {errors.ci && errors.ci.type === "required" && (
                <span role="alert">This is required</span>
              )}
              {errors.ci && errors.ci.type === "maxLength" && (
                <span role="alert">Max length exceeded</span>
              )}
              {errors.ci && errors.ci.type === "minLength" && (
                <span role="alert">Min length exceeded</span>
              )}
              <br></br>
              <Label htmlFor="firstname">Nombre</Label>
              <Input
                type="text"
                id="firstname"
                name="firstname"
                {...register("firstname")}
              />
              <Label htmlFor="lastname">Apellido</Label>
              <Input
                type="text"
                id="lastname"
                name="lastname"
                {...register("lastname")}
              />
              <Label htmlFor="age">Edad</Label>
              <Input
                type="number"
                id="age"
                name="age"
                {...register("age")}
              />
              <Label htmlFor="gender">Sexo</Label><br/>
              <Input
                type="radio"
                id="gender"
                name="gender"
                value="M"
                {...register("gender")}
              />M{' '}<Input
              type="radio"
              id="gender"
              value="F"
              name="gender"
              {...register("gender")}
            />F
            </FormGroup>
            </ModalBody>
                      <ModalFooter>
                        <Button type="submit" value="submit" color="primary">
                          Ingresar
                        </Button>
                        <Button color="secondary">Cancelar</Button>
                      </ModalFooter>
            </Form>
                      </Modal>
     ) : (
      <Button onClick={toggle} color="light"><FontAwesomeIcon icon={faPlusCircle}/>{" "}Nuevo Paciente</Button>
    )}
            </Col>
          </Row>
          <Row>
            <Col xs="3">
                <Input
                  type="radio"
                  name="type"
                  value="IESS"
                  onClick={(e)=>setValue({ci:value.ci,type:e.target.value})}
                />
                {" "}IESS
                </Col>
                <Col xs="3">
                <Input
                  type="radio"
                  name="type"
                  value="OTRO"
                  onClick={(e)=>setValue({ci:value.ci,type:e.target.value})}
                />
                {" "}OTRO
                </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => submitAppointment()} color="primary">Ingresar</Button>
        <Button color="primary">Cancelar</Button>
      </ModalFooter>
    </Modal>
);
}

export default PatientModal;