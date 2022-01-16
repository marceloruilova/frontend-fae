import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,Label,
  FormGroup,
  Form,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import Autocomplete from "react-autocomplete";

function DoctorModal(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [doctors, setDoctors] = useState([]);
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const reload = () => window.location.reload();

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await axios.get("http://localhost:3000/doctor/");
      setDoctors(data.data);
      setValue(
        data.data.length === 0
          ? ""
          : `${data.data[0].ci}-${data.data[0].doctor_first_name}`
      );
    };
    fetchDoctors();
  }, []);

  const onSubmit = (data) => {
    const request = {
      doctor_first_name: data.doctor_first_name,
      doctor_last_name: data.doctor_last_name,
      ci: data.ci,
      
    };
    axios
      .post("http://localhost:3000/doctor", request)
      .then((result) => {
        alert("Exito");
      })
      .catch((error) => alert("Error"));
  };

  const submitPrescription = () => {
    const doctorci = value.split("-");
    const selectedDoctor = doctors.filter((doctor) => {
      return doctor.ci.includes(doctorci[0]);
    });
    axios
      .post("http://localhost:3000/doctor/saveprescription", {
        prescription: props.prescription,
        doctor_ci: selectedDoctor[0].ci,
      })
      .then((result) => alert("Exito"))
      .catch((error) => alert("Error"));
  };

  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      onExit={props.reload}
    >
      <ModalHeader toggle={props.toggle} style={{backgroundColor:"#6be303",borderColor:"green"}}>
        Agregar Médico Prescriptor
      </ModalHeader>
      <ModalBody>
        <div>
          <Row><Col xs="3">
          <Label>Doctores:</Label></Col>
            <Col xs="6">
              <Autocomplete
                getItemValue={(item) => `${item.ci}-${item.doctor_first_name}`}
                items={doctors}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                    }}
                  >
                    {`${item.ci}-${item.doctor_first_name}`}
                  </div>
                )}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onSelect={(val) => setValue(val)}
              />
            </Col>
            <Col>
                {isOpen ? (
                  <Modal isOpen={isOpen} toggle={toggle}       onExit={reload}
                  >
                    <ModalHeader toggle={toggle} style={{backgroundColor:"#6be303",borderColor:"green"}}>
                      Agregar Nuevo Doctor
                    </ModalHeader>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <ModalBody>
                            <FormGroup>
                            <Label htmlFor="nombre">Nombre</Label>
                              <Input
                                type="text"
                                id="doctor_first_name"
                                name="doctor_first_name"
                                {...register("doctor_first_name")}
                              />
                              {/* use role="alert" to announce the error message */}
                              {errors.doctor_first_name && errors.doctor_first_name.type === "required" && (
                                <span role="alert">This is required</span>
                              )}
                              {errors.doctor_first_name && errors.doctor_first_name.type === "maxLength" && (
                                <span role="alert">Max length exceeded</span>
                              )}
                              {errors.doctor_first_name && errors.doctor_first_name.type === "minLength" && (
                                <span role="alert">Min length exceeded</span>
                              )}
                            <Label htmlFor="apellido">Apellido</Label>
                              <Input
                                type="text"
                                id="doctor_last_name"
                                name="doctor_last_name"
                                {...register("doctor_last_name")}
                              />
                            <Label htmlFor="nombre">CI</Label>
                              <Input
                                type="text"
                                id="ci"
                                name="ci"
                                {...register("ci")}
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
                  <Button onClick={toggle} color="light"><FontAwesomeIcon icon={faPlusCircle}/>{" "}Nuevo Doctor</Button>
                )}
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => submitPrescription()} color="primary">Ingresar</Button>
        <Button color="secondary">Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
}

export default DoctorModal;
