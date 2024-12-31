import React, { useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap'
import VideoCard from './VideoCard';
import { deleteCategoryAPI, getAllCategoryAPI, getAllVideosAPI, removeVideoAPI, saveCategoryAPI, updateCategoryAPI } from '../services/allAPI';

const Category = ({setdeleteResponseFromCategory,deleteResponseFromView}) => {
  const [allCategories,setallCategories]=useState([])
  const[categoryName,setcategoryName]=useState("")
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    getAllCategories()
  },[deleteResponseFromView])
  
  const removeCategory =async (id) =>{
    try {
      await deleteCategoryAPI(id)
      getAllCategories()
      
    } catch (error) {
      console.log(error);
      
      
    }
  }
  const handleSaveCategory = async() =>{
    if(categoryName){
       const categoryDetails={categoryName,allVideos:[]}
       try {
        const res = await saveCategoryAPI(categoryDetails)
        if(res.status>=200 && res.status<300){
          alert("Category Created")
        getAllCategories()
        handleClose()
        }
        
       } catch (error) {
        console.log(error);
       }
    }
    else{
      alert("Please Provide a Catgory name")
    }
  }
  const getAllCategories = async() =>{
    try {
      const res = await getAllCategoryAPI()
      if(res.status>=200 && res.status<300){
        setallCategories(res.data)
      }
      
    } catch (error) {
      console.log(error);
      
      
    }
  }
  const videoCardDropOverCategory = async(e,categoryDetail)=>{
    console.log(`Inside videoCardDRopOverCategory`);
    // console.log(categoryDetail);
   const videoDetails = JSON.parse(e.dataTransfer.getData("videoDetails"))
  console.log(videoDetails);
  categoryDetail.allVideos.push(videoDetails)

  // api call to update the category
  await updateCategoryAPI(categoryDetail)
  getAllCategories()
  const result=await removeVideoAPI(videoDetails?.id)
  setdeleteResponseFromCategory(result)
}
  const dragOverCategory =  (e) =>{
    e.preventDefault()
  }
 const categoryVideoDragStarted =(e,dragVideoDetails,categoryDetails)=>{
  console.log("Inside categoryVideoDragStarted");
  
  let dragData ={video:dragVideoDetails,categoryDetails}
  e.dataTransfer.setData("dragData",JSON.stringify(dragData))
 }
  console.log(allCategories);
  return (
    <>
    <div className='d-flex justify-content-between align-items-center'>
      <h3>All Categories</h3>
      <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
      
    </div>
    <div className='container-fluid mb-3'>
      {/* single Category View */}
      {
        allCategories?.length>0 ?
        allCategories?.map(categoryDetails=>(
          <div droppable="true" onDragOver={dragOverCategory} onDrop={e=>videoCardDropOverCategory(e,categoryDetails)} key={categoryDetails?.id} className='border rounded p-3 mb-3'>
        <div className='d-flex justify-content-between'>
          <h5>{categoryDetails?.categoryName}</h5>
          <button onClick={()=>removeCategory(categoryDetails?.id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>
        </div>
        {/* display category */}
        <div className="row mt-2">
{
  categoryDetails?.allVideos?.length>0 &&
   categoryDetails?.allVideos?.map(video=>(

    <div key={video?.id} className="col lg-4" draggable={true} onDragStart={e=>categoryVideoDragStarted(e,video,categoryDetails)}>
            <VideoCard insideCategory={true} displayData={video}/>
    </div>
   ))
}


        </div>
      </div>
        )):
        <div className='fw-bolder text-danger fs-5'>No Categories are added yet</div>
      }

    </div>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId="floatingCategoryName" label="Category Name">
        <Form.Control onChange={e=>setcategoryName(e.target.value)} type="text" placeholder="Category Name" />
      </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveCategory}  variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      </>
    
    
    
  )
}

export default Category