import React, { useEffect } from 'react'
import StoryViewer from '../../components/Stories/StoryViewer'
import { findStoryByUserId } from '../../redux/Story/Action'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const Story = () => {

  const { userId } = useParams();
  const jwt = localStorage.getItem("token");
  const dispatch = useDispatch();
  const { story } = useSelector(store => store);
   
    useEffect(() => {
      const data = { jwt, userId };
      dispatch(findStoryByUserId(data));
    }, [userId])

  return (
    <div>
      <StoryViewer stories={story?.stories} />
    </div>
  )
}

export default Story
