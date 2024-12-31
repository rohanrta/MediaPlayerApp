import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import Wolwerine from '../assets/wolwerine.jpg'
import { removeVideoAPI, saveHistoryAPI } from '../services/allAPI'




const VideoCard = ({setdeleteVideoResponseFromVideoCard,displayData,insideCategory}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = async() => {
    // display modal
    setShow(true)
    // storing history im json
    const {caption,youtubeLink} =displayData
    const sysDateTime = new Date()
    console.log(sysDateTime);
    console.log(sysDateTime.toLocaleString('en-US',{timeZoneName:'short'}));
    const timeStamp=sysDateTime.toLocaleString('en-US',{timeZoneName:'short'})
    const historyDetails = {
      caption,
      youtubeLink,
      timeStamp
    }
    try{
      await saveHistoryAPI(historyDetails)
    }
    catch(e){
      console.log(e);
      
    }
   
    
  };
  const deleteVideo = async (id)=>{
    try{
      const result = await removeVideoAPI(id)
      setdeleteVideoResponseFromVideoCard(result)

    }
    catch(err){
      console.log(err);
      
    }
  }
  const videoCardDragStarted=(e,videoDetails)=>{
    console.log("Inside VideocardDrag Started with videoID:"+videoDetails?.id);
    // share data using event drag start
    e.dataTransfer.setData("videoDetails",JSON.stringify(videoDetails))
  }
  return (
    <><Card draggable={true} onDragStart={e=>videoCardDragStarted(e,displayData)} style={{ width: '13rem' }}>
    <Card.Img onClick={handleShow} height={'150px'} variant="top" src={displayData?.imgUrl} />
    <Card.Body>
      
      <Card.Text className='d-flex justify-content-between'>
        <p>{displayData?.caption}</p>
        {!insideCategory && <button onClick={()=>deleteVideo(displayData?.id)} className='btn'><i class="fa-solid fa-trash text-danger"></i></button>}
      </Card.Text>
     
    </Card.Body>
  </Card>
  <Modal
        size='lg'
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{displayData?.caption}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <iframe width="100%" height="360" src={`${displayData?.youtubeLink}?autoplay=1`} title="Deadpool &amp; Wolverine | Official Trailer | In Theaters July 26"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </Modal.Body>
       
      </Modal>
  </>
  )
}

export default VideoCard