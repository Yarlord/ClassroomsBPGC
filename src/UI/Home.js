import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
import style from './Home.css'
import SearchTime from './SearchTime';
import { List, ListItem, Grid, Container, Stack, Typography, Button, Box } from '@mui/material';
import '../UI/fonts.css';

function Home(){
      



    return(
      <div>
        <Button className="shine" sx={{mt:'200px', backgroundColor:'#282A3A', padding:'10px 20px',}}>
          <Typography sx={{fontSize: '10px', fontFamily: 'Rubik'}}>Available classrooms  </Typography>
          <Typography sx={{fontSize:'20px', }}>&emsp;&gt;&gt;</Typography>

        </Button>
      </div>  
    )    
}

export default Home; 