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
import Autocomplete from "react-autocomplete";

function UserModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [patients, setPatients] = useState([]);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const hoy = new Date().toISOString().substring(0, 10);

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
      ci: value,
      appointment_hour: props.quotes,
      appointment_date: hoy,
      type: "Iess",
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
      appointment_hour: props.quotes,
      appointment_date: hoy,
      type: "ISSFA",
      asigned_speciality: props.especiality,
      electronic_history: {},
    };
    console.log(request)
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
    >
      <ModalHeader toggle={props.toggle}>
        Agregar Cita
      </ModalHeader>
      <ModalBody>
        <div>
          <Row>
            <Col xs="9">
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
         value={value}
         onChange={(e) => setValue(e.target.value)}
         onSelect={(val) => setValue(val)}
        />
        </Col>
            <Col>
      {isOpen ? (
        <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Agregar Cita</ModalHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
            <FormGroup>
              <Label htmlFor="ci">CI</Label>
              <Input
                type="text"
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
      <div onClick={toggle}>+</div>
    )}
            </Col>
          </Row>
          <Row>
                <Input
                  type="radio"
                  name="type"
                  value="ISSFA"
                  onClick={(e)=>console.log(e.target.value)}
                >
                ISSFA</Input>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => submitAppointment()}>Ingresar</Button>
      </ModalFooter>
    </Modal>
);
}

export default UserModal;