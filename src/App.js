import styles from './App.css';
import Class from "./UI/Classes";
import Styles from './UI/Drawer.css';
import SearchLocation from "./UI/SearchLocation";
import { FaSearchLocation } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import './UI/fonts.css';
import React, { useState, useEffect } from 'react';
import { render } from '@testing-library/react';

function App() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
  }, []);

  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleOnClick = (component)=>{
      setSelectedComponent(component);
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'searchLocation':
        return <SearchLocation />;
      // case 'searchDate':
      //   return <SearchDate />;
      default:
        return <Class />;
    }
  }

  return (
    <div className="main">
      {renderComponent()}
      <div className='searchbar'>
        <div className="drawer">
              <div className="drawer-details">
                  <div className='icon-container'>
                      <div className='home' onClick={()=>handleOnClick('home')}>
                          <FaHouseUser/>
                          <p className='icon-text'>Home</p>
                      </div>

                      <div className='search-class' onClick={()=>handleOnClick('searchLocation')}>
                          <FaSearchLocation/>
                          <p className='icon-text'>Classes</p>
                      </div>

                      <div className='search-class' onClick={()=>handleOnClick('searchDate')}>
                          <FaCalendar/>
                          <p className='icon-text'>Day</p>
                      </div>
                      
                  </div>
              </div>          
          </div>
      </div>
      
    </div>
  );

}

export default App;
