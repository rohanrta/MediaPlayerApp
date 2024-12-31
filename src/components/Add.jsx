import React, { useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { saveVideoAPI } from '../services/allAPI';

const Add = ({setaddResponseFromHome}) => {
  const [videoDetail,setvideoDetail]=useState({
    caption:"",
    imgUrl:"",
    youtubeLink:""
  })
  console.log(videoDetail);
  
  const [show, setShow] = useState(false);
  const [invalidYoutubeLink,setinvalidYoutubeLink]=useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const extractEmbedLinkFromYoutubeLink = (userInputYoutubeLink) =>{
    if(userInputYoutubeLink.includes("https://www.youtube.com/watch?v"))
    {
      console.log(userInputYoutubeLink.split("v=")[1].slice(0,11));
     const videoId = userInputYoutubeLink.split("v=")[1].slice(0,11)
     setinvalidYoutubeLink(false)
     setvideoDetail({...videoDetail,youtubeLink:`https://www.youtube.com/embed/${videoId}`})
    }
    else{
      setinvalidYoutubeLink(true)
      setvideoDetail({...videoDetail,youtubeLink:""})
    }
  }
  const handleUploadVideo = async() =>{
    //object destructuring
    const {caption,imgUrl,youtubeLink} = videoDetail
    if(caption&&imgUrl&&youtubeLink){
      try{
         const result = await saveVideoAPI(videoDetail)
         console.log(result);
         if(result.status>=200 && result.status<=300){
          alert("Video Uploaded successfully")
          handleClose()
          // Pass the result to view component
          setaddResponseFromHome(result)
         }
         else{
          console.log(result);
          
         }
      }catch(err){
        console.log(err);
        
      }
    }
    else{
      alert("Please fill the form")
    }
  }
  
  return (
    <>
      <div className='d-flex align-item-center'>
        <h3>Upload New Video</h3>
        <button onClick={handleShow} className='btn btn-warning ms-3 rounded-circle fw-bolder fs-5'>+</button>
      </div>
      {/* Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Uploading Video Details!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='border rounded p-3'>
            
            <FloatingLabel controlId="floatingCaption" label="Video Caption">
              <Form.Control onChange={e=>setvideoDetail({...videoDetail,caption:e.target.value})} type="text" placeholder="Video URL" className='mb-3' />
              
            </FloatingLabel>
            <FloatingLabel controlId="floatingUrl" label="Video Image Url">
              <Form.Control onChange={e=>setvideoDetail({...videoDetail,imgUrl:e.target.value})} type="text" placeholder="Video Image URl" className='mb-3' />
              
            </FloatingLabel>
            <FloatingLabel controlId="floatingLink" label="Video Youtube Link">
              <Form.Control onChange={e=>extractEmbedLinkFromYoutubeLink(e.target.value)}  type="text" placeholder="Video Youtube Link" className='mb-3' />
              
            </FloatingLabel>
            {
              invalidYoutubeLink && <div className='text-danger'>
                invalid Youtube Link
              </div>
            }
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleUploadVideo} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}

export default Add