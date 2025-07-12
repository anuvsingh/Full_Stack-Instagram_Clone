import React, { useState, useSelector, useEffect } from 'react';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { isCommentLikedByUser, timeDifference } from '../Config/Logics';
import { useDispatch } from 'react-redux';
import { likeCommentAction, unlikeCommentAction } from '../../redux/Comment/Action';

const CommentCard = ({ comment }) => {
  const [isCommentLike, setIsCommentLike] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token")
  const { user } = useSelector((store) => store)

  const data = {
    commentId: comment.id,
    jwt: token
  }

  const handleLikeComment = () => {
    setIsCommentLike(true)
    dispatch(likeCommentAction(data))
  }
  const handleUnlikeComment = () => {
    setIsCommentLike(false)
    dispatch(unlikeCommentAction(data))
  }
  useEffect(() => {
    setIsCommentLike(isCommentLikedByUser(comment, user.reqUser.id))
  }, [user.reqUser])

  return (
    <div>
      <div className='flex items-center justify-between py-5'>
        <div className='flex items-center'>
          <div>
            <img
              className='w-9 h-9 rounded-full'
              src={comment.userDto.userImage || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
              alt="" />
          </div>
          <div className='ml-3'>
            <p>
              <span className='font-semibold'>{comment?.userDto.username}</span>
              <span className='ml-2'>{comment.content}</span>
            </p>
            <div className='flex items-center space-x-3 text-sm opacity-60 pt-2'>
              <span>{timeDifference(comment?.createdAt)}</span>
              {comment?.likedByUsers?.length > 0 && <span>{comment?.likedByUsers?.length} likes</span>}
            </div>
          </div>
        </div>

        {isCommentLike ? <AiFillHeart onClick={handleUnlikeComment} className='text-xs hover:opacity-50 cursor-pointer text-red-600' /> : <AiOutlineHeart onClick={handleLikeComment} className='text-xs hover:opacity-50 cursor-pointer' />}
      </div>
    </div>
  )
}

export default CommentCard
