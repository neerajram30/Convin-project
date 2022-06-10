import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncUsers, getAllUsers } from '../../store/Users/usersSlice';
function Home() {
 const dispach = useDispatch();

  useEffect(() => {
    dispach(fetchAsyncUsers())
  },[dispach])
  
  const users = useSelector(getAllUsers);

  console.log(users.data);

  return (
    <div>
      <div>
        <h1>Welcome</h1>
      </div>
    </div>
  )
}

export default Home