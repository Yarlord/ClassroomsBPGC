import styles from './App.css';
import Home from "./UI/Home";
import Styles from './UI/Drawer.css';
import SearchLocation from "./UI/SearchLocation";
import Today from './UI/Classes';
import { FaSearchLocation } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";
import './UI/fonts.css';
import React, { useState, useEffect,  useMemo } from 'react';
import { render } from '@testing-library/react';

function App() {

  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleOnClick = (component)=>{
      setSelectedComponent(component);
  }

  const handleButton = (component)=>{
    setSelectedComponent(component);
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'searchLocation':
        return <SearchLocation />;
      case 'searchDate':
        return <Today />;
      default:
        return <Home buttonVal={handleButton}/>;
    }
  }



  
  
  return (

      <div className="main">
        {renderComponent()}
        <div className='drawbar'>
          <div className="drawer">
                <div className="drawer-details">
                    <div className='icon-container'>
                        <div className='home' onClick={()=>handleOnClick('home')}>
                            {/* <FaHouseUser/> */}
                            <p className='icon-text'>Home</p>
                        </div>

                        {/* <div className='search-class' onClick={()=>handleOnClick('searchLocation')}>
                            <FaSearchLocation/>
                            <p className='icon-text'>Classes</p>
                        </div>

                        <div className='search-class' onClick={()=>handleOnClick('searchDate')}>
                            <FaCalendar/>
                            <p className='icon-text'>Today</p>
                        </div> */}
                        
                    </div>
                </div>          
            </div>
        </div>
        
      </div>

    
  );

}

export default App;
