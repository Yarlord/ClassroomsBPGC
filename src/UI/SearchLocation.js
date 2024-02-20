import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
import styles from './SearchLocation.css';
import { FaSearch } from "react-icons/fa";
import './fonts.css';
import { } from '@mui/material';

import 'intl';
import 'intl/locale-data/jsonp/en';


import { Container, Typography, Paper, Grid, List, ListItem, Stack, Button, Box } from '@mui/material';

const SearchLocation=({searchVal})=>{

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
        ['1', 'M', 'M'],
        ['2', 'T', 'T'],
        ['3', 'W', 'W'],
        ['4', 'B', 'Th'],
        ['5', 'F', 'F'],
        ['6', 'S', 'S'],
        ['7', 'D', 'Su']
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

    // for the search term for the input bar... 
    const [searchTerm, setSearchTerm] = useState('C302');
    useEffect(() => {
        // Update searchTerm when searchValue changes
        setSearchTerm(searchVal);
      }, [searchVal]);
      console.log(searchVal);


    let arr = findDaysGivenClass(finalRes, searchTerm);
    const [sortByDay, setSortByDay] = useState(null);

    const handleHeaderClick = (day) => {
        if (sortByDay === day) {
        setSortByDay(null);
        } else {
        setSortByDay(day);
        }
    };
    const isSortedByDay = (day) => sortByDay === day;

    return(
        <div style={{marginBottom:'0px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}> 
            <div className="clas">
                <div className="classlist-days">
                    <table>
                        <thead>
                        <tr>
                            {day_mapping.map(([numeric, shortName, fullName]) => (
                            <th
                                key={numeric}
                                onClick={() => handleHeaderClick(fullName)}
                                className={isSortedByDay(fullName) ? 'active' : 'passive'}
                            >
                                {fullName[0]}
                            </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {jsonData ? (
                            day_mapping.map(([numeric, shortName, fullName]) => (
                            <tr key={numeric}>
                                {isSortedByDay(fullName) ? (
                                // Display times for the sorted day
                                <td colSpan={day_mapping.length} className="rect1"> 
                                    {arr
                                        .filter(item => item.includes(shortName))
                                        .sort((a, b) => {
                                            const timeA = Number(a.split(' ')[1]) + 7;
                                            const timeB = Number(b.split(' ')[1]) + 7;
                                            return timeA - timeB;
                                        })
                                        .map((item, index) => (
                                            <p key={index} className="rect">{Number(item.split(' ')[1])+7+":00"}
                                            <br/>
                                            <Typography sx={{display:'flex', justifyContent:'center', fontFamily:'DM', fontSize:'18px'}}>
                                                 {searchTerm} available 
                                            </Typography>
                                            {Number(item.split(' ')[1])+8+":00"}</p>
                                        ))
                                    }
                                </td>
                                ) : (
                                day_mapping.map((day) => <td key={day[0]}></td>)
                                )}
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td colSpan={day_mapping.length}>Loading...</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </div>
              
            </div>
        </div>
    )    
}

export default SearchLocation; 