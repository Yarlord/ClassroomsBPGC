import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
import style from './Home.css'
import SearchTime from './SearchTime';
import { List, ListItem, Grid, Container, Stack, Typography, Button, Box } from '@mui/material';
import '../UI/fonts.css';

function Home ({buttonVal}){
      

    // console.log(buttonVal);
    // const component = props.buttonVal; 
    const [component,setComponent] = useState('home');
    const handleOnClick = (component) =>{
      setComponent('searchDate');
      buttonVal('searchDate');
      console.log(component);
    }
    const handleOnClickLoc = (component) =>{
      setComponent('searchLocation');
      buttonVal('searchLocation');
      console.log(component);
    }

    return(
      <div>
        <Grid sx={{display:'flex', flexDirection:'column', gap:'2px'}}>
          <Button className="shine" sx={{mt:'200px', backgroundColor:'#282A3A', padding:'10px 20px',}} onClick={handleOnClick}>
            <Typography sx={{fontSize: '10px', fontFamily: 'Rubik'}}>Available classrooms  </Typography>
            <Typography sx={{fontSize:'20px', }}>&emsp;&gt;&gt;</Typography>

          </Button>
          <Button className="shine" sx={{mt:'200px', backgroundColor:'#282A3A', padding:'10px 20px',}} onClick={handleOnClickLoc}>
            <Typography sx={{fontSize: '10px', fontFamily: 'Rubik'}}>Search Classrooms  </Typography>
            <Typography sx={{fontSize:'20px', }}>&emsp;&gt;&gt;</Typography>

          </Button>
        </Grid>
        
      </div>  
    )    
}

export default Home; 