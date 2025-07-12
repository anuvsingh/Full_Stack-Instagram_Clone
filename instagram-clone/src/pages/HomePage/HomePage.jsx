import React, { useEffect, useState } from 'react';
import Stories from '../../components/Story/Stories';
import HomeRight from '../../components/Home Right/HomeRight';
import Post from '../../components/Post/Post';
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { findUserPostAction } from '../../redux/Post/Action';
import { findUserByUserIdsAction, getPopularUser, getUserProfileAction } from '../../redux/User/Action';
import { hasStory } from '../../components/Config/Logics';

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userIds, setUserIds] = useState();
  const [user, post] = useSelector((store) => store)
  const token = localStorage.getItem("token")

  const dispatch = useDispatch();

  useEffect(() => {
    const newIds = user.reqUser?.following?.map((user) => user.id)
    setUserIds([user.reqUser?.id, ...newIds]);
  }, [user.reqUser]);

  useEffect(() => {
    const data = {
      jwt: token,
      userIds: [userIds].join(",")
    }
    dispatch(findUserPostAction(data));
    dispatch(findUserByUserIdsAction(data));
    dispatch(getPopularUser(token));
  }, [userIds, post.createdPost, post.deletedPost]);

  useEffect(() => {
    dispatch(getUserProfileAction(token))
  }, [token])

  const storyUsers = hasStory(user.findUserByIds)

  return (
    <div>
      <div className='mt-10 flex w-[100%] justify-center'>
        <div className='w-[44%] px-10'>
          <div className='storyDiv flex space-x-2 border p-4 rounded-md justify-start w-full'>
            {storyUsers.length > 0 && storyUsers.map((item) => (
              <Stories user={item} />
            ))}
          </div>
          <div className='space-y-10 w-full mt-10'>
            {post.usersPost.length > 0 && post.usersPost.map((item) => <Post post={item} />)}
          </div>
        </div>
        <div class="w-[30%]">
          <HomeRight />
        </div>
      </div>
    </div>
  )
}

export default HomePage
