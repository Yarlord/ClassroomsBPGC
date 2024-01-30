import styles from './App.css';
import Class from "./UI/Classes";
import './UI/fonts.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
  }, []);

  return (
    <div className="main">
      <h1 className="bpgc-classes">CLASSROOMS</h1>
      <h2 id="time">{time.toLocaleTimeString()}</h2>
      <Class />
    </div>
  );

}

export default App;
