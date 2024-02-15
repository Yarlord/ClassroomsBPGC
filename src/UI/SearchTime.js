import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Styles from './Classes.css';
import { Container } from '@mui/material';

function SearchTime({onTimeChange}){
    const [todayStartOfTheDay, setTodayStartOfTheDay] = useState(dayjs().startOf('minute'));

    const [selectedTimeStart, setSelectedTimeStart] = useState(dayjs());
    const [selectedTimeEnd, setSelectedTimeEnd] = useState(dayjs().add(1, 'hour'));

    const handleTimeChangeStart = (time) => {
        setSelectedTimeStart(time);
        // setSelectedTimeEnd(time.add(1,"hour"));
        // console.log(time["$H"]);
        onTimeChange(time["$H"], selectedTimeEnd["$H"]);
    };

    const handleTimeChangeEnd = (time) => {
        setSelectedTimeEnd(time);
        // console.log(time["$H"]);
        onTimeChange(selectedTimeStart["$H"], time["$H"]);
    };
        
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container 
            label="TimePicker" 
            sx={{
                display:'flex', 
                position:'relative', 
                mt:'10px',
                textAlign: 'center',
                alignContent:'center',
                }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TimePicker value={todayStartOfTheDay} 
                    sx={{
                        backgroundColor:'#940B92',
                        borderRadius:'5px', 
                        m: '7px',
                        '& .MuiInputBase-root': {
                            width: '130px', 
                            height:'40px',
                            color:'white',
                        },
                        '& .MuiInputBase-input': {
                        fontSize: '14px', 
                        },
                        
                        alignSelf: 'center',
                        textAlign: 'center',
                    }} 
                        onChange={handleTimeChangeStart}/>
                    <TimePicker value={dayjs().startOf('hour').add(59, 'minute')} 
                    sx={{backgroundColor:'#940B92', borderRadius:'5px', m: '7px',
                        '& .MuiInputBase-root': {
                            width: '130px',
                            height:'40px',
                            color:'white',
                        },
                        '& .MuiInputBase-input': {
                            fontSize: '14px', 
                        },alignSelf: 'center',
                        }} 
                    onChange={handleTimeChangeEnd}/>
                </div>
                
            </Container>
        </LocalizationProvider>
        
    )    
}

export default SearchTime; 