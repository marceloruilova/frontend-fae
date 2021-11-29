import { useState } from "react";
import {
  Table,
  Form,
  FormGroup,
  Button,
  Input,
  Card,
  CardHeader,
  CardFooter,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect } from "react";
import Autocomplete from "react-autocomplete";

function Inventory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [nowuser, setNowuser] = useState([]);
  const [evolution, setEvolution] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [inventorycopy, setInventorycopy] = useState([]);
  const [value, setValue] = useState({
    name: "",
    presentation: "",
    concentration: "",
    stock: "",
  });

  const [isFormOpen, setIsFormOpen] = useState(false);

  const onSubmit = (data) => {
    const request = {
      inventory: {
        name: value.name,
        presentation: value.presentation,
        concentration: value.concentration,
        stock: parseInt(data.quantity),
        due_date: data.due_date,
      },
    };
    axios.post("http://localhost:3000/inventory", request).then((result) => {
      alert(result);
    });
    setIsFormOpen(!isFormOpen);
  };

  useEffect(() => {
    const fetch = async () => {
      let today = new Date();
      const data = await axios.get("http://localhost:3000/evolution/bymonth", {
        params: {
          month: today.getMonth().toString(),
          year: today.getFullYear().toString(),
        },
      });
      const nnUser = data.data.find((item) => {
        let month = item.hce === null ? "" : item.hce.patient.appointment_date;
        const horas = parseInt(
          item.hce === null
            ? ""
            : item.hce.patient.appointment_hour.substring(0, 2),
          10
        );
        const minutos = parseInt(
          item.hce === null
            ? ""
            : item.hce.patient.appointment_hour.substring(3, 5),
          10
        );
        const atencion = minutos + 45;
        const resto = Math.abs(atencion - 60);
        if (
          month === today.toISOString().substring(0, 10) &&
          atencion >= 60 &&
          horas + 1 === today.getHours() &&
          today.getMinutes() <= resto
        )
          return true;
        if (
          month === today.toISOString().substring(0, 10) &&
          atencion <= 60 &&
          horas === today.getHours() &&
          today.getMinutes() < atencion
        )
          return true;
         
        return false;
      });
      setNowuser(nnUser);
      setEvolution(data.data);
    };
    const fetchinventory = async () => {
      const data = await axios.get("http://localhost:3000/inventory");
      setInventory(data.data);
      setInventorycopy(data.data);
    };
    fetch();
    fetchinventory();
  }, [setInventory]);

  return (
    <div className="box-container" style={{ padding: "3rem" }}>
      <div className="container">
        <Card style={{ width: "40%" }}>
          <CardHeader>
            Paciente{" "}
            {nowuser === undefined || nowuser.hce === undefined
              ? ""
              : `${nowuser.hce.patient.firstName} ${nowuser.hce.patient.surName}`}
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">CIE 10</CardTitle>
            <CardText>
              Medicina:
              {nowuser === undefined || nowuser.prescription === undefined
                ? ""
                : nowuser.prescription.medicine.map((item) => <p>{item}</p>)}
            </CardText>
            <CardText>
              Cantidad:
              {nowuser === undefined || nowuser.hce === undefined
                ? ""
                : nowuser.prescription.info_prescription.quantity}
            </CardText>
          </CardBody>
          <CardFooter>
            Medico:
            {nowuser === undefined || nowuser.prescription === undefined
              ? ""
              : nowuser.prescription.prescribing_doctor.doctor_first_name}
          </CardFooter>
        </Card>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>N de Hoja</th>
              <th>Fecha</th>
              <th>Nombre del Paciente</th>
              <th>Nombre del Medico Prescriptor</th>
              <th>Medicamento Dispensado</th>
              <th>Cantidad</th>
              <th>CIE10(Diagnóstico)</th>
              <th>Precio</th>
              <th>N de Ticket</th>
            </tr>
          </thead>
          <tbody>
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
                {nowuser === undefined || nowuser.prescription === undefined||nowuser.prescription.prescribing_doctor.doctor_first_name === null
                  ? ""
                  : nowuser.prescription.prescribing_doctor.doctor_first_name}
              </td>
              <td>
                {nowuser === undefined || nowuser.prescription === undefined
                  ? ""
                  : nowuser.prescription.medicine.map((item) => <p>{item}</p>)}
              </td>
              <td>
                {nowuser === undefined || nowuser.hce === undefined
                  ? ""
                  : nowuser.prescription.info_prescription.quantity}
              </td>
              <td>
                {nowuser === undefined || nowuser.hce === undefined
                  ? ""
                  : nowuser.prescription.info_prescription.cie10.disease}
              </td>
              <td>
                {nowuser === undefined || nowuser.hce === undefined
                  ? ""
                  : nowuser.prescription.info_prescription.price}
              </td>
              <td>
                {nowuser === undefined || nowuser.hce === undefined
                  ? ""
                  : nowuser.prescription.info_prescription.ticket_number}
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          color="primary"
          size="ms"
        >
          Nuevo medicamento al inventario
        </Button>
        {isFormOpen ? (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Table hover>
              <thead>
                <tr>
                  <th>Nombre Medicamento</th>
                  <th>Presentación</th>
                  <th>Concentración</th>
                  <th>Cantidad</th>
                  <th>Fecha Expiración</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Autocomplete
                      getItemValue={(item) =>
                        `${item.name} ${item.presentation} ${item.concentration}`
                      }
                      items={inventorycopy}
                      renderItem={(item, isHighlighted) => (
                        <div
                          style={{
                            background: isHighlighted ? "lightgray" : "white",
                          }}
                        >
                          {`${item.name} ${item.presentation} ${item.concentration} ${item.stock}`}
                        </div>
                      )}
                      value={value.name}
                      onChange={(e) => {
                        let valuearr = e.target.value.split(" ");
                        let newArray = inventory.filter((aux) => {
                          return `${aux.name} ${aux.presentation} ${aux.concentration}`.includes(
                            e.target.value
                          );
                        });
                        setInventorycopy(newArray);
                        setValue({
                          name: valuearr[0],
                          presentation: valuearr[1],
                          concentration: valuearr[2],
                        });
                      }}
                      onSelect={(val) => {
                        let valuearr = val.split(" ");
                        setValue({
                          name: valuearr[0],
                          presentation: valuearr[1],
                          concentration: valuearr[2],
                        });
                      }}
                    />
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        id="presentation"
                        name="presentation"
                        type="text"
                        defaultValue={
                          (value.presentation = "" ? "" : value.presentation)
                        }
                        className="inputborder"
                        onChange={(e) =>
                          setValue({
                            name: value.name,
                            presentation: e.target.value,
                            concentration: "",
                          })
                        }
                      />
                    </FormGroup>
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        id="concentration"
                        name="concentration"
                        type="text"
                        defaultValue={
                          (value.concentration = "" ? "" : value.concentration)
                        }
                        className="inputborder"
                        onChange={(e) =>
                          setValue({
                            name: value.name,
                            presentation: value.presentation,
                            concentration: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        className="inputborder"
                        {...register("quantity")}
                      />
                    </FormGroup>
                  </td>
                  <td>
                    <FormGroup>
                      <Input
                        id="due_date"
                        name="due_date"
                        type="number"
                        className="inputborder"
                        {...register("due_date")}
                      />
                    </FormGroup>
                  </td>
                  <td>
                    <FormGroup>
                      <Button
                        id="quantity"
                        name="quantity"
                        type="number"
                        className="inputborder"
                      >
                        Add
                      </Button>
                    </FormGroup>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Form>
        ) : (
          ""
        )}
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Stock</th>
              <th>Nombre Medicamento</th>
              <th>Presentación</th>
              <th>Concentración</th>
              <th>Fecha Expiración</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr>
                <th scope="row">{item.id}</th>
                <td>{item.stock}</td>
                <td>{item.name}</td>
                <td>{item.presentation}</td>
                <td>{item.concentration}</td>
                <td>{item.due_date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default Inventory;
