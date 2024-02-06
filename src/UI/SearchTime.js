import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Styles from './Classes.css';
import { Container } from '@mui/material';

function SearchTime({onTimeChange}){
    const [selectedTimeStart, setSelectedTimeStart] = useState(dayjs().startOf('minute'));
    const [selectedTimeEnd, setSelectedTimeEnd] = useState();
    const [todayStartOfTheDay, setTodayStartOfTheDay] = useState(dayjs().startOf('minute'));

    const timeStart = (time) =>{
        setSelectedTimeStart(time);
        onTimeChange(selectedTimeStart, time);
    }

    const timeEnd = (time) =>{
        setSelectedTimeEnd(time);
        onTimeChange(selectedTimeStart, time);
        console.log(selectedTimeEnd);
    }

    
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container 
            label="TimePicker" 
            sx={{
                display:'flex', 
                position:'relative', 
                mt:'90px',
                textAlign: 'center',
                alignContent:'center',
                }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TimePicker defaultValue={todayStartOfTheDay} 
                    sx={{
                        backgroundColor:'aliceblue',
                        borderRadius:'5px',
                        m: '5px',
                        '& .MuiInputBase-root': {
                        width: '100px', 
                        height:'20px'
                        },
                        '& .MuiInputBase-input': {
                        fontSize: '14px', 
                        },
                        alignSelf: 'center',
                    }} 
                        onChange={timeStart}/>
                    <TimePicker defaultValue={todayStartOfTheDay.add(1,'hour')} 
                    sx={{backgroundColor:'aliceblue', borderRadius:'5px',
                        '& .MuiInputBase-root': {
                            width: '100px',
                            height:'20px'
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '14px', 
                        },alignSelf: 'center',
                        }} 
                    onChange={timeEnd}/>
                </div>
                
            </Container>
        </LocalizationProvider>
        
    )    
}

export default SearchTime; 