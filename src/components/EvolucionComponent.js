import { useState } from 'react';
import { Label, FormGroup, Input, Form, Button } from 'reactstrap';
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
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="temperatura">T</Label>
          <Input
            type="text"
            id="temperatura"
            name="temperatura"
            {...register('temperatura')}
          />
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

export default Evolucion;
