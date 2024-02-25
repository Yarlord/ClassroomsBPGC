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
    const [selectedTimeEnd, setSelectedTimeEnd] = useState(dayjs().startOf('hour').add(59, 'minute'));

    const handleTimeChangeStart = (time) => {
        setSelectedTimeStart(time);
        setSelectedTimeEnd(time.startOf('hour').add(59, 'minute'));
        // console.log(time["$H"]);
        onTimeChange(time["$H"], time["$H"]+1);
    };

    const handleTimeChangeEnd = (time) => {
        setSelectedTimeEnd(time);
        // console.log(time["$H"]);
        onTimeChange(selectedTimeStart["$H"], time["$H"]);
    };
    console.log("start ",selectedTimeStart);
    console.log("end ", selectedTimeEnd);
        
    return(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container 
            label="TimePicker" 
            sx={{
                display:'flex', 
                position:'relative', 
                mt:'19px',
                textAlign: 'center',
                alignContent:'center',
                }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TimePicker value={todayStartOfTheDay} 
                    sx={{
                        backgroundColor:'#101010',
                        borderRadius:'5px',
                        border: '1px solid hsla(0,0%,100%,.5)', 
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
                    <TimePicker value={selectedTimeStart.startOf('hour').add(59, 'minute')} 
                    sx={{backgroundColor:'#101010', borderRadius:'5px', m: '7px',
                    border:'1px solid hsla(0,0%,100%,.5)',
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