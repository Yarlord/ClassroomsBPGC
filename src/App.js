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
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
// import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

function App() {
  // const [init, setInit] = useState(false);
  // const [particleEngine, setParticleEngine] = useState(null);
  // // this should be run only once per application lifetime
  // useEffect(() => {
  //   initParticlesEngine(async (engine) => {
  //     //await loadAll(engine);
  //     //await loadFull(engine);
  //     await loadSlim(engine);
  //     setParticleEngine(engine);
  //     //await loadBasic(engine);
  //   }).then(() => {
  //     setInit(true);
  //   });
  // }, []);
  
  // const particlesLoaded = (container) => {
  //   console.log(container);
  // };


  // const [time, setTime] = useState(new Date());
  // // console.log(time);
  // useEffect(() => {
  //       const interval = setInterval(() => {
  //         setTime(new Date());
  //       }, 1000);
  //       return () => clearInterval(interval);
  // }, []);

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
                            <FaHouseUser/>
                            <p className='icon-text'>Home</p>
                        </div>

                        <div className='search-class' onClick={()=>handleOnClick('searchLocation')}>
                            <FaSearchLocation/>
                            <p className='icon-text'>Classes</p>
                        </div>

                        <div className='search-class' onClick={()=>handleOnClick('searchDate')}>
                            <FaCalendar/>
                            <p className='icon-text'>Today</p>
                        </div>
                        
                    </div>
                </div>          
            </div>
        </div>
        
      </div>

    
  );

}

export default App;
