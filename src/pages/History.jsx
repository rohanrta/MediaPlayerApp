import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteHistoryAPI, getAllHistoryAPI } from '../services/allAPI'
getAllHistoryAPI

const History = () => {
  const [allHistory,setallHistory]=useState([])
  useEffect(()=>{
    getAllHistory()
  },[])
  const getAllHistory = async () => {
      try {
        const result = await getAllHistoryAPI()
        console.log(result);
        if (result.status >= 200 && result.status <= 300) {
          //  console.log(result.data);
          setallHistory(result.data)
  
        }
        else {
          console.log("Api call Failed");
  
        }
  
  
      } catch (e) {
        console.log(e);
      }
    }
    const removeHistory = async(id) =>{
      try{
        await deleteHistoryAPI(id)
        getAllHistory()
      }
      catch(e){
        console.log(e);       
      }
    }
  return (
    <div style={{ paddingTop: '100px' }} className='container'>
      <div className='d-flex justify-content-between container'>
        <h3>Watch History</h3>
        <Link to={'/home'}>Back to Home</Link>
      </div>
      <table className='conatiner my-5 table'>
        <thead>
           <tr>
            <th>#</th>
            <th>Caption</th>
            <th>Link</th>
            <th>Timestamp</th>
            <th><button className='btn'><i class="fa-solid fa-ellipsis-vertical"></i></button></th>
           </tr>
        </thead>
        <tbody>
          {
            allHistory?.length>0?
            allHistory?.map((videoDetail,index)=>(
             <tr key={videoDetail?.id}>
            <td>{index+1}</td>
            <td>{videoDetail?.caption}</td>
            <td>{videoDetail?.youtubeLink}</td>
            <td>{videoDetail?.timeStamp}</td>
            <td><button onClick={()=>removeHistory(videoDetail?.id)} className='btn text-danger'><i class="fa-solid fa-trash "></i></button></td>
            </tr> 
            )):
            <div className='fw-bolder test-danger fs-5'>No Videos are watched yet</div>
          }
          
        </tbody>
      </table>
    </div>
  )
}

export default History