import { useState, useEffect } from 'react';

function Evolucion() {
  const today = new Date();
  const date = today.getHours() + today.getMilliseconds();

  return <div>{console.log(date)}</div>;
}

export default Evolucion;
