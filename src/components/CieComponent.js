import { useState } from 'react';
import {
  Table,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';

function Cie10() {

    const [evolution, setEvolution] = useState([]);
    const today = new Date();
    const [month,setMonth]=useState([today.getMonth().toString()])
    const [year,setYear]=useState([today.getFullYear().toString()])
    
    useEffect(()=>{ 

        const fetch=async () => {
          const data = await axios.get('http://localhost:3000/evolution/bymonth', 
            {
              params: {
                month: today.getMonth().toString(),
                year:today.getFullYear().toString()
              }
            }
          ).then(response=>setEvolution(response.data));
          //setUsers(attend_users.data);
        };
      fetch();
    },[]);

    return(
    <Table hover>
      <thead>
        <tr>
          <th>#{month}</th>
          <th>N de Hoja</th>
          <th>Fecha</th>
          <th>Nombre del Paciente</th>
          <th>Nombre del Medico Prescriptor</th>
          <th>Medicamento Dispensado</th>
          <th>Cantidad</th>
          <th>Diagnóstico</th>
          <th>Precio</th>
          <th>N de Ticket</th>
        </tr>
      </thead>
      <tbody>
        {evolution.map((item)=>
        <tr>
          <th scope="row">{item.hce.patient.id}</th>
          <td>{item.id}</td>
          <td>{item.createdAt}</td>
          <td>{item.hce.patient.firstName}</td>
        </tr>
        )}
      </tbody>
    </Table>)
}
export default Cie10;