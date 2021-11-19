import { useState } from 'react';
import {
  Table,
  Form,
  FormGroup,
  Button,
  Input
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect,useRef } from 'react';
import DoctorModal from './modal/newDoctor';
import Autocomplete from 'react-autocomplete';
import CIE from 'cie10';

function Cie10() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const [nowuser, setNowuser] = useState([]);
    const [evolution, setEvolution] = useState([]);
    const [isOpen,setIsOpen]=useState(false);
    const toggle=()=>setIsOpen(!isOpen)
    
    const cieArray=CIE('array');
    const [cie,setCie]=useState(cieArray);
    const [code,setCode]=useState(`${cieArray[0].c}:${cieArray[0].d}`);

    const today = new Date();
    const [month,setMonth]=useState([today.getMonth().toString()])
    const [year,setYear]=useState([today.getFullYear().toString()])

    const onSubmit = (data) => {
      const ciesplit=code.split(":");
      const request = {
        prescription: {
          info_prescription:{quantity: data.quantity,
          price: data.price,
          total_price: data.total_price,
          ticket_number: data.ticket_number,
          cie10: {
              code: ciesplit[0],
              disease: ciesplit[1],
          }}
      },
      prescriptionid:nowuser.prescription.id
      };
        axios.post('http://localhost:3000/prescription/saveinfo', request).then((result) => {
          alert(result);
      }); 
    };

    useEffect(()=>{ 
        const fetch=async () => {
          const data = await axios.get('http://localhost:3000/evolution/bymonth', 
            {
              params: {
                month: today.getMonth().toString(),
                year:today.getFullYear().toString()
              }
            }
          );
          const nnUser= data.data.find((item)=>{
            let month=item.hce.patient.appointment_date;
            const horas=parseInt(item.hce.patient.appointment_hour.substring(0,2),10);
            const minutos=parseInt(item.hce.patient.appointment_hour.substring(3,5),10);
            const atencion=minutos+45;
            if(month===today.toISOString().substring(0,10)&&atencion<=60&&horas===7/* &&today.getMinutes()<atencion */)
              return true;
            return false;            
          });
          setNowuser(nnUser);
          setEvolution(data.data);
        };
      fetch();
    },[]);

    return(
    <div className="login-box-container">
      <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr >
        <th scope="row">{nowuser.hce==undefined?"":nowuser.hce.id}</th>
          <td>{nowuser.hce==undefined?"":nowuser.hce.patient.id}</td>
          <td>{nowuser.hce==undefined?"":nowuser.hce.patient.createdAt.substr(0,10)}</td>
          <td>{nowuser.hce==undefined?"":nowuser.hce.patient.firstName}</td>
          <td onClick={()=>{setIsOpen(!isOpen);}}>
            {nowuser.prescription==undefined?"":nowuser.prescription.prescribing_doctor==undefined?"Agregar Doctor":nowuser.prescription.prescribing_doctor.doctor_first_name}
          </td>
          <td>
            {nowuser.prescription==undefined?"":nowuser.prescription.medicine.map(
              (item)=><p>{item}</p>
            )}
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
        <Autocomplete
            getItemValue={(item) => `${item.c}:${item.d}`}
            items={cie}
            renderItem={(item, isHighlighted) =>
                <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                {`${item.c}:${item.d}`}
                </div>
            }
            value={nowuser.prescription===undefined?"":code}
            onChange={(e) => {
                let newArray=cieArray.filter(cie=>{
                  return `${cie.c}:${cie.d}`.includes(e.target.value);})
                setCie(newArray);setCode(e.target.value)}
              }
            onSelect={(val) => setCode(val)}/>
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
                  id="ticket_number"
                  name="ticket_number"
                  type="submit"
                  className="inputborder"
                >Add</Button>
          </FormGroup>
          </td>
        </tr>
        {evolution.map((item)=>
        <tr >
          <th scope="row">{item.hce.patient.id}</th>
          <td>{item.id}</td>
          <td>{item.createdAt.substr(0,10)}</td>
          <td>{item.hce.patient.firstName}</td>
          <td >
            {item.prescription.prescribing_doctor==null?"":item.prescription.prescribing_doctor.doctor_first_name}
          </td>
          <td>
            {item.prescription.medicine==null?"":item.prescription.medicine.map((childitem)=><p>{childitem}</p>)}
          </td>
          <td>{item.prescription.info_prescription==null?"":item.prescription.info_prescription.quantity}
          </td>
          <td >{item.prescription.info_prescription==null?"":item.prescription.info_prescription.cie10.disease}
          </td>
          <td>{item.prescription.info_prescription==null?"":item.prescription.info_prescription.price}
          </td>
          <td>{item.prescription.info_prescription==null?"":item.prescription.info_prescription.ticket_number}</td>
        </tr>
        )}
      </tbody>
      </Table>
    </Form>
    {isOpen?
          <DoctorModal onClose={()=>setNowuser(nowuser)} 
          prescriptionid={nowuser.prescription.id} isOpen={isOpen} toggle={toggle}
          />
      :""}
    </div>
    </div>)
}
export default Cie10;
