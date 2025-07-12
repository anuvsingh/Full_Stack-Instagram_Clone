import React, { useEffect } from 'react';
import './Search.css';
import SearchCard from './SearchCard';
import { useDispatch, useSelector } from 'react-redux'
import { searchUserAction } from '../../redux/User/Action';

const Search = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector(store => store);

  // dispatch(searchUserAction())

  const handleSearch = (e) => {
    dispatch(searchUserAction({ jwt: token, query: e.target.value }))
  }

  return (
    <div className='searchContainer'>
      <div className='px-3 pb-5'>
        <h1 className='text-xl pb-5'>Search</h1>
        <input onChange={handleSearch} className='searchInput' type="text" placeholder='Search...' />
      </div>

      <hr />

      <div className='px-3 pt-5'>
        {user.searchUser?.map((item) => <SearchCard user={item} />)}
      </div>
    </div>
  )
}

export default Search
