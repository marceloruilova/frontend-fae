import { useState } from 'react';
import { Label,Row,Col,Container, FormGroup, Input, Form, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';

function Evolucion() {
  const [users, setUsers] = useState({});
  const today = new Date();
  const date = today.getHours() + today.getMilliseconds();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const request = {
      nombre: date,
      evolucion: [{ id: 'place' }],
    };
    console.log(data);
    /* axios.post('http://localhost:3001/cancion/', request).then((result) => {
      alert('Exito');
    }); */
  };

  useEffect(async () => {
    // return users by date(today)
    const attend_users = await axios.get('http://localhost:3000/users/');
  }, []);
  return (
  <div className="login-box-container" >
    <Container >
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row >
        <Col xs="2">
          <FormGroup className="formborder" >
            <Label htmlFor="temperatura" >Nombre</Label>
            <Input
              type="text"
              id="temperatura"
              name="temperatura"
              defaultValue=""
              className="inputborder"
              {...register('temperatura')}
            />
          </FormGroup>
          </Col>
          <Col xs="4">
          <FormGroup className="formborder" >
            <Label htmlFor="password">Password</Label>
            <Input
              type="text"
              id="temperatura"
              name="temperatura"
              className="inputborder"
              {...register('temperatura')}
            />
          </FormGroup>
        </Col>
          <Col xs="1">
          <FormGroup className="formborder" >
            <Label htmlFor="password">Sexo</Label>
            <Input
              type="text"
              id="temperatura"
              name="temperatura"
              className="inputborder"
              {...register('temperatura')}
            />
          </FormGroup>
        </Col>
        <Col xs="2">
          <FormGroup className="formborder" >
            <Label htmlFor="password">Password</Label>
            <Input
              type="text"
              id="temperatura"
              name="temperatura"
              className="inputborder"
              {...register('temperatura')}
            />
          </FormGroup>
        </Col>
        <Col xs="3">
          <FormGroup className="formborder" >
            <Label htmlFor="password">Password</Label>
            <Input
              type="text"
              id="temperatura"
              name="temperatura"
              className="inputborder"
              {...register('temperatura')}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
      </Row>
      <Row>
      </Row>
      <Row>
      </Row>
          <Button type="submit" value="submit" color="primary">
              Agregar Cita
          </Button>
    </Form>
    </Container>
   </div>
  );
}

export default Evolucion;
