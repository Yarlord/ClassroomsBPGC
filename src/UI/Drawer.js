import React, { useState, useEffect } from 'react';
import Styles from './Drawer.css';
import { FaSearchLocation } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { FaHouseUser } from "react-icons/fa";



function Drawer(){
    const [selectedComponent, setSelectedComponent] = useState(null);
    const handleOnClick = (component)=>{
        setSelectedComponent(component);
    }
    

    return(
        <div className="drawer">
            <div className="drawer-details">
                <div className='container'>
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
    )    
}

export default Drawer; 