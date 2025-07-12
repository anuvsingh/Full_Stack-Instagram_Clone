import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

function ChangeProfilePic ({ isOpen, onOpen, onClose, handleProfileImageChange }) {
  return (
    <>
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader textAlign={"center"}>Modal Title</ModalHeader>
            <ModalBody>
                <div>
                    <label for="profileImage" className='font-bold py-3 text-blue-600 text-center cursor-pointer text-xs w-full' >Upload Photo</label>
                    <input onChange={handleProfileImageChange} id='profileImage' name='profileImage' type="file" />
                </div>
                <hr />
                <p className='font-bold py-3 text-red-600 text-center'>
                    Remove Photo
                </p>
                <hr />
                <p className='py-3 text-center' onClick={onClose}>
                    Cancel
                </p>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose} >Close</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>
  )
}

export default ChangeProfilePic
