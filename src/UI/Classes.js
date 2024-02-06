import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
import SearchTime from './SearchTime';

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

    let day = new Date().getDay();
    let current_time = new Date().getHours();
    let finalRes=[];
    jsonData?finalRes=jsonData:finalRes=[]; 

    const day_mapping = [
        ['1', 'M'],
        ['2', 'T'],
        ['3', 'W'],
        ['4', 'B'],
        ['5', 'F'],
        ['6', 'S']
      ];

    function findEmptyClasses(inputArray, searchString){
        for (const item of inputArray){
            if (item[0]===searchString){
                return item[1] || [];
            }
        }
        return ["No classes found!"];
    }

    function convertToDTP(day, time, day_mapping){
        let res = ""
        day = String(day);
        for (const item of day_mapping){
            if (item[0]===(day)){
                res+=(item[1]);
            }
        }
        (time>7)?(time = time-7):(time = 100);
        time = time.toString();
        res=res+" "+(time);
        return res;
    }
    let str = convertToDTP(day, current_time, day_mapping);
    let arr = findEmptyClasses(finalRes, str);

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    


    const [selectedTimeRange, setSelectedTimeRange]=useState('');
    const timeChange=(startTime, endTime)=>{
        console.log("This is the start time :",startTime, endTime);
        console.log("This is the start time :",endTime);
        setSelectedTimeRange({
            start: startTime,
            end: endTime,
        });
        console.log(selectedTimeRange);
        
    }
    let curr_hours = new Date().getHours();
    let curr_minutes = new Date().getMinutes();
    return(
        <div className='main-container'>
            <div>
                <div className="classlist">
                    <SearchTime onTimeChange = {timeChange} className="searchtime"/>
                    <h3 className="empty-header">Currently Available:</h3>
                    <div className='container'>
                        {jsonData ? (
                            <div>
                            {arr.map((item,index) => (
                                <div key={index}>                            
                                <div className='avail-classes'>
                                    {
                                    <p>{item}</p>
                                    }
                                </div>
                                </div>
                            ))}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
                
            </div>
        </div>
    )    
}

export default Classes; 