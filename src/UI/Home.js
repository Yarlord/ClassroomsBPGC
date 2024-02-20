import React, { useState, useEffect, useMemo } from 'react';
import Styles from './Classes.css';
import style from './Home.css'
import SearchTime from './SearchTime';
import { List, ListItem, Grid, Container, Stack, Typography, Button, Box, Dialog, DialogTitle } from '@mui/material';
import '../UI/fonts.css';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import img from './assets/images/avail_class.jpg';

function Home ({buttonVal}){
  const [init, setInit] = useState(false);
  const [particleEngine, setParticleEngine] = useState(null);
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      setParticleEngine(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  
  const particlesLoaded = (container) => {
    console.log(container);
  };
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

    const options = useMemo(
      () => ({
        background: {
          color: {
            value: "#000000",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#fa8635",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: false,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "top",
            enable: true,
            outModes: {
              default: "out",
            },
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }),
      [],
    );
    
    return(
      <div className='main'>
        <h1 className="bpgc-classes">CLASSROOMS</h1>    
        <Particles options={options}/>
        <Grid sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', marginBottom:'100px',}}>
          <Button className="shine" sx={{mt:'200px', backgroundColor:'transparent', padding:'100px 40px', display:'flex', flexDirection:'column', borderRadius: '200%',  position: 'relative', overflow: 'hidden'}} onClick={handleOnClick}>
            <div className="background-overlay"></div>
            <Typography sx={{fontSize: '20px', fontFamily: 'Rubik', color:'white'}}>Available empty<br/> classrooms  </Typography>
            {/* <Typography sx={{fontSize:'10px', fontFamily: 'Playfair',  color:'whitesmoke'}}><br/>Check for empty classes available now</Typography> */}

          </Button>
          {/*<Button className="shine" sx={{mt:'200px', backgroundColor:'#282A3A', padding:'20px 20px', display:'flex', flexDirection:'column'}} onClick={handleOnClickLoc}>
            <Typography sx={{fontSize: '15px', fontFamily: 'Rubik',  color:'whitesmoke'}}>Search Classrooms  &emsp;→</Typography>
            <Typography sx={{fontSize:'10px', fontFamily: 'Playfair',  color:'whitesmoke'}}><br/>Search when specific classes are empty</Typography>

          </Button>*/}
        </Grid>
        <div className='cred'>Vatsal Nadkarni <br/> <div className='cred-dev'> &emsp;&emsp;Developer</div></div>

      </div>  
    )    
}

export default Home; 