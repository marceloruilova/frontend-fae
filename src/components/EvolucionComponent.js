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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [users, setUsers] = useState([]);
  const [nowuser,setNowuser]=useState([]);
  const today = new Date();
  const date = today.getHours() + today.getMilliseconds();
  const [medicineName,setMedicinename]=useState("");
  const [dosis,setDosis]=useState("");
  const [fullmedicine,setFullmedicine]=useState([]);

  const onSubmit = (data) => {
    const request = {
      evolution: {
        initial_observations:data.observations,
        establishment: nowuser.asigned_speciality,
        month: today.getMonth().toString(),
        year: today.getFullYear().toString(),
        mc: data.mc,
        enf: data.enf,
        qx: data.qx,
        alergies: data.alergies,
        objective: data.objective,
        subjective: data.sujective,
          prescription:{
            notes:data.notes,
            medicine:fullmedicine
          }
      },
      electronic_history_id:nowuser.electronic_history.id
    };
    console.log(request)
    try {
      axios.post('http://localhost:3000/hce/evolucion', request).then((result) => {
        
    }); 
  } catch (error) {
    console.log(error);
  }
  };

  useEffect(()=>{ 

    const fetch=async () => {
      const attend_users = await axios.get(
        'http://localhost:3000/patient/bydate',
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
      <div className="container">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row className="tab">
            <Col xs="3">
              <FormGroup>
                <div htmlFor="establecimiento" className="formborder">
                  ESTABLECIMIENTO
                </div>{console.log(nowuser)}
                <Input
                  type="text"
                  id="establecimiento"
                  name="establecimiento"
                  defaultValue={nowuser.asigned_speciality}
                  onChange={(e)=>setNowuser({asigned_speciality:e.target.value})}  
                  className="inputborder"
                />
              </FormGroup>
            </Col>
            <Col xs="2">
              <FormGroup>
                <div htmlFor="name" className="formborder">
                  NOMBRE
                </div>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={nowuser.firstName}
                  onChange={(e)=>setNowuser({asigned_speciality:e.target.value})}  
                  className="inputborder"
                  {...register('name')}
                />
              </FormGroup>
            </Col>
            <Col xs="2">
              <FormGroup>
                <div htmlFor="surname" className="formborder">
                  APELLIDO
                </div>
                <Input
                  type="text"
                  id="surname"
                  name="surname"
                  defaultValue={nowuser.surName}
                  onChange={(e)=>setNowuser({asigned_speciality:e.target.value})}  
                  className="inputborder"
                  {...register('surname')}
                />
              </FormGroup>
            </Col>
            <Col xs="1">
              <FormGroup>
                <div htmlFor="sexo" className="formborder">
                  SEXO(M-F)
                </div>
                <Input
                  type="text"
                  id="sexo"
                  name="sexo"
                  defaultValue={nowuser.gender}
                  onChange={(e)=>setNowuser({asigned_speciality:e.target.value})}  
                  className="inputborder"
                  {...register('sexo')}
                />
              </FormGroup>
            </Col>
            <Col xs="1">
              <FormGroup>
                <div htmlFor="id_evolucion" className="formborder">
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
                <div htmlFor="id_hce" className="formborder">
                  N HISTORIA CLÍNICA
                </div>
                <Input
                  type="text"
                  id="id_hce"
                  name="id_hce"
                  defaultValue={nowuser.id}
                  className="inputborder"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="tab">
            <Col xs="8" className="space-right">
              <FormGroup>
                <div htmlFor="id_evolucion" className="formborder">
                  1. EVOLUCION FIRMAR AL PIE DE CADA NOTA
                </div>
              </FormGroup>
            </Col>
            <Col xs="4">
              <FormGroup>
                <div htmlFor="id_hce" className="formborder">
                  2. PRESCRIPCIONES FIRMAR AL PIE
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row className="tab" >
            <Col xs="5" className="space-right">
            </Col>
            <Col xs="7" >
                <div id="test">
                REGISTRAR EN ROJO LA ADMINISTRACIÓN DE FARMACOS Y OTROS
                PRODUCTOS
                </div>
            </Col>
          </Row>
          <Row>
            <Col xs="1">
              <FormGroup className="formborder">
                <div htmlFor="id_evolucion">FECHA</div>
                <div htmlFor="id_evolucion">(DIA/MES/ANO)</div>
              </FormGroup>
            </Col>
            <Col xs="1">
              <FormGroup>
                <div htmlFor="id_hce" className="formborder">
                  HORA
                </div>
              </FormGroup>
            </Col>
            <Col xs="6" className="space-right">
              <FormGroup>
                <div htmlFor="id_evolucion" className="formborder">
                  NOTAS DE EVOLUCIÓN
                </div>
              </FormGroup>
            </Col>
            <Col xs="3">
              <FormGroup>
                <div htmlFor="id_hce" className="formborder">
                  FARMACOTERAPIA E INDICACIONES
                </div>
              </FormGroup>
            </Col>
            <Col xs="1">
              <FormGroup>
                <div htmlFor="id_hce" className="formborder" style={{"overflow":"hidden"}}>
                  ADMINIS<br/>TRACIÓN
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col xs="2">
              <FormGroup>
                <div htmlFor="id_hce" className="bigborder">
                  <p>{nowuser.appointment_date}</p>
                  <p>{nowuser.appointment_hour}</p>
                </div>
              </FormGroup>
            </Col>
            <Col xs="6" className="space-right">
              <FormGroup>
                <div htmlFor="id_hce" className="formborder">
                  <Input
                  type="textarea"
                  id="observations"
                  name="observations"
                  placeholder="Observations"
                  {...register('observations')}
                  />
                </div>
                <div htmlFor="id_hce" className="formborder">
                  Mc:
                </div>
              </FormGroup>
            </Col>
            <Col xs="4">
            <Row>
  <Col xs="6">
  <FormGroup>
    <div htmlFor="medicamento">
    <Input
      type="text"
      id="medicamento"
      name="medicamento"
      placeholder="Medicamento"
      onBlur={(e)=>setMedicinename(e.target.value)}
    />
    </div>
  </FormGroup>
  </Col>
  <Col xs="3">
  <FormGroup>
  <div htmlFor="dosis" >
  <Input
    type="text"
    id="dosis"
    name="dosis"
    placeholder="Dosis"
    onBlur={(e)=>setDosis(e.target.value)}
    />
  </div>
    </FormGroup>
    </Col>
    <Col xs="2">
      <FormGroup>
        <div htmlFor="dosis" style={{"alignContent":"center"}}
         onClick={()=>{let aux=[`${medicineName} ${dosis}`];setFullmedicine([...fullmedicine,aux]);}}>
        ok
      </div>
    </FormGroup>
  </Col>
</Row>{fullmedicine.map(aux=><div>{aux}</div>)}
            </Col>
          </Row>
          <Row>
            <Col >
              <Button type="submit" value="submit" color="primary">
                Agregar Cita
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Evolucion;
