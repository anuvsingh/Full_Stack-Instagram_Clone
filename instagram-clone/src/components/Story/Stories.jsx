import React from 'react'
import { useNavigate } from 'react-router-dom'

const Stories = ({user}) => {

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/story/${user.id}`)
  }

  return (
    <div onClick={handleNavigate} className='cursor-pointer flex flex-col items-center'>
      <img className='w-16 h-16 rounded-full' src={user.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"} alt="" />
      <p>{user.username}</p>
    </div>
  )
}

export default Stories
