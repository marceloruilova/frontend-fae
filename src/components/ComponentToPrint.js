import React from 'react';
import {render} from 'react-dom';
import {
    Row,
    Col,Container
  } from "reactstrap";

export class ComponentToPrint extends React.PureComponent {
    constructor(props){
        super(props);
    }
    render() {
        const today=new Date();
        return (
      <Container >
          <Row className="tab" style={{ "--bs-gutter-x": "0rem" }}>
            <Col xs="3">
                <div htmlFor="establecimiento" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                  ESTABLECIMIENTO
                </div>
                <div
                  id="establecimiento"
                  style={{border:"2px solid",
  borderRadius: "0.15rem",
  paddingLeft: "10px",
  height: "42px"}}
                >
                    {this.props.nowuser === undefined ? "" : this.props.nowuser.asigned_speciality}
                </div>
            </Col>
            <Col xs="2">
                <div htmlFor="name" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                  NOMBRE
                </div>
                <div
                  id="name"
                  style={{border:"2px solid",
  borderRadius: "0.15rem",
  paddingLeft: "10px",
  height: "42px"}}
                >
                  {this.props.nowuser === undefined ? "" : this.props.nowuser.firstName}
                    </div>
            </Col>
            <Col xs="2">
                <div htmlFor="surname" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                  APELLIDO
                </div>
                <div
                  type="text"
                  id="surname"
                  name="surname"
                  style={{border:"2px solid",
                  paddingLeft: "10px",
                  borderRadius: "0.15rem",
  height: "42px"}}
                >
                    {this.props.nowuser === undefined ? "" : this.props.nowuser.surName}
                </div>
            </Col>
            <Col xs="1">
                <div htmlFor="sexo" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                  SEXO(M-F)
                </div>
                <div
                  type="text"
                  id="sexo"
                  name="sexo"
                  style={{border:"2px solid",
                  paddingLeft: "10px",
                  borderRadius: "0.15rem",
  height: "42px"}}
                >
                    {this.props.nowuser === undefined ? "" : this.props.nowuser.gender}
                </div>
            </Col>
            <Col xs="1">
                <div htmlFor="id_evolucion" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                  N HOJA
                </div>
                <div
                  type="text"
                  id="id_evolucion"
                  name="id_evolucion"
                  style={{border:"2px solid",
                  paddingLeft: "10px",
                  borderRadius: "0.15rem",
  height: "42px"}}
                >
                    {this.props.nowuser === undefined ? "" : this.props.nowuser.electronic_history===undefined?"":this.props.nowuser.electronic_history.evolution.length+1}
                </div>
            </Col>
            <Col xs="3">
                <div htmlFor="id_hce" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                  N HISTORIA CLÍNICA
                </div>
                <div
                  type="text"
                  id="id_hce"
                  name="id_hce"
                  style={{border:"2px solid",
                  paddingLeft: "10px",
                  borderRadius: "0.15rem",
  height: "42px"}}
                >
                    {this.props.nowuser === undefined ? "" : this.props.nowuser.id}
                </div>
            </Col>
          </Row>
          <Row className="tab">
            <Col xs="8" className="space-right">
                <div htmlFor="id_evolucion" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                  1. EVOLUCION FIRMAR AL PIE DE CADA NOTA
                </div>
            </Col>
            <Col xs="4">
                <div htmlFor="id_hce" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                  2. PRESCRIPCIONES FIRMAR AL PIE
                </div>
            </Col>
          </Row>
                <div style={{"textAlign":"right"}}>
                REGISTRAR EN ROJO LA ADMINISTRACIÓN DE FARMACOS Y OTROS
                PRODUCTOS
                </div>
          <Row style={{ "--bs-gutter-x": "0rem" }}>
            <Col xs="1">
              <div htmlFor="id_evolucion" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                FECHA (D/M/A)
              </div>
            </Col>
            <Col xs="1" style={{ "paddingRight": "1rem" }}>
              <div htmlFor="id_hce" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                HORA
              </div>
            </Col>
            <Col xs="6" style={{ "paddingRight": "1rem" }}>
              <div htmlFor="id_evolucion" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                NOTAS DE EVOLUCIÓN
              </div>
            </Col>
            <Col xs="3">
              <div htmlFor="id_hce" style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px"}}>
                FARMACOTERAPIA E INDICACIONES
              </div>
            </Col>
            <Col xs="1">
              <div
                htmlFor="id_hce"
                style={{border:"2px solid",
  borderRadius: "0.15rem",
  textAlign: "center",
  alignContent: "center",
  height: "55px",
overflow:"hidden"}}
              >
                ADMINIS
                <br />
                TRACIÓN
              </div>
            </Col>
          </Row> 
          <Row style={{ "--bs-gutter-x": "0rem" }}>
            <Col xs="2" style={{ paddingRight: "1rem" }}>
              <div className="bigborder" style={{height:"550px"}}>
                {this.props.nowuser === undefined ? "" : this.props.nowuser.electronic_history===undefined?"":
                this.props.nowuser.electronic_history.vital.filter((item)=>{return item.attention_date.substring(0,10)===today.toISOString().substring(0,10)}).map((item)=>
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
              <div className="bigborder" style={{height:"550px"}}>
              {this.props.nowuser === undefined ? "" : this.props.nowuser.electronic_history===undefined?"": this.props.nowuser.electronic_history.evolution===undefined?"":this.props.nowuser.electronic_history.evolution.filter((item)=>{return item.createdAt.substring(0,10)===today.toISOString().substring(0,10)}).map((item)=>
                  <div htmlFor="mc">
                  <p>{`Mc: ${item.mc}`}</p>
                  <p>{`Enf: ${item.enf}`}</p>
                  <p>{`Qx: ${item.qx}`}</p>
                  <p>{`Alergias: ${item.alergies}`}</p>
                  <p>{`Objetivo: ${item.objective}`}</p>
                  <p>{`Subjetivo: ${item.subjective}`}</p>
                </div>
              )}
              </div>
            </Col>
            <Col xs="4">
              <div className="bigborder" style={{height:"550px"}}>{this.props.nowuser === undefined ? "" : this.props.nowuser.electronic_history===undefined?"": this.props.nowuser.electronic_history.evolution===undefined?"":this.props.nowuser.electronic_history.evolution.filter((item)=>{return item.createdAt.substring(0,10)===today.toISOString().substring(0,10)}).map((item)=>
              <div>
                  <li>{`${item.prescription.medicine}`}</li>
              </div>
              )}
              </div>
            </Col>
          </Row>
        </Container>
        );
    }
  }
