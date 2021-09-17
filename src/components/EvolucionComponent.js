import { useState } from 'react';
import {
  Label,
  Row,
  Col,
  Container,
  FormGroup,
  Input,
  Form,
  Button,
} from 'reactstrap';
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
    <div className="login-box-container">
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="tab">
            <Col xs="3">
              <FormGroup>
                <div for="establecimiento" className="formborder">
                  ESTABLECIMIENTO
                </div>
                <Input
                  type="text"
                  id="establecimiento"
                  name="establecimiento"
                  defaultValue=""
                  className="inputborder"
                  {...register('establecimiento')}
                />
              </FormGroup>
            </Col>
            <Col xs="2">
              <FormGroup>
                <div for="name" className="formborder">
                  NOMBRE
                </div>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  className="inputborder"
                  {...register('name')}
                />
              </FormGroup>
            </Col>
            <Col xs="2">
              <FormGroup>
                <div for="surname" className="formborder">
                  APELLIDO
                </div>
                <Input
                  type="text"
                  id="surname"
                  name="surname"
                  className="inputborder"
                  {...register('surname')}
                />
              </FormGroup>
            </Col>
            <Col xs="1">
              <FormGroup>
                <div for="sexo" className="formborder">
                  SEXO(M-F)
                </div>
                <Input
                  type="text"
                  id="sexo"
                  name="sexo"
                  className="inputborder"
                  {...register('sexo')}
                />
              </FormGroup>
            </Col>
            <Col xs="1">
              <FormGroup>
                <div for="id_evolucion" className="formborder">
                  N HOJA
                </div>
                <Input
                  type="text"
                  id="id_evolucion"
                  name="id_evolucion"
                  className="inputborder"
                  {...register('id_evolucion')}
                />
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <div for="id_hce" className="formborder">
                  N HISTORIA CLÍNICA
                </div>
                <Input
                  type="text"
                  id="id_hce"
                  name="id_hce"
                  className="inputborder"
                  {...register('id_hce')}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="tab">
            <Col xs="8" className="space-right">
              <FormGroup>
                <div for="id_evolucion" className="formborder">
                  1. EVOLUCION FIRMAR AL PIE DE CADA NOTA
                </div>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <div for="id_hce" className="formborder">
                  2. PRESCRIPCIONES FIRMAR AL PIE
                </div>
              </FormGroup>
              <div>
                REGISTRAR EN ROJO LA ADMINISTRACIÓN DE FARMACOS Y OTROS
                PRODUCTOS
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs="1">
              <FormGroup className="formborder">
                <div for="id_evolucion">FECHA</div>
                <div for="id_evolucion">(DIA/MES/ANO)</div>
              </FormGroup>
            </Col>
            <Col xs="1">
              <FormGroup>
                <div for="id_hce" className="formborder">
                  HORA
                </div>
              </FormGroup>
            </Col>
            <Col xs="6" className="space-right">
              <FormGroup>
                <div for="id_evolucion" className="formborder">
                  NOTAS DE EVOLUCIÓN
                </div>
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <div for="id_hce" className="formborder">
                  FARMACOTERAPIA E INDICACIONES
                </div>
              </FormGroup>
            </Col>
            <Col xs="1">
              <FormGroup>
                <div for="id_hce" className="formborder">
                  ADMINISTR.
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="2">
              <FormGroup>
                <div for="id_hce" className="formborder">
                  {' '}
                </div>
              </FormGroup>
            </Col>
            <Col xs="6" className="space-right">
              <FormGroup>
                <div for="id_hce" className="formborder"></div>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <div for="id_hce" className="formborder"></div>
              </FormGroup>
            </Col>
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
