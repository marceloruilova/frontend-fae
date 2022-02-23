import { useState,useEffect,useRef } from "react";
import {
  Row,
  Col,
  Container,
  FormGroup,
  Input,
  Form,
  Button,
} from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import ReactToPrint from 'react-to-print';
import { ComponentToPrint } from './ComponentToPrint';

function Evolucion() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const componentRef = useRef();
  const [users, setUsers] = useState([]);
  const [nowuser, setNowuser] = useState([]);
  const today = new Date();
  const [medicineName, setMedicinename] = useState("");
  const [dosis, setDosis] = useState("");
  const [disable, setDisable] = useState(true);
  const [fullmedicine, setFullmedicine] = useState([]);

  const onSubmit = (data) => {
    if(window.confirm("Estás seguro?")){ 
    const request = {
      evolution: {
        initial_observations: data.observations,
        establishment: nowuser===undefined||nowuser.asigned_speciality?"":nowuser.asigned_speciality,
        month: today.getMonth().toString(),
        year: today.getFullYear().toString(),
        mc: data.mc,
        enf: data.enf,
        qx: data.qx,
        alergies: data.alergies,
        objective: data.objetivo,
        subjective: data.subjetivo,
        prescription: {
          notes: data.notes,
          medicine: fullmedicine.length===0?["No refiere"]:fullmedicine,
        },
      },
      electronic_history_id:nowuser===undefined||nowuser.electronic_history===undefined?"": nowuser.electronic_history.id,
    };
    axios
      .post("http://localhost:3000/hce/evolucion", request)
      .then((result) => {alert("Éxito");setDisable(!disable);})
      .catch((error) => alert("Error"));}
  };

  useEffect(() => {
    const fetch = async () => {
      const attend_users = await axios.get(
        "http://localhost:3000/patient/bydate"
        ,{params:{date:today.toISOString().substring(0,10)}});
      const nnUser = attend_users.data.find((user) => {
        const horas = parseInt(user.appointment_hour.substring(0, 2), 10);
        const minutos = parseInt(user.appointment_hour.substring(3, 5), 10);
        const atencion = minutos + 45;
        const resto = Math.abs(atencion - 60);
        // 45 minutos tiempo para atencion del cliente 7.30 - 7.45 - 8.15
        // aun falta parece, hacer pruebas.
        if (
          atencion >= 60 &&
          horas + 1 === today.getHours() &&
          today.getMinutes() <= resto
        )
          return true;
        if (
          atencion <= 60 &&
          horas === today.getHours() &&
          today.getMinutes() < atencion
        )
        return true;
        if (
          atencion >= 60 &&
          horas === today.getHours() &&
          today.getMinutes() <= 60
          &&minutos<=today.getMinutes()
        )
          return true;
        return false;
      });
      setUsers(attend_users.data);
      setNowuser(nnUser);
    };
    fetch();
  }, [disable]);

  return (
    <div className="box-container">
      <Container>
        <Form onSubmit= { handleSubmit(onSubmit)}>
          <Row className="tab" style={{ "--bs-gutter-x": "0rem" }}>
            <Col xs="3">
              <FormGroup>
                <div htmlFor="establecimiento" className="formborder">
                  ESTABLECIMIENTO
                </div>
                <Input
                  type="text"
                  id="establecimiento"
                  name="establecimiento"
                  defaultValue={
                    nowuser === undefined ? "" : nowuser.asigned_speciality
                  }
                  onChange={(e) =>
                    setNowuser({ asigned_speciality: e.target.value })
                  }
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
                  defaultValue={nowuser === undefined ? "" : nowuser.firstName}
                  className="inputborder"
                  {...register("name")}
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
                  defaultValue={nowuser === undefined ? "" : nowuser.surName}
                  onChange={(e) =>
                    setNowuser({ asigned_speciality: e.target.value })
                  }
                  className="inputborder"
                  {...register("surname")}
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
                  defaultValue={nowuser === undefined ? "" : nowuser.gender}
                  onChange={(e) =>
                    setNowuser({ asigned_speciality: e.target.value })
                  }
                  className="inputborder"
                  {...register("sexo")}
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
                  defaultValue={nowuser === undefined ? "" : nowuser.electronic_history===undefined?"":nowuser.electronic_history.evolution.length+1}
                  className="inputborder"
                  {...register("id_evolucion")}
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
                  defaultValue={nowuser === undefined ? "" : nowuser.id}
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
                <div style={{"textAlign":"right"}}>
                REGISTRAR EN ROJO LA ADMINISTRACIÓN DE FARMACOS Y OTROS
                PRODUCTOS
                </div>
          <Row style={{ "--bs-gutter-x": "0rem" }}>
            <Col xs="1">
              <div htmlFor="id_evolucion" className="formborder">
                FECHA (D/M/A)
              </div>
            </Col>
            <Col xs="1" style={{ "paddingRight": "1rem" }}>
              <div htmlFor="id_hce" className="formborder">
                HORA
              </div>
            </Col>
            <Col xs="6" style={{ "paddingRight": "1rem" }}>
              <div htmlFor="id_evolucion" className="formborder">
                NOTAS DE EVOLUCIÓN
              </div>
            </Col>
            <Col xs="3">
              <div htmlFor="id_hce" className="formborder">
                FARMACOTERAPIA E INDICACIONES
              </div>
            </Col>
            <Col xs="1">
              <div
                htmlFor="id_hce"
                className="formborder"
                style={{ overflow: "hidden" }}
              >
                ADMINIS
                <br />
                TRACIÓN
              </div>
            </Col>
          </Row> 
          <Row style={{ "--bs-gutter-x": "0rem" }}>
            <Col xs="2" style={{ paddingRight: "1rem" }}>
              <div className="bigborder">
                {nowuser === undefined ? "" : nowuser.electronic_history===undefined?"":
                nowuser.electronic_history.vital.filter((item)=>{return item.attention_date.substring(0,10)===today.toISOString().substring(0,10)}).map((item)=>
                <div key={item.id}>
                  <p>{`${item.attention_date.substring(0,10)} ${item.attention_hour}`}</p>
                  <p><b>T:</b>{` ${item.temperature_start} a ${item.temperature_end}`}</p>
                  <p><b>T/A:</b>{` ${item.sistolica} / ${item.diastolica}`}</p>
                  <p><b>FC:</b>{` ${item.fc_start} a ${item.fc_end}`}</p>
                  <p><b>FR:</b>{` ${item.fr_start} a ${item.fr_end}`}</p>
                  <p><b>SPO2:</b>{` ${item.spo2} %`}</p>
                  <p><b>ALTURA:</b>{` ${item.height} cm`}</p>
                  <p><b>PESO:</b>{` ${item.weight} kg`}</p>
                  <p><b>PC:</b>{` ${item.pc} cm`}</p>
                </div>
                )
                }
              </div>
            </Col>
            <Col xs="6" style={{ "paddingRight": "1rem" }}>
              <div className="bigborder">
                <div htmlFor="mc">
                  <p>Mc:</p>
                  <Input
                    type="text"
                    id="mc"
                    name="mc"
                    placeholder="Mc"
                    {...register("mc")}
                  />
                </div>
                <div htmlFor="enf">
                  <p>Enf:</p>
                  <Input
                    type="text"
                    id="enf"
                    name="enf"
                    placeholder="Enf"
                    {...register("enf")}
                  />
                </div>
                <div htmlFor="qx">
                  <p>Qx:</p>
                  <Input
                    type="text"
                    id="qx"
                    name="qx"
                    placeholder="Qx"
                    {...register("qx")}
                  />
                </div>
                <div htmlFor="objetivo">
                  <p>Alergias:</p>
                  <Input
                    type="text"
                    id="alergies"
                    name="alergies"
                    placeholder="Alergias"
                    {...register("alergies")}
                  />
                </div>
                <div htmlFor="objetivo">
                  <p>Objetivo:</p>
                  <Input
                    type="text"
                    id="objetivo"
                    name="objetivo"
                    placeholder="Objetivo"
                    {...register("objetivo")}
                  />
                </div>
                <div htmlFor="subjetivo">
                  <p>Subjetivo:</p>
                  <Input
                    type="text"
                    id="subjetivo"
                    name="subjetivo"
                    placeholder="Subjetivo"
                    {...register("subjetivo")}
                  />
                </div>
              </div>
            </Col>
            <Col xs="4">
              <div className="bigborder">
                <Row>
                  <Col xs="5">
                    <FormGroup>
                      <Input
                        type="text"
                        id="medicamento"
                        name="medicamento"
                        placeholder="Medicamento"
                        onBlur={(e) => setMedicinename(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Input
                        type="text"
                        id="dosis"
                        name="dosis"
                        placeholder="Dosis"
                        onBlur={(e) => setDosis(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Button
                        htmlFor="dosis"
                        style={{ alignContent: "center" }}
                        color="success"
                        onClick={() => {
                          let aux = [`${medicineName} ${dosis}`];
                          setFullmedicine([...fullmedicine, aux]);
                        }}
                      >
                        Add
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                  {fullmedicine.map((aux,index) => (
                <Row 
                className="medicine">
                  <Col xs="10" 
                    onClick={(e)=>{
                    var array=[...fullmedicine];
                    array.splice(parseInt(e.target.innerHTML)-1,1);
                    setFullmedicine(array);
                  }}>
                  <li style={{ "paddingLeft": "1.5rem",listStyleType:"none" }}>{index+1}. {aux}</li>
                  <span class="tooltiptext">Eliminar</span>
                  </Col>
                </Row>
                  ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type="submit" value="submit" color="success" disabled={!disable}>
                Agregar Hoja
              </Button>
              <ReactToPrint
        trigger={() =>  <Button color="success" disabled={disable}>Imprimir!</Button>}
        content={() => componentRef.current}
      />
    <div style={{ display: "none" }}>  <ComponentToPrint ref={componentRef} nowuser={nowuser}/>
    </div></Col>
          </Row>
        </Form>
      </Container>{" "}
    </div>
  );
}

export default Evolucion;
