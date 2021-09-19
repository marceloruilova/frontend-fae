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
          {'C'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="especiality">T/A:</div>
          </Col>
          <Col xs="2">
            {' '}
            <FormGroup tag="fieldset">
              <Input
                type="number"
                id="sistolica"
                name="sistolica"
                min="100"
                max="150"
                placeholder="Sistolica"
                {...register('sistolica')}
              />
            </FormGroup>
          </Col>
          {'/'}
          <Col xs="2">
            {' '}
            <FormGroup tag="fieldset">
              <Input
                type="number"
                id="diastolica"
                name="diastolica"
                min="70"
                max="90"
                placeholder="Diastolica"
                {...register('diastolica')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="fc">FC:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="fc-start"
                name="fc-start"
                step="0.1"
                min="30"
                max="42"
                {...register('fc-start')}
              />
            </FormGroup>
          </Col>
          {'a'}
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="fc-end"
                name="fc-end"
                step="0.1"
                min="30"
                max="42"
                {...register('fc-end')}
              />
            </FormGroup>
          </Col>
          {'lpm'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="fr">FR:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="fr-start"
                name="fr-start"
                step="0.1"
                min="30"
                max="42"
                {...register('fr-start')}
              />
            </FormGroup>
          </Col>
          {'a'}
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="fr-end"
                name="fr-end"
                step="0.1"
                min="30"
                max="42"
                {...register('fr-end')}
              />
            </FormGroup>
          </Col>
          {'rpm'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="spo2">SPO2:</div>
          </Col>
          <Col xs="1">
            <FormGroup>
              <Input
                type="number"
                id="spo2"
                name="spo2"
                step="0.1"
                min="50"
                max="120"
                {...register('spo2')}
              />
            </FormGroup>
          </Col>
          {'%'}
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div for="height">TALLA:</div>
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
                min="10.5"
                max="250.5"
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
                step="0.01"
                min="20.1"
                max="70"
                {...register('pc')}
              />
            </FormGroup>
          </Col>
          {'cm'}
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
