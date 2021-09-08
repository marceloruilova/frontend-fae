import { useState } from 'react';
import {
  Modal,
  Label,
  ModalHeader,
  ModalBody,
  FormGroup,
  Input,
  Form,
  Button,
} from 'reactstrap';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Burger from './BurgerComponent';
import Header from './HeaderComponent';

function Calendar() {
  const [datos, setDatos] = useState({
    id: 1,
    name: 'primerdato',
    type: '',
    quotes: '',
    record: [{ id: 1, place: '' }],
  });

  const places = [
    'Hora',
    'Traumatología',
    'Psicología',
    'Neurología',
    'Rayos X',
  ];
  const hours = ['7:00', '7:15', '7:30', '7:45', '8:00'];
  const [quotes, setQuotes] = useState('');
  const [place, setPlace] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggle = (hour, area) => {
    setIsModalOpen(!isModalOpen);
    setQuotes(hour);
    setPlace(area);
  };
  const onSubmit = (data) => {
    const request = {
      ci: data.ci,
      firstName: data.firstname,
      lastName: data.lastname,
      appointment_hour: quotes,
      type: data.type,
      asigned_speciality: place,
    };
    console.log(request);
    /* axios.post('http://localhost:3000/users/', request).then((result) => {
      alert('Exito');
    }); */
  };
  return (
    <>
      <Burger />
      <div className="login-box-container">
        {places.map((item) => (
          <div>
            <div className="calendar" key="item">
              {item}
            </div>
            {hours.map((hour) =>
              item === 'Hora' ? (
                <div className="calendar">{hour}</div>
              ) : (
                <div
                  className="quote"
                  onClick={() => toggle(hour, item)}
                  key="hour"
                ></div>
              )
            )}
          </div>
        ))}
        <Modal isOpen={isModalOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>Agregar Cita</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label htmlFor="ci">CI</Label>
                <Input
                  type="text"
                  id="ci"
                  name="ci"
                  {...register('ci', {
                    required: true,
                    minLength: 10,
                    maxLength: 10,
                  })}
                />
                {/* use role="alert" to announce the error message */}
                {errors.ci && errors.ci.type === 'required' && (
                  <span role="alert">This is required</span>
                )}
                {errors.ci && errors.ci.type === 'maxLength' && (
                  <span role="alert">Max length exceeded</span>
                )}
                {errors.ci && errors.ci.type === 'minLength' && (
                  <span role="alert">Min length exceeded</span>
                )}
                <br></br>
                <Label htmlFor="firstname">Nombre</Label>
                <Input
                  type="text"
                  id="firstname"
                  name="firstname"
                  {...register('firstname')}
                />
                <Label htmlFor="lastname">Apellido</Label>
                <Input
                  type="text"
                  id="lastname"
                  name="lastname"
                  {...register('lastname')}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="radio"
                    name="type"
                    value="ISSFA"
                    {...register('type')}
                  />
                  ISSFA
                </Label>
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Agregar Cita
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default Calendar;
