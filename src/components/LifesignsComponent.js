import React, { useState, useEffect } from "react";
import { FormGroup, Input, Form, Button, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

function Lifesigns() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState([]);
  const [nowuser, setNowuser] = useState([]);
  const today = new Date();

  const onSubmit = (data) => {
    const request = {
      vital: {
        especiality: nowuser.asigned_speciality,
        attention_date: today,
        attention_hour: `${today.getHours()}:${today.getUTCMinutes()}`,
        temperature_end: parseFloat(data.temperature_end),
        temperature_start: parseFloat(data.temperature_start),
        sistolica: data.sistolica,
        diastolica: data.diastolica,
        fc_end: parseFloat(data.fc_end),
        fc_start: parseFloat(data.fc_start),
        fr_end: parseFloat(data.fr_end),
        fr_start: parseFloat(data.fr_end),
        spo2: parseFloat(data.spo2),
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        pc: parseFloat(data.pc),
      },
      electronic_history_id: nowuser.electronic_history.id,
    };
    try {
      axios.post("http://localhost:3000/hce/vital", request).then((result) => {
        alert(result);
      });
    } catch (error) {
      alert.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const attend_users = await axios.get(
        "http://localhost:3000/patient/bydate"
      );
      const nnUser = attend_users.data.find((user) => {
        const horas = parseInt(user.appointment_hour.substring(0, 2), 10);
        const minutos = parseInt(user.appointment_hour.substring(3, 5), 10);
        const atencion = minutos + 45;
        const resto = Math.abs(atencion - 60);
        // 45 minutos tiempo para atencion del cliente 7.30 - 7.45 - 8.15
        // aun falta parece, hacer pruebas.
        console.log(horas+" "+minutos+" "+atencion+" "+ resto +" "+today.getHours());if (
          atencion >= 60 &&
          horas + 1 === today.getHours() &&
          today.getMinutes() <= resto
        )
          return true;
        if (
          atencion <= 60 &&
          horas === today.getHours() &&
          today.getMinutes() < atencion
        )
        return true;
        if (
          atencion >= 60 &&
          horas === today.getHours() &&
          today.getMinutes() <= 60
        )
          return true;
        return false;
      });
      setUsers(attend_users.data);
      setNowuser(nnUser);
    };
    fetch();
  }, []);

  return (
    <div
      className="box-container "
      style={{
        "justify-content": "center",
        padding: "30px",
      }}
    >
      <Form onSubmit={handleSubmit(onSubmit)} style={{ width: "50%" }}>
        <Row className="formborder">
          <Col xs="7" style={{ "text-align": "right" }}>
            SIGNOS VITALES
          </Col>
          <Col xs="2" />
          <Col xs="3">
            <FormGroup>
              <Input
                type="time"
                id="time"
                name="time"
                placeholder="Hora de atención"
                defaultValue={
                  today.getMinutes().toString().length === 1
                    ? `${today.getHours()}:0${today.getUTCMinutes()}`
                    : `${today.getHours()}:${today.getUTCMinutes()}`
                }
                {...register("time")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="especiality" style={{ overflow: "hidden" }}>
              ESPECIALIDAD:
            </div>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="text"
                id="especiality"
                name="especiality"
                placeholder="Especialidad"
                defaultValue={
                  nowuser === undefined ? "" : nowuser.asigned_speciality
                }
                onChange={(e) =>
                  setNowuser({ asigned_speciality: e.target.value })
                }
              />
            </FormGroup>
          </Col>
          <Col xs="2">
            <div htmlFor="especiality">FECHA:</div>
          </Col>
          <Col xs="4">
            {" "}
            <FormGroup>
              <Input
                type="text"
                id="date"
                name="date"
                placeholder="Fecha"
                defaultValue={
                  nowuser === undefined ? "" : nowuser.appointment_date
                }
                readOnly={true}
                {...register("date")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="especiality">T:</div>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="temperature_start"
                name="temperature_start"
                step="0.1"
                min="30"
                max="42"
                defaultValue={5.5}
                {...register("temperature_start")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">a</Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="temperature_end"
                name="temperature_end"
                step="0.1"
                min="30"
                max="42"
                defaultValue={5.5}
                {...register("temperature_end")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">C</Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="especiality">T/A:</div>
          </Col>
          <Col xs="3">
            <FormGroup tag="fieldset">
              <Input
                type="number"
                id="sistolica"
                name="sistolica"
                min="100"
                max="150"
                defaultValue={20}
                placeholder="Sistolica"
                {...register("sistolica")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">/</Col>
          <Col xs="3">
            <FormGroup tag="fieldset">
              <Input
                type="number"
                id="diastolica"
                name="diastolica"
                min="70"
                max="90"
                defaultValue={30}
                placeholder="Diastolica"
                {...register("diastolica")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="fc">FC:</div>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="fc_start"
                name="fc_start"
                step="0.1"
                min="30"
                max="42"
                defaultValue={10.2}
                {...register("fc_start")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">a</Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="fc_end"
                name="fc_end"
                step="0.1"
                min="30"
                max="42"
                defaultValue={12.2}
                {...register("fc_end")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">lpm</Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="fr">FR:</div>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="fr_start"
                name="fr_start"
                step="0.1"
                min="30"
                max="42"
                defaultValue={10.3}
                {...register("fr_start")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">a</Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="fr_end"
                name="fr_end"
                step="0.1"
                min="30"
                max="42"
                defaultValue={12.3}
                {...register("fr_end")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">rpm</Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="spo2">SPO2:</div>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="spo2"
                name="spo2"
                step="0.1"
                min="50"
                max="120"
                defaultValue={15.5}
                {...register("spo2")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">%</Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="height">TALLA:</div>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="height"
                name="height"
                step="0.01"
                min="0.40"
                max="2.20"
                defaultValue={0.2}
                {...register("height")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">cm</Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="weight">PESO:</div>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="weight"
                name="weight"
                step="0.01"
                min="10.5"
                max="250.5"
                defaultValue={2.5}
                {...register("weight")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">kg</Col>
        </Row>
        <Row className="formborder">
          <Col xs="3">
            <div htmlFor="pc">PC:</div>
          </Col>
          <Col xs="3">
            <FormGroup>
              <Input
                type="number"
                id="pc"
                name="pc"
                step="0.01"
                min="20.1"
                max="70"
                defaultValue={2.5}
                {...register("pc")}
              />
            </FormGroup>
          </Col>
          <Col xs="1">cm</Col>
        </Row>
        <Row style={{ padding: "5px" }}>
          <Col xs="2">
            <Button type="submit" value="submit" color="primary">
              Ingresar
            </Button>
          </Col>
        </Row>{" "}
      </Form>
    </div>
  );
}

export default Lifesigns;
