import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import VideoCard from './VideoCard'
import { getAllVideosAPI, saveVideoAPI, updateCategoryAPI } from '../services/allAPI'


const View = ({addResponseFromHome,deleteResponseFromCategory,setdeleteResponseFromView}) => {
  const [deleteVideoResponseFromVideoCard,setdeleteVideoResponseFromVideoCard]=useState("")
  const [allVideos, setallVideos] = useState([])
  useEffect(() => {
    getAllVideos()
  }, [addResponseFromHome,deleteVideoResponseFromVideoCard,deleteResponseFromCategory])
  console.log(allVideos);

  const getAllVideos = async () => {
    try {
      const result = await getAllVideosAPI()
      console.log(result);
      if (result.status >= 200 && result.status <= 300) {
        //  console.log(result.data);
        setallVideos(result.data)

      }
      else {
        console.log("Api call Failed");

      }


    } catch (e) {
      console.log(e);
    }
  }
  const dragOverView = (e) =>{
    e.preventDefault()
  }
  const categoryVideoDragOverView = async(e) =>{
    console.log("inside categoryVideoDragOverView");
    const {video,categoryDetails} = JSON.parse(e.dataTransfer.getData("dragData"))
    console.log(video,categoryDetails);
    const updateCategoryVideoList = categoryDetails?.allVideos?.filter(item=>item.id!=video.id)
    const updateCategory = {...categoryDetails,allVideos:updateCategoryVideoList}
    console.log(updateCategory);
    const result = await updateCategoryAPI(updateCategory)
    setdeleteResponseFromView(result)
    await saveVideoAPI(video)
    getAllVideos()
    // updating the category by delete video from category
    // use state uplifting to communicate data from view to category
    // use Api to upload video
    // call getAllVideos function
  }
  return (
    <>
      <Row droppable="true" onDragOver={dragOverView} onDrop={e=>categoryVideoDragOverView(e)}> 
        {
          allVideos?.length > 0 ?
            allVideos.map(video => (
          <Col key={video?.id} className='mb-3' Col sm = {12} md = {6} lg = {4} >
            <VideoCard setdeleteVideoResponseFromVideoCard={setdeleteVideoResponseFromVideoCard} displayData={video}/>
      </Col>
       ))
        :
        <div className='fw-bolder tezt-danger fs-5'>No Videos are uploaded</div>
      }

    </Row >
    </>
  )
}

export default View