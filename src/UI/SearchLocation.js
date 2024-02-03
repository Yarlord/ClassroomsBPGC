import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';

function SearchLocation(){

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
        ['1', 'M', 'Monday'],
        ['2', 'T', 'Tuesday'],
        ['3', 'W', 'Wednesday'],
        ['4', 'B', 'Thursday'],
        ['5', 'F', 'Friday'],
        ['6', 'S', 'Saturday']
      ];

    function findDaysGivenClass(inputArray, searchString){
        let res = [];

        for (const item of inputArray) {
            const index = item[1].indexOf(searchString);
            if (index !== -1) {
                res.push(item[0]);
            }
        }

        if (res.length > 0) {
            return res;
        } else {
            return ["No result found!"];
        }
    }

    function convertFromDTP(day_time, day_mapping){
        let res = ""

        for (const item of day_mapping){
            if (item[0]===day_time[0]){
                res+=(item[1]);
            }
        }
        (time>7)?(time = time-7):(time = 100);
        time = time.toString();
        res=res+" "+(time);
        return res;
    }


    // let str = convertToDTP(day, current_time, day_mapping);
    let arr = findDaysGivenClass(finalRes, "DLT5");

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
                
                <h3 className="empty-header"> Available: </h3>
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
    )    
}

export default SearchLocation; 