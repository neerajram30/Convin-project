import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncUsers, getAllUsers } from '../../store/Users/usersSlice';
import axios from 'axios'
import './Home.css'
import { RotatingSquare } from 'react-loader-spinner'
import { ThreeCircles} from 'react-loader-spinner'
import Fade from 'react-reveal/Fade';


function Home() {
  const dispach = useDispatch();
  const [user,setUser] =useState([]) 
  const [isUser,setIsUser] =useState(false)
  const [loading,setLoading] = useState(false);
  const [cardloading,setCardLoading] = useState(false);
 
  useEffect(() => {
    dispach(fetchAsyncUsers())

    setTimeout(() => {
      setLoading(true);
    }, 4000);
  },[dispach])
  
  const users = useSelector(getAllUsers);
  const response = users.data
  // console.log(response);

  function handleClick(id){
      setCardLoading(true)
    axios.get(`https://reqres.in/api/users/${id}`)
  .then((response)=> {
    setUser(response.data.data)
    setIsUser(true);
    setCardLoading(false)
    // console.log(response.data.data);
  })
  .catch((error)=> {
    console.log(error);
  })
  }

  console.log(user);

  return (
    <div>
{!loading ?
<span className='loader'>
<RotatingSquare ariaLabel="rotating-square" visible={true} color="white" />
</span>:


    <div className='homeContainer'>
      <div className='btnOuter'>
      <div className='btnContainer'>
        {response && 
        response.map((user,i)=>
        <Fade>
        <div key={i}>
          <button onClick={()=>{handleClick(user.id)}} className="btns">{user.id}</button>
        </div>  
        </Fade>
        )
      }
      </div>
      </div>
      <div className='cardContainer'>

       {cardloading ?
       <span className='cardloading'>
         <ThreeCircles
  color="red"
  width={20}
  ariaLabel="three-circles-rotating"
/>
       </span>:
       
       
       isUser?
       
       
       user &&
        (
        <Fade>

        <div className='usercard'>
         <div className="imgContainer">
       <img src={user.avatar} alt='avatar' />
         </div>
         <div className='contents'>

       <h3>{user.first_name} {user.last_name}</h3>
       <p>{user.email}</p>
         </div>
       </div>
        </Fade>
       ):
       (
         <Fade>
           
        <div className='usercard'>
         <div className="imgContainer">
         </div>
         <div style={{color:'white'}}>
       <p>Click any button</p>
         </div>
       </div>
         </Fade>
       )
       
      }
      </div> 

    </div>}
      </div>
  )
}

export default Home