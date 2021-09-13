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
    <Container className="login-box-container" >
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row xs="2" >
        <Col >
          <FormGroup  >
            <Label htmlFor="temperatura">Nombre</Label>
            <Input
              type="text"
              id="temperatura"
              name="temperatura"
              defaultValue=""
              size="sm"
              {...register('temperatura')}
            />
          </FormGroup>
          </Col>
          <Col>
          <FormGroup >
            <Label htmlFor="password">Password</Label>
            <Input
              type="text"
              id="temperatura"
              name="temperatura"
              {...register('temperatura')}
            />
          </FormGroup>
        </Col>
        <Col>
          <Button type="submit" value="submit" color="primary">
              Agregar Cita
          </Button>
        </Col>
      </Row>
    </Form>
    </Container>
      /* 
      <Form >
        <Row >
        <Col md={4}>
        <FormGroup >
         
         
        </FormGroup>
        </Col>
        <Col md={4}>
        <FormGroup >
          
        </FormGroup>
        </Col>
        </Row>

       
      </Form>
    </div> */
  );
}

export default Evolucion;
