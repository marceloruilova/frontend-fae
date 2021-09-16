import './App.css';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import Calendar from './components/CalendarComponent';
import Evolucion from './components/EvolucionComponent';
import Lifesigns from './components/LifesignsComponent';
import Main from './components/MainComponent';

function App() {
    return(
      <BrowserRouter>
          <Main />
      </BrowserRouter>
    );
}

export default App;
