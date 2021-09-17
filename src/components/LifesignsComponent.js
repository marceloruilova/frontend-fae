import React, { useState } from 'react';
import {
  Label,
  FormGroup,
  Input,
  Form,
  Button,
  Row,
  Col,
  CustomInput,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Lifesigns() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let today = new Date();
  const hour = `${today.toLocaleTimeString().substring(0, 5)}`;
  today = today.toISOString().substring(0, 10);
  const onSubmit = (data) => {
    const request = {
      id: '',
      nombre: 'quotes',
      evolucion: [{ id: 'place' }],
    };
    console.log(data);
    /* axios.post('http://localhost:3001/cancion/', request).then((result) => {
      alert('Exito');
    }); */
  };
  return (
    <div className="login-box-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <div for="especiality" className="formborder">
              SIGNOS VITALES
            </div>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="especiality">ESPECIALIDAD:</div>
          </Col>
          <Col>
            <FormGroup>
              <Input
                type="text"
                id="especiality"
                name="especiality"
                placeholder="Especialidad"
                {...register('especiality')}
              />
            </FormGroup>
          </Col>
          <Col>
            <div for="especiality">FECHA:</div>
          </Col>
          <Col>
            {' '}
            <FormGroup>
              <Input
                type="date"
                id="date"
                name="date"
                placeholder="Fecha"
                defaultValue={today}
                {...register('date')}
              />
            </FormGroup>
          </Col>
          <Col>
            <div for="especiality">HORA DE ATENCIÓN:</div>
          </Col>
          <Col>
            {' '}
            <FormGroup>
              <Input
                type="time"
                id="time"
                name="time"
                placeholder="Hora de atención"
                defaultValue={hour}
                {...register('time')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="especiality">T:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="temperature-start"
                name="temperature-start"
                step="0.1"
                min="30"
                max="42"
                defaultValue={hour}
                {...register('time')}
              />
            </FormGroup>
          </Col>
          {'a'}
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="temperature-end"
                name="temperature-end"
                step="0.1"
                min="30"
                max="42"
                defaultValue={hour}
                {...register('time')}
              />
            </FormGroup>
          </Col>
          {'C'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="especiality">T/A:</div>
          </Col>
          <Col xs="5">
            {' '}
            <FormGroup>
              <Input
                type="text"
                id="tension"
                name="tension"
                placeholder="Tension Arterial"
                {...register('tension')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="especiality">FC:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="temperature-start"
                name="temperature-start"
                step="0.1"
                min="30"
                max="42"
                defaultValue={hour}
                {...register('time')}
              />
            </FormGroup>
          </Col>
          {'a'}
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="temperature-end"
                name="temperature-end"
                step="0.1"
                min="30"
                max="42"
                defaultValue={hour}
                {...register('time')}
              />
            </FormGroup>
          </Col>
          {'lpm'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="especiality">FR:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="temperature-start"
                name="temperature-start"
                step="0.1"
                min="30"
                max="42"
                defaultValue={hour}
                {...register('time')}
              />
            </FormGroup>
          </Col>
          {'a'}
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="temperature-end"
                name="temperature-end"
                step="0.1"
                min="30"
                max="42"
                defaultValue={hour}
                {...register('time')}
              />
            </FormGroup>
          </Col>
          {'rpm'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="especiality">SPO2:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="temperature-start"
                name="temperature-start"
                step="0.1"
                min="30"
                max="42"
                {...register('temperature-start')}
              />
            </FormGroup>
          </Col>
          {'a'}
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="temperature-end"
                name="temperature-end"
                step="0.1"
                min="30"
                max="42"
                {...register('temperature-end')}
              />
            </FormGroup>
          </Col>
          {'lpm'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="especiality">TALLA:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="height"
                name="height"
                step="0.01"
                min="0.40"
                max="2.20"
                {...register('height')}
              />
            </FormGroup>
          </Col>
          {'cm'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="peso">PESO:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="peso"
                name="peso"
                step="0.01"
                min="0.40"
                max="2.20"
                {...register('peso')}
              />
            </FormGroup>
          </Col>
          {'kg'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="pc">PC:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="pc"
                name="pc"
                defaultValue={hour}
                {...register('pc')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="1">
            <Button type="submit" value="submit" color="primary">
              Ingresar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Lifesigns;
