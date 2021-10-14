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
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Calendar() {
  const places = [
    'Hora',
    'Traumatología',
    'Psicología',
    'Neurología',
    'Rayos X',
  ];
  const hours = ['7:00', '7:15', '7:30', '7:45', '8:00'];
  const [quotes, setQuotes] = useState('');
  const [especiality, setEspeciality] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggle = (hour, area) => {
    setIsModalOpen(!isModalOpen);
    setQuotes(hour);
    setEspeciality(area);
  };
  const onSubmit = (data) => {
    const hoy = new Date();
    const request = {
      ci: data.ci,
      firstName: data.firstname,
      lastName: data.lastname,
      appointment_hour: quotes,
      appointment_date: hoy,
      type: data.type,
      asigned_speciality: especiality,
    };
    try {
      axios.post('http://localhost:3000/patient/', request).then((result) => {
        console.log(result);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login-box-container">
      <div className="container">
        {places.map((item) => (
          <div className="row">
            <div className="col 5 calendar" key="item">
              {item}
            </div>
            {hours.map((hour) =>
              item === 'Hora' ? (
                <div className="col 5 calendar" key="hour">
                  {hour}
                </div>
              ) : (
                <div
                  className="col 5 quote"
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
    </div>
  );
}

export default Calendar;
