import { Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FaPhotoVideo } from "react-icons/fa";
import './CreatePost.css';
import { GrEmoji } from "react-icons/gr";
import { GoLocation } from "react-icons/go";
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../redux/Post/Action';
import { uploadCloudinary } from '../Config/UploadCloudinary';

const CreatePost = ({
  onClose, isOpen
}) => {

  const [isDragOver, setIsDragOver] = useState(false);
  const [file, setFile] = useState();
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const token = localStorage.getItem("token")

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    setIsDragOver(true);
  }
  const handleDragLeave = () => {
    setIsDragOver(false);
  }
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/")) {
      setFile(droppedFile);
    }
  }

  const handleonChange = async (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {
      const imageUrl = await uploadCloudinary(file)
      setImageUrl(imageUrl)
      setFile(file);
      console.log("file:", file)
    } else {
      setFile(null);
      alert("please select an image or video")
    }
  }

  const handleCaptionChange = (e) => {
    setCaption(e.target.value)
  }

  const handleCreatePost = () => {
    const data = {
      jwt: token,
      data:{
        caption, 
        location, 
        image: imageUrl
      }
    }
    dispatch(createPostAction(data));
    onClose()
  }

  return (
    <div>
      <Modal size='4xl' onClose={onClose} isOpen={isOpen} isCentered blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent>
          <div className='flex justify-between py-1 px-10 items-center'>
            <p>Create new Post</p>
            <button
              as="button"
              className=''
              style={{ color: 'blue' }}
              variant={"ghost"}
              size="sm"
              colorScheme={'blue'}
              onClick={handleCreatePost}>
              Share
            </button>
          </div>
          <hr />
          <ModalBody>
            <div className='h-[70vh] justify-between pb-5 flex'>
              <div className='w-[50%]'>
                {!file && <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className='drag-drop h-full'
                >
                  <div>
                    <FaPhotoVideo className='text-3xl' />
                    <p>Drag photos or videos here</p>
                  </div>
                  <label htmlFor="file-upload" className='custom-file-upload'>Select from Files</label>
                  <input className='fileInput' type="file" id='file-upload' accept='image/*, video/*' onChange={handleonChange} />
                </div>}
                {file && <img className='max-h-full' src={URL.createObjectURL(file)} alt="" />}
              </div>
              <div className='w-[1px] border h-full'></div>
              <div className='w-[50%]'>
                <div className='flex items-center px-2'>
                  <img className='w-7 h-7 rounded-full' src="https://i.pinimg.com/736x/53/4a/4a/534a4adddc9199aec7b0125221b7ff1a.jpg" alt="" />
                  <p className='font-semibold ml-4'>username</p>
                </div>
                <div className='px-2'>
                  <textarea
                    className='captionInput'
                    name="caption"
                    rows="8"
                    placeholder='Write a Caption'
                    onChange={handleCaptionChange}
                  ></textarea>
                </div>
                <div className='flex justify-between px-2'>
                  <GrEmoji />
                  <p className='opacity-70'>{caption?.length} /2, 200</p>
                </div>
                <hr />
                <div className='flex p-2 justify-between items-center'>
                  <input onChange={(e) => setLocation(e.target.value)} className='locationInput' type="text" placeholder='Add Location' name='location' />
                  <GoLocation />
                </div>
                <hr />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default CreatePost
