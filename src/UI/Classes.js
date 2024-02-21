import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
import SearchTime from './SearchTime';
import { List, ListItem, Accordion, AccordionSummary, AccordionDetails, Typography, Dialog, DialogTitle, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchLocation from './SearchLocation';
import '../UI/fonts.css';

function Classes(){
    const [jsonData, setJsonData] = useState(null);
    useEffect(()=>{
        const fetchData = async()=> {
            try{
                const response = await fetch('./output.json');
                console.log('Response:', response);
                const data = await response.json();
                // console.log('Data:', data);
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

      function findEmptyClasses(dataArray, dtpArray) {
        if (dtpArray.length === 0) {
          return ["Nothing here!"];
        }
        for (let item of dtpArray){
            let index = item.indexOf("-");
            if (index!==-1){
                return ["Nothing here!"];
            }
        }
      
        const resSet = new Set();
      
        for (const [ctp, rooms] of dataArray) {
          if (dtpArray.includes(ctp)) {
            rooms.forEach((room) => resSet.add(room));
          }
        //   console.log(resSet);
        }
      
        if (dtpArray.length > 1) {
          for (let i = 1; i < dtpArray.length; i++) {
            const currentDtp = dtpArray[i];
            const currentRooms = new Set();
      
            for (const [ctp, rooms] of dataArray) {
              if (ctp === currentDtp) {
                rooms.forEach((room) => currentRooms.add(room));
              }
            }
      
            resSet.forEach((room) => {
              if (!currentRooms.has(room)) {
                resSet.delete(room);
              }
            });
          }
        }
        // console.log([...resSet]);
        return [...resSet];
    }
      
    function convertToDTP(day, inputArr, day_mapping){
        let res = [];
        day = String(day);
        let startTime = inputArr[0];
        let endTime = inputArr[1];
        for (const item of day_mapping){
            if (item[0]===(day)){
                // res+=(item[1]);
                day = item[1];
            }
        }
        
        if (inputArr[0]>inputArr[1]){
            res=[];
        }
        else{
            while (endTime>=startTime){
                res.push(day+" "+endTime.toString());
                // console.log(res); 
                endTime=endTime-1;
            }
        }
        return res;
    }   

    const [selectedTimeRange, setSelectedTimeRange]=useState([new Date().getHours()-7, new Date().getHours()-6]);
    const timeChange=(startTime, endTime)=>{
        setSelectedTimeRange([startTime-7, endTime-7]);        
    }
    // console.log(selectedTimeRange);

    let res = convertToDTP(day, selectedTimeRange, day_mapping);
    let arr = findEmptyClasses(finalRes, res);
    const groupedClasses = arr.reduce((result, item) => {
        const firstLetter = item[0];
        if (!result[firstLetter]) {
            result[firstLetter] = [];
        }
        result[firstLetter].push(item);
        return result;
    }, {});

    const [searchValue, setSearchValue] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
  
    const handleDialogOpen = (searchValue) => {
      setSearchValue(searchValue);
      setOpenDialog(true);
    };
    // console.log(searchValue);

  
    const handleDialogClose = () => {
      setOpenDialog(false);
    };
    return(
        <div className='main-container'>
            <div>
                <SearchTime onTimeChange = {timeChange} className="searchtime"/>
                {arr[0]===("Nothing here!" || arr.size()===0)? 
                    (<div>
                        <Typography sx={{color:'white', fontSize:'14px', textAlign:'center', mt:'50px', fontFamily:'monospace'}}>
                            No classes are empty right now :( <br/> Try again later?
                        </Typography>
                        <div className='nothing'>  
                        </div>
                    </div>)
                    :
                    <List sx={{mb:'80px', mt:'10px', maxWidth:'300px'}}>
                        {jsonData ? (
                            Object.entries(groupedClasses).map(([letter, items], index) => (
                                <Accordion key={index} sx={{backgroundColor: '#512B81', border:'2px solid #512B81', borderRadius:'10px', color:'white', mb: '20px', minWidth: '300px'}}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon sx={{color:'white', border:'#BED754 2px solid', borderRadius:'20px'}}/>}
                                        aria-controls={`panel${index}a-content`}
                                        id={`panel${index}a-header`}
                                    >
                                        <Typography sx={{fontFamily: 'Playfair', fontSize: '20px'}}>{(letter==='A'||letter==='C'||letter==='D')?letter+ " Side":(letter==='L'?letter + 'ecture Theatres':(letter==='N'?"No classes found!":letter))}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{backgroundColor:'#35155D', color:'white', borderRadius:'6px'}}>                                        
                                            <List sx={{display:'flex', flexDirection:'column', alignItems:'center',}}>
                                                {items.map((classItem, subIndex) => (
                                                    <ListItem key={subIndex} sx={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                                        <Typography sx={{fontSize: '20px', fontFamily: 'Rubik', display:'flex'}}>{classItem}</Typography>
                                                        <Button sx={{fontSize:'8px', border:'2px solid violet', borderRadius:'10px', padding:'2px 5px', color:'white', fontFamily:'monospace'}}  onClick={() => handleDialogOpen(classItem)}>
                                                            view schedule
                                                        </Button>
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
                
                }                
            </div>
            <Dialog open={openDialog} onClose={handleDialogClose} sx={{backgroundColor:'transparent',}}>
                <DialogTitle sx={{backgroundColor:'#111111', color:'whitesmoke', fontFamily:'Rubik', textAlign:'center'}}>{searchValue}</DialogTitle>
                <SearchLocation searchVal={searchValue}/>
            </Dialog>
        </div>
    )    
}

export default Classes; 