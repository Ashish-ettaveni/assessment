import React,{ useState, useEffect } from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate'
import '../styles.css'
import {sortDataByDate , sortDataByTime ,formatTime} from "./Sort.js"



export const Ttable = () => {

    const [data,setData] = useState([{}]);
    const [search,setSearch]=useState("");
    const [originalData, setOriginalData] = useState([{}]);
    const [currentPage, setCurrentPage] = useState(0);
    const recordsPerPage = 20;
 
    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response =await axios.get('http://localhost:5000/getData');
                console.log(response.data)
                const fetchedData = response.data || [];
                setData(fetchedData);
                setOriginalData(fetchedData); 
                setCurrentPage(0);

            }catch (error) {
               console.log(error);
        }
    };
        fetchData();
    },[search]);

    const pageCount = Math.ceil(data.length / recordsPerPage);


//Functions to handle the sorting 
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const handleSortByDate = (ascending) => {
    const sortedData = sortDataByDate(data, ascending);
    setData(sortedData);
  };

  const handleSortByTime = (ascending) => {
    const sortedData = sortDataByTime(data, ascending);
    setData(sortedData);
  };

  const handleReset = () => {
    setSearch("");
    setCurrentPage(0);
    setData(originalData);
  };
 

  const displayData = data
  .filter((item) =>
    search.toLowerCase() === '' ? true :
      (item.customername.toLowerCase().includes(search.toLowerCase())) ||
      (item.locatio.toLowerCase().includes(search.toLowerCase()))
  )
  .slice(currentPage * recordsPerPage, (currentPage + 1) * recordsPerPage)
  .map((row) => (
    <tr key={row.sno}>
      <td>{row.customername}</td>
      <td>{row.age}</td>
      <td>{row.phone}</td>
      <td>{row.locatio}</td>
      <td>{new Date(row.created_at).toLocaleDateString()}</td>
      <td>{formatTime(row.created_at)}</td>
    </tr>
  ));



  return (
    <div>
        <h1 className='headingg'>Zithara Technologies Assessment </h1>
        <form>
            <input onChange= {(e)=> setSearch(e.target.value)} placeholder='Search names or Locations'>
            </input>
        </form>
        <button className='sort-button' onClick={() => handleSortByDate(true)}>Sort by Date (Asc)</button>
      <button className='sort-button' onClick={() => handleSortByDate(false)}>Sort by Date (Desc)</button>
      <button className='sort-button' onClick={() => handleSortByTime(true)}>Sort by Time (Asc)</button>
      <button className='sort-button' onClick={() => handleSortByTime(false)}>Sort by Time (Desc)</button>
      <button className='reset-button' onClick={() => handleReset()}>Reset</button>
        <table>
            <thead>
                <tr>
                    <th>CustomerName</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>
            <tbody>{displayData}</tbody>
            
        </table>
        <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      <tfooter><h3 className='headingg'>Ettaveni Ashish</h3></tfooter>
    </div>
  )
}
