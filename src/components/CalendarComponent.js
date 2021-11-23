import { useState,useEffect } from "react";
import axios from "axios";
import UserModal from "./modal/newUser";

function Calendar() {
  const places = [
    [1,"Traumatología"],
    [2,"Psicología"],
    [3,"Neurología"],
    [4,"Rayos X"],
    [5,"Ginecología"],
  ];
  const hours = [[1,"Hora"],[2,"07:00"], [3,"07:45"], [4,"08:30"], [5,"09:15"], 
  [6,"10:00"], [7,"10:45"], [8,"11:30"], [9,"12:30"], [10,"01:15"], [11,"02:00"], [12,"02:45"], [13,"03:30"]];
  const [quotes, setQuotes] = useState("");
  const [users, setUsers] = useState([]);
  const [especiality, setEspeciality] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetch = async () => {
      const attend_users = await axios.get(
        "http://localhost:3000/patient/bydate"
      );
      setUsers(attend_users.data);
    };
    fetch();
  }, []);
  const toggle = (area, hour) => {
    setIsModalOpen(!isModalOpen);
    setQuotes(hour);
    setEspeciality(area);
  };
  const reload=()=>window.location.reload();

  return (
    <div className="login-box-container">
      <div className="container" >
        {hours.map((item) => (
          <div className="row">
            <div className="col 4 calendar" key={item[0]}>
              {item[1]}
            </div>{console.log(users)}
            {places.map((place) =>
              item[1] !== "Hora" ?  (
                <div
                className="col 4 quote"
                onClick={() => toggle(place[1], item[1])}
                >
                {users.map(user=>((user.appointment_hour===item[1])&&(user.asigned_speciality===place[1]))?
                <li key={user.ci}>{`${user.firstName} ${user.surName}`}</li>:"")
                }
                </div>
                ):(
                <div className="col 4 calendar" key={place[0]}>
                  {place[1]}
                </div>
              )
            )}
          </div>
        ))}
        {isModalOpen?<UserModal 
            isOpen={isModalOpen}
            toggle={toggle}
            quotes={quotes}
            especiality={especiality}
            reload={reload}
            />:""}
      </div>
    </div>
  );
}
export default Calendar;
