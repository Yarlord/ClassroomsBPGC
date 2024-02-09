import React, { useState, useEffect } from 'react';
import Styles from './Classes.css';
import styles from './SearchLocation.css';
import { FaSearch } from "react-icons/fa";
import levenshtein from 'fast-levenshtein';

function SearchLocation(){

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


    // function fuzzySearch(query, target, tolerance) {
    //     const distance = levenshtein.get(query.toLowerCase(), target.toLowerCase());
    //     return distance <= tolerance;
    // }

    
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
        ['6', 'S', 'Sat']
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

    // function convertFromDTP(arr, day_mapping){
    //     let res = [];

    //     for (let item of arr){
    //         let str="";
    //         let time = item.slice(2);
    //         let day = item.charAt(0);
    //         for (const mapper of day_mapping){
    //             if (day===mapper[1]){
    //                 str = day.replace(day, mapper[2]);
    //                 // console.log(str);
    //             }
    //         }      
    //         time = Number(time);
    //         time += 7;
    //         let time_2 = time+1;
    //         let time_str = time.toString()+":00-"+time_2.toString()+":00";
    //         str= str + " "+ time_str;
    //         // res(str);
    //         // console.log(str);
    //         res.push(str);
    //     }
    //     return res;
    // }

    const [searchTerm, setSearchTerm] = useState('');
    const handleInput = (event)=>{
        setSearchTerm(event.target.value);
    }

    let arr = findDaysGivenClass(finalRes, searchTerm);
    // arr = convertFromDTP(arr, day_mapping);
    // console.log(arr);


    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
          setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    

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
        <div>
            <input 
            type = "text"
            placeholder="Search classrooms"
            value={searchTerm}
            onChange={handleInput}
            className='search-bar'>
            </input>
            <div className="hi">
                {/* <h3 className="empty-header"> Available: </h3> */}

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
                                {fullName}
                            </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {jsonData ? (
                            // Render table rows based on sorted day
                            day_mapping.map(([numeric, shortName, fullName]) => (
                            <tr key={numeric}>
                                {isSortedByDay(fullName) ? (
                                // Display times for the sorted day
                                <td colSpan={day_mapping.length}>
                                    {arr.map((item, index) =>
                                    item.includes(shortName) ? (
                                        <p key={index}>{item.split(' ')[1]}</p>
                                    ) : null
                                    )}
                                </td>
                                ) : (
                                // Display empty cells for other days
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