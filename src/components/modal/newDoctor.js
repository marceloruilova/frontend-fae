import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
} from "reactstrap";
import axios from "axios";
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
      .post("http://localhost:3000/prescription/savedoctor", {
        prescriptionid: props.prescriptionid,
        prescribing_doctor: {
          doctor_first_name: selectedDoctor[0].doctor_first_name,
          doctor_last_name: selectedDoctor[0].doctor_last_name,
          ci: selectedDoctor[0].ci,
        },
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
      <ModalHeader toggle={props.toggle}>
        Agregar Médico Prescriptor
      </ModalHeader>
      <ModalBody>
        <div>
          <Row>
            <Col xs="9">
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
                  <Modal isOpen={isOpen} toggle={toggle} >
                    <ModalHeader toggle={toggle}>
                      Agregar Nuevo Doctor
                    </ModalHeader>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                      <ModalBody>
                        <Row>
                          <Col xs="3">
                            <div htmlFor="nombre">Nombre</div>
                          </Col>
                          <Col xs="9">
                            <FormGroup>
                              <Input
                                type="text"
                                id="doctor_first_name"
                                name="doctor_first_name"
                                className="inputborder"
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
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="3">
                            <div htmlFor="nombre">Apellido</div>
                          </Col>
                          <Col xs="9">
                            <FormGroup>
                              <Input
                                type="text"
                                id="doctor_last_name"
                                name="doctor_last_name"
                                className="inputborder"
                                {...register("doctor_last_name")}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col xs="3">
                            <div htmlFor="nombre">CI</div>
                          </Col>
                          <Col xs="9">
                            <FormGroup>
                              <Input
                                type="text"
                                id="ci"
                                name="ci"
                                className="inputborder"
                                {...register("ci")}
                              />
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
                ) : (
                  <div onClick={toggle}>+</div>
                )}
            </Col>
          </Row>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => submitPrescription()}>Ingresar</Button>
      </ModalFooter>
    </Modal>
  );
}

export default DoctorModal;
