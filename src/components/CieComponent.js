import { useState } from "react";
import { Table, Form, FormGroup, Container, Button, Input,Row,Col } from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import DoctorModal from "./modal/newDoctor";
import Autocomplete from "react-autocomplete";
import CIE from "cie10";

function Cie10() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [nowuser, setNowuser] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const reload = () => window.location.reload();
  const months = [
    [0, "Enero"],
    [1, "Febrero"],
    [2, "Marzo"],
    [3, "Abril"],
    [4, "Mayo"],
    [5, "Junio"],
    [6, "Julio"],
    [7, "Agosto"],
    [8, "Septiembre"],
    [9, "Octubre"],
    [10, "Noviembre"],
    [11, "Diciembre"],
  ];
  const [years,setYears] = useState([
    [1, 2022],
  ]);

  const cieArray = CIE("array");
  const [cie, setCie] = useState(cieArray);
  const [code, setCode] = useState(`${cieArray[0].c}:${cieArray[0].d}`);

  const today = new Date();

  const onSubmit = (data) => {
    const ciesplit = code.split(":");
    const request = {
      prescription: {
        info_prescription: {
          price: data.price,
          ticket_number: data.ticket_number,
          cie10: {
            code: ciesplit[0],
            disease: ciesplit[1],
          },
        },
      },
      prescriptionid: nowuser.prescription.id,
    };
    axios
      .post("http://localhost:3000/prescription/saveinfo", request)
      .then((result) => {
        alert(result);
      })
      .catch((error) => alert("error"));
  };

  const onSubmitMonth = (data) => {
    const monthfetch=months.filter(item=>item[1]===data.month);
    const yearfetch=data.year===undefined?today.getFullYear().toString():data.year.toString();
    axios
      .get("http://localhost:3000/evolution/bymonth",{params:{month:monthfetch[0][0].toString(),year:yearfetch,},})
      .then((result) => {
        setEvolution(result.data);
      })
      .catch((error) => alert("error"));
  };
  useEffect(() => {
    const fetch = async () => {
      if(years[years.length-1][1]!==today.getFullYear())
        setYears([...years,[years[years.length-1][0]+1,years[years.length-1][1]+1]]);
      const data = await axios.get("http://localhost:3000/evolution/bymonth", {
        params: {
          month: today.getMonth().toString(),
          year: today.getFullYear().toString(),
        },
      });
      const nnUser = data.data.find((item) => {
        const horas = parseInt(
          item.hce === null
            ? 0
            : item.hce.patient.appointment_hour.substring(0, 2),
          10
        );
        const minutos = parseInt(
          item.hce === null
            ? 0
            : item.hce.patient.appointment_hour.substring(3, 5),
          10
        );
        const atencion = minutos + 45;
        const resto = Math.abs(atencion - 60);
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
      setNowuser(nnUser);
      setEvolution(data.data);
    };
    fetch();
  }, []);

  return (
    <div className="box-container">
      <Container>
      <Form onSubmit={handleSubmit(onSubmitMonth)}>
      <Row style={{padding:"16px"}}>
        <FormGroup>
      <Row >
        <Col>
                    <Input
                      id="month"
                      name="month"
                      type="select"
                      placeholder="Mes"
                      {...register("month")}
                    >
                    {nowuser===undefined?"":months.filter(month=>month[0]===parseInt(nowuser.month)).map(item=><option>{item[1]}</option>)}
                    {months.map(month=><option>{month[1]}</option>)}
                    </Input>
        </Col>
        <Col>
                    <Input
                      id="year"
                      name="year"
                      type="select"
                      {...register("year")}>
                    {nowuser===undefined?"":years.filter(year=>year[0]===parseInt(nowuser.year)).map(item=><option>{item[1]}</option>)}
                    {years.map(year=><option>{year[1]}</option>)}
                    </Input>
        </Col>
        <Col>
                    <Button
                    id="price"
                    color="primary"
                    type="submit"
                  >Buscar</Button>
        </Col>
        </Row>
                  </FormGroup>
                  </Row>
        </Form>
                  <Row>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Table hover bordered>
            <thead style={{"backgroundColor":"rgb(108,187,68)","borderColor":"green",
                    "verticalAlign":"middle","textAlign":"center"}}>
              <tr>
                <th>N HCE</th>
                <th>N Hoja</th>
                <th>Fecha</th>
                <th>Nombre Paciente</th>
                <th>Nombre Medico</th>
                <th>Medicamento Dispensado</th>
                <th>Canti</th>
                <th>CIE10(Diagnóstico)</th>
                <th>Precio Unitario</th>
                <th>Numero Ticket</th>
                <th></th>
              </tr>
            </thead>
            <tbody style={{"borderColor":"green"}}>
              <tr>
                <th scope="row">
                  {nowuser === undefined || nowuser.hce === undefined
                    ? ""
                    : nowuser.hce.id}
                </th>
                <td>
                  {nowuser === undefined || nowuser.hce === undefined
                    ? ""
                    : nowuser.hce.patient.id}
                </td>
                <td>
                  {nowuser === undefined || nowuser.hce === undefined
                    ? ""
                    : nowuser.hce.patient.createdAt.substr(0, 10)}
                </td>
                <td>
                  {nowuser === undefined || nowuser.hce === undefined
                    ? ""
                    : nowuser.hce.patient.firstName}
                </td>
                <td>
                  {nowuser === undefined ||
                  nowuser.prescription === undefined ? (
                    ""
                  ) : nowuser.prescription.prescribing_doctor === undefined||nowuser.prescription.prescribing_doctor === null ? (
                    <div
                      onClick={() => {
                        setIsOpen(!isOpen);
                      }}
                    >
                      Agregar Doctor
                    </div>
                  ) : (
                    nowuser.prescription.prescribing_doctor.doctor_first_name
                  )}
                </td>
                <td>
                  {nowuser === undefined || nowuser.prescription === undefined|| nowuser.prescription.medicine === null
                    ? ""
                    : nowuser.prescription.medicine.map((item) => (
                        <p>{`${item.split(" ")[0]}`}</p>
                      ))}
                </td>
                <td>
                {nowuser === undefined || nowuser.prescription === undefined|| nowuser.prescription.medicine === null
                    ? ""
                    : nowuser.prescription.medicine.map((item,index) => (
                      <p>{`${item.split(" ")[1]}`}</p>
                      ))}
                </td>
                <td>
                  <Autocomplete
                    getItemValue={(item) => `${item.c}:${item.d}`}
                    items={cie}
                    renderItem={(item, isHighlighted) => (
                      <div
                        style={{
                          background: isHighlighted ? "lightgray" : "white",
                        }}
                      >
                        {`${item.c}:${item.d}`}
                      </div>
                    )}
                    value={
                      nowuser === undefined ||
                      nowuser.prescription === undefined
                        ? ""
                        : code
                    }
                    onChange={(e) => {
                      let newArray = cieArray.filter((cie) => {
                        return `${cie.c}:${cie.d}`.includes(e.target.value);
                      });
                      setCie(newArray);
                      setCode(e.target.value);
                    }}
                    onSelect={(val) => setCode(val)}
                  />
                </td>
                <td>
                  <FormGroup>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      className="inputborder"
                      {...register("price")}
                    />
                  </FormGroup>
                </td>
                <td>
                  <FormGroup>
                    <Input
                      id="ticket_number"
                      name="ticket_number"
                      type="number"
                      className="inputborder"
                      {...register("ticket_number")}
                    />
                  </FormGroup>
                </td>
                <td>
                  <FormGroup>
                    <Button
                      type="submit"
                      className="inputborder"
                      color="success"
                    >
                      Add
                    </Button>
                  </FormGroup>
                </td>
              </tr>
              {evolution.map((item) => (
                <tr>
                  <th scope="row">
                    {item.hce === null ? "" : item.hce.patient.id}
                  </th>
                  <td>{item.id}</td>
                  <td>{item.createdAt.substr(0, 10)}</td>
                  <td>{item.hce === null ? "" : item.hce.patient.firstName}</td>
                  <td>
                    {item.prescription.prescribing_doctor == null
                      ? ""
                      : item.prescription.prescribing_doctor.doctor_first_name}
                  </td>
                  <td>
                    {item.prescription.medicine == null
                      ? ""
                      : item.prescription.medicine.map((childitem) => (
                          <p>{childitem.split(" ")[0]}</p>
                        ))}
                  </td>
                  <td>
                  {item.prescription.medicine == null
                      ? ""
                      : item.prescription.medicine.map((childitem) => (
                          <p>{childitem.split(" ")[1]}</p>
                        ))}
                  </td>
                  <td>
                    {item.prescription.info_prescription == null
                      ? ""
                      : item.prescription.info_prescription.cie10.disease}
                  </td>
                  <td>
                    {item.prescription.info_prescription == null
                      ? ""
                      : item.prescription.info_prescription.price}
                  </td>
                  <td>
                    {item.prescription.info_prescription == null
                      ? ""
                      : item.prescription.info_prescription.ticket_number}
                  </td>
                  <td>
                  <Button
                      id="ticket_number"
                      name="ticket_number"
                      type="submit"
                      className="inputborder"
                    >
                      Add
                    </Button>
                    </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Form>
        </Row>
        {isOpen ? (
          <DoctorModal
            prescription={nowuser.prescription}
            isOpen={isOpen}
            toggle={toggle}
            reload={reload}
          />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}
export default Cie10;
