import React, { useState,useEffect } from 'react';
import {
  FormGroup,
  Input,
  Form,
  Button,
  Row,
  Col,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Lifesigns() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const[users,setUsers]=useState([]);
  const[nowuser,setNowuser]=useState([]);
  const today=new Date();
  const onSubmit = (data) => {
    const request = {
      vitals: {
        especiality:nowuser.asigned_speciality,
        attention_hour: `${today.getHours()}:${today.getUTCMinutes()}`,
        temperature: 5.5,
        arterial_tension: 5.8,
        fc: "5 to 8",
        fr: "5 to 9",
        spo2: 8.6,
        height: 1.75,
        weight: 85,
        pc: 6.8
      },
      evolucion: [{ id: 'place' }],
    };
    console.log(data);
    /* axios.post('http://localhost:3001/cancion/', request).then((result) => {
      alert('Exito');
    }); */
  };  
 


  useEffect(()=>{ 
    const fetch=async () => {
      const attend_users = await axios.get(
        'http://localhost:3000/users/date',
      );
      const nnUser=attend_users.data.find((user)=>{
      const horas=parseInt(user.appointment_hour.substring(0,2),10);
      const minutos=parseInt(user.appointment_hour.substring(3,5),10);
      const atencion=minutos+45;
      const resto=atencion-60;
      // 45 minutos tiempo para atencion del cliente 7.30 - 7.45 - 8.15
      // aun falta parece, hacer pruebas.
      /* if(atencion>=60&&horas+1===8&&today.getMinutes()<=resto)
        return true; */
      if(atencion<=60&&horas===7/* &&today.getMinutes()<atencion */)
        return true;
      return false;
      });
      setUsers(attend_users.data);
      setNowuser(nnUser);
    };
  fetch();
},[]);

  return (
    <div className="login-box-container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <div htmlFor="especiality" className="formborder">
              SIGNOS VITALES 
            </div>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div htmlFor="especiality">ESPECIALIDAD:</div>
          </Col>
          <Col>
            <FormGroup>
              <Input
                type="text"
                id="especiality"
                name="especiality"
                placeholder="Especialidad"
                defaultValue={nowuser.asigned_speciality}
                {...register('especiality')}
              />
            </FormGroup>
          </Col>
          <Col>
            <div htmlFor="especiality">FECHA:</div>
          </Col>
          <Col>
            {' '}
            <FormGroup>
              <Input
                type="date"
                id="date"
                name="date"
                placeholder="Fecha"
                defaultValue={nowuser.appointment_date}
                {...register('date')}
              />
            </FormGroup>
          </Col>
          <Col>
            <div htmlFor="especiality">HORA DE ATENCIÓN:</div>
          </Col>
          <Col>
            {' '}
            <FormGroup>
              <Input
                type="time"
                id="time"
                name="time"
                placeholder="Hora de atención"
                defaultValue={today.getMinutes().toString().length===1?`${today.getHours()}:0${today.getUTCMinutes()}`:`${today.getHours()}:${today.getUTCMinutes()}`}
                {...register('time')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="formborder">
          <Col xs="2">
            <div htmlFor="especiality">T:</div>
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
            <div htmlFor="especiality">T/A:</div>
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
            <div htmlFor="fc">FC:</div>
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
            <div htmlFor="fr">FR:</div>
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
            <div htmlFor="spo2">SPO2:</div>
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
            <div htmlFor="height">TALLA:</div>
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
            <div htmlFor="peso">PESO:</div>
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
            <div htmlFor="pc">PC:</div>
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
