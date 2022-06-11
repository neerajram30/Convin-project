import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncUsers, getAllUsers } from '../../store/Users/usersSlice';
import axios from 'axios'
import './Home.css'


function Home() {
  const dispach = useDispatch();
  const [user,setUser] =useState([]) 
  const [isUser,setIsUser] =useState(false)
 
  useEffect(() => {
    dispach(fetchAsyncUsers())
  },[dispach])
  
  const users = useSelector(getAllUsers);
  const response = users.data
  // console.log(response);

  function handleClick(id){

    axios.get(`https://reqres.in/api/users/${id}`)
  .then((response)=> {
    setUser(response.data.data)
    setIsUser(true);
    // console.log(response.data.data);
  })
  .catch((error)=> {
    console.log(error);
  })
  }

  console.log(user);

  return (
    <div className='homeContainer'>
      <div className='btnOuter'>
      <div className='btnContainer'>
        {response && 
        response.map((user,i)=>
        <div key={i}>
          <button onClick={()=>{handleClick(user.id)}} className="btns">{user.id}</button>
        </div>  
        )
      }
      </div>
      </div>
      <div className='cardContainer'>
       { isUser?
       
       
       user &&
        (<div className='usercard'>
         <div className="imgContainer">
       <img src={user.avatar} alt='avatar' />
         </div>
         <div className='contents'>

       <h3>{user.first_name} {user.last_name}</h3>
       <p>{user.email}</p>
         </div>
       </div>):
       (
        <div className='usercard'>
         <div className="imgContainer">
         </div>
         <div style={{color:'white'}}>
       <p>Click any button</p>
         </div>
       </div>
       )
    
      }
      </div> 

    </div>
  )
}

export default Home