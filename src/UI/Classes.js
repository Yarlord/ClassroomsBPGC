import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
import SearchTime from './SearchTime';
import { List, ListItem, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    function findEmptyClasses(inputArray, searchString, ){
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

    let str = convertToDTP(day, 11, day_mapping);
    let arr = findEmptyClasses(finalRes, str);

    const groupedClasses = arr.reduce((result, item) => {
        const firstLetter = item[0];
        if (!result[firstLetter]) {
            result[firstLetter] = [];
        }
        result[firstLetter].push(item);
        return result;
    }, {});

    return(
        <div className='main-container'>
            <div>
                <SearchTime onTimeChange = {timeChange} className="searchtime"/>
                
                 <List>
                        {jsonData ? (
                            Object.entries(groupedClasses).map(([letter, items], index) => (
                                <Accordion key={index}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls={`panel${index}a-content`}
                                        id={`panel${index}a-header`}
                                    >
                                        <Typography>{letter}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <List>
                                            {items.map((classItem, subIndex) => (
                                                <ListItem key={subIndex}>
                                                    <Typography>{classItem}</Typography>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )}
                    </List>
                
            </div>
        </div>
    )    
}

export default Classes; 