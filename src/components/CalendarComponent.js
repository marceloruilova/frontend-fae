import { useState } from 'react';
import { Modal } from 'reactstrap';

function Calendar() {
  const fecha = new Date();
  const today = fecha.toUTCString();
  const rows = ['Hora', 'Traumatología', 'Psicología', 'Neurología', 'Rayos X'];
  const hours = ['7:00', '7:15', '7:30', '7:45', '8:00'];
  const [quotes, setQuotes] = useState(today);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleModal(row, hour) {
    setIsModalOpen(!isModalOpen);
  }
  return (
    <div className="login-box-container">
      {rows.map((row) => (
        <div>
          <div className="calendar">{row}</div>
          {hours.map((hour) => {
            if (row === 'Hora') return <div className="calendar">{hour}</div>;
            return (
              <div>
                <div
                  className="quote"
                  onClick={() => handleModal(row, hour)}
                ></div>
              </div>
            );
          })}
        </div>
      ))}
      <Modal isOpen={isModalOpen} toggle={setIsModalOpen}>
        <h1>test</h1>
        <p>Other text that describes what is happening</p>
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          toggle
        </button>
      </Modal>
    </div>
  );
}

export default Calendar;
