import React from 'react';
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import "./PostCard.css";

const PostCard = () => {
    return (
        <div className='p-2'>
            <div className='post w-60 h-60'>
                <img
                    className='cursor-pointer'
                    src="https://i.pinimg.com/736x/3e/cd/75/3ecd7512b9f39772f421970bd77e9349.jpg"
                    alt=""
                />
                <div className='overlay'>
                    <div className='overlay-text flex justify-between'>
                        <div>
                            <AiFillHeart></AiFillHeart>
                            <span>10M</span>
                        </div>
                        <div>
                            <FaComment></FaComment>
                            <span>2M</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard
