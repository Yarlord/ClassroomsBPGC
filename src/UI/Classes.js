import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
// import Details from "./classes-info";

function Classes(){
    const [jsonData, setJsonData] = useState(null);
    useEffect(()=>{
        const fetchData = async()=> {
            try{
                const response = await fetch('./output.json');
                console.log('Response:', response);
                const data = await response.json();
                console.log('Data:', data);
                setJsonData(data);
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    
    return(
        <div className="class-container">
            <div className="classlist">
                
                <h3 className="empty-header">Currently Available: </h3>
                <div>
                    <h1>JSON Data:</h1>
                    {jsonData ? (
                        <div>
                        {jsonData.map((item, index) => (
                            <div key={index}>
                            <h2>{item[0]}</h2>
                            <ul>
                                {item[1].map((classItem, classIndex) => (
                                <li key={classIndex}>{classItem}</li>
                                ))}
                            </ul>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
              
        </div>
    )    
}

export default Classes; 