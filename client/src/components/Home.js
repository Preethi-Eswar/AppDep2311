import React from 'react';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {

  let navigate = useNavigate();

    let storeObj = useSelector((store)=>{
        console.log(store);
        return store;
    });

    let deleteAccount = async(req,res)=>{


      let dataToSend = new FormData();
      dataToSend.append("email",storeObj.userDetails.email);
let reqOptions = {

  method:"DELETE",
  body:dataToSend,
}

      let JSONData = await fetch("http://localhost:1234/deleteProfile",reqOptions);
      let JSData = await JSONData.json();
      alert(JSData.msg);

      if(JSData.status == "success"){
       navigate("/");
      }



      console.log(JSData);
    }
  return (
    <div className='App'>
        <TopNavigation/>
        <h1>Home</h1>
        <h3>{`${storeObj.loginReducer.userDetails.firstName}${storeObj.loginReducer.userDetails.lastName}`}</h3>
        <img src ={`http://localhost:1234/${storeObj.loginReducer.userDetails.profilePic}`}/>

        <button type="button" onClick={()=>{
          deleteAccount();
        }}>Delete Account</button>
    </div>
  )
}

export default Home