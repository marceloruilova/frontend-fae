import { useState } from 'react';
import { Label, FormGroup, Input, Form, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Lifesigns() {
  const [datos, setDatos] = useState({
    id: 1,
    name: 'primerdato',
    type: '',
    quotes: '',
    record: [{ id: 1, place: '' }],
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        <FormGroup>
          <Label htmlFor="temperatura">T</Label>
          <Input
            type="text"
            id="temperatura"
            name="temperatura"
            {...register('temperatura')}
          />
        </FormGroup>
        <Button type="submit" value="submit" color="primary">
          Agregar Cita
        </Button>
      </Form>
    </div>
  );
}

export default Lifesigns;
