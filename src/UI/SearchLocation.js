import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
import styles from './SearchLocation.css';
import { FaSearch } from "react-icons/fa";
import './fonts.css';

import 'intl';
import 'intl/locale-data/jsonp/en';


import { Container, Typography, Paper, Grid } from '@mui/material';

function SearchLocation(){

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
        ['1', 'M', 'Mon'],
        ['2', 'T', 'Tue'],
        ['3', 'W', 'Wed'],
        ['4', 'B', 'Thu'],
        ['5', 'F', 'Fri'],
        ['6', 'S', 'Sat'],
        ['7', 'S', 'Sun']
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
    const [searchTerm, setSearchTerm] = useState('');
    const handleInput = (event)=>{
        setSearchTerm(event.target.value.toUpperCase());
    }

    let arr = findDaysGivenClass(finalRes, searchTerm);
    // console.log(day_mapping.find((element, shortDay, longDay)=>element==day.toString()));
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
        <div style={{marginBottom:'100px'}}> 
            <input 
            type = "text"
            placeholder="Search classrooms"
            value={searchTerm}
            onChange={handleInput}
            className='search-bar'>
            </input>
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
                                {shortName}
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
                                            <Typography sx={{display:'flex', justifyContent:'center', fontFamily:'Rubik', fontSize:'20px'}}>
                                                {searchTerm}
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