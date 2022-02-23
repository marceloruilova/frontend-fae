import { useState, useEffect } from "react";
import axios from "axios";
import PatientModal from "./modal/newPatient";
import { Row, Col, Container } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft,faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import authHeader from "../services/auth-header";

function Calendar() {
  const places = [
    [1, "Traumatología"],
    [2, "Psicología"],
    [3, "Neurología"],
    [4, "Rayos X"],
    [5, "Ginecología"],
    [5, "Odontología"],
  ];
  const hours = [
    [1, "Hora"],
    [2, "07:00"],
    [3, "07:45"],
    [4, "08:30"],
    [5, "09:15"],
    [6, "10:00"],
    [7, "10:45"],
    [8, "11:30"],
    [9, "12:30"],
    [10, "01:15"],
    [11, "02:00"],
    [12, "18:20"],
    [13, "21:40"],
  ];
  const [quotes, setQuotes] = useState("");
  const [today, setToday] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [especiality, setEspeciality] = useState("");
  const [isToday, setIsToday] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reload = () => window.location.reload();

  useEffect(() => {
    const fetch = async () => {
      const initial_date=today.toISOString().substring(0,10);
      const attend_users = await axios.get(
        "http://localhost:3000/patient/bydate"
      ,{params:{date:initial_date}})
      .then((result) => {
        setUsers(result.data);
      })
    };
    fetch();
  }, [isModalOpen,today]);
  
  const toggle = (area, hour) => {
    setIsModalOpen(!isModalOpen);
    setQuotes(hour);
    setEspeciality(area);
  };

  return (
    <div className="box-container">
      <Container>
        <Row className="tab" >
        <Col xs="1">{isToday?
          <div onClick={()=>{
    var result = new Date(today);
    result.setDate(result.getDate() - 1);
    setToday(result);
    console.log(result);
    setIsToday(!isToday);
  }} >
          
          <FontAwesomeIcon
                icon={faArrowCircleLeft}
                style={{ "font-size": "40px", "align-items": "center" ,"cursor":"pointer"}}
              />
          </div>:""}
          </Col>
          <Col xs="10">
          <div style={{"textAlign":"center"}} >
            <h2>{today.toString().substring(0,10)}</h2>
          </div>
          </Col>
          <Col xs="1">
          {isToday?"":<div onClick={()=>{
    var result = new Date(today);
    result.setDate(result.getDate() + 1);
    setToday(result);
    console.log(result);
    setIsToday(!isToday);
  }} >
          <FontAwesomeIcon
                icon={faArrowCircleRight}
                style={{ "font-size": "40px", "align-items": "center","cursor":"pointer" }}
              />
          </div>}
          </Col>
        </Row>
        {hours.map((item) => (
          <Row>
            <Col className="calendar" key={item[0]} xs="1">
              {item[1]}
            </Col>
            {places.map((place) =>
              item[1] !== "Hora" ? (
                <Col
                  className="quote"
                  onClick={() => toggle(place[1], item[1])}
                >
                  {users.map((user) =>
                    user.appointment_hour === item[1] &&
                    user.asigned_speciality === place[1] ? (
                      <li
                        key={user.ci}
                        style={{listStyleType:"none",backgroundColor:"#6be303",border:"solid 1px",borderRadius:"8px"}}
                      >{`${user.firstName} ${user.surName}`}</li>
                    ) : (
                      ""
                    )
                  )}
                </Col>
              ) : (
                <Col className="calendar" key={place[0]}>
                  {place[1]}
                </Col>
              )
            )}
          </Row>
        ))}
        {isModalOpen ? (
          <PatientModal
            isOpen={isModalOpen}
            toggle={toggle}
            quotes={quotes}
            especiality={especiality}
            reload={reload}
            date={today}
          />
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}
export default Calendar;
