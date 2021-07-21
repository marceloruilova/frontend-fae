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
      id: '',
      nombre: quotes,
      evolucion: [{ id: place }],
    };
    console.log(request);
    /* axios.post('http://localhost:3001/cancion/', request).then((result) => {
      alert('Exito');
    }); */
  };
  return (
    <div className="login-box-container">
      {places.map((item) => (
        <div>
          <div className="calendar" key="item">
            {item}
          </div>
          {hours.map((hour) => {
            if (item === 'Hora') return <div className="calendar">{hour}</div>;
            return (
              <div>
                <div
                  className="quote"
                  onClick={() => toggle(hour, item)}
                  key="hour"
                ></div>
              </div>
            );
          })}
        </div>
      ))}
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label htmlFor="username">Name</Label>
              <Input type="text" id="name" name="name" {...register('name')} />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="type"
                  value="Iess"
                  {...register('type')}
                />
                Iess
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label>
                <Input
                  type="checkbox"
                  name="type"
                  value="Ispol"
                  {...register('type')}
                />
                Ispol
              </Label>
            </FormGroup>
            <Button type="submit" value="submit" color="primary">
              Login
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Calendar;
