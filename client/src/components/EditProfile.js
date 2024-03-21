import React, { useEffect, useRef , useState } from 'react';
import { Link } from 'react-router-dom';

import TopNavigation from './TopNavigation'
import { useSelector } from 'react-redux';

function EditProfile() {
  let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileInputRef = useRef();
    let profileInputRef = useRef();

    let [profilePic,setProfilePic] = useState("./images/no image.jpg");
  let storeObj = useSelector((store)=>{return store});
  useEffect(()=>{

  firstNameInputRef.current.value = storeObj.loginReducer.userDetails.firstName;
  lastNameInputRef.current.value = storeObj.loginReducer.userDetails.lastName;
  ageInputRef.current.value = storeObj.loginReducer.userDetails.age;
  emailInputRef.current.value = storeObj.loginReducer.userDetails.email;
  mobileInputRef.current.value = storeObj.loginReducer.userDetails.mobile;
  setProfilePic(`http://localhost:1234/${storeObj.loginReducer.userDetails.profilePic}`);
 
  },[]);


    
     let OnSignupUsingFD =async ()=>{

        let dataToSend = new FormData();
        dataToSend.append("firstName",firstNameInputRef.current.value);
        dataToSend.append("lastName",lastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobile",mobileInputRef.current.value);

        for(let i= 0;i<profileInputRef.current.files.length;i++){
            dataToSend.append("profilePic",profileInputRef.current.files[i]);

        }

        

        let reqOptions ={
            method:"POST",
            body:dataToSend,
        };
        let JSONData = await fetch("http://localhost:1234/signup",reqOptions);
        let JSData = await JSONData.json();
        alert(JSData.msg);
        console.log(JSData);
     };


let sendUpdatedProfilePic = async (req,res)=>{
 
  let dataToSend = new FormData();
  dataToSend.append("firstName",firstNameInputRef.current.value);
  dataToSend.append("lastName",lastNameInputRef.current.value);
  dataToSend.append("age",ageInputRef.current.value);
  dataToSend.append("email",emailInputRef.current.value);
  dataToSend.append("password",passwordInputRef.current.value);
  dataToSend.append("mobile",mobileInputRef.current.value);

  for(let i= 0;i<profileInputRef.current.files.length;i++){
      dataToSend.append("profilePic",profileInputRef.current.files[i]);

  }


  let reqOptions ={
    method:"PATCH",
    body:dataToSend,
  }

  let JSONData = await fetch("http://localhost:1234/updateProfile",reqOptions);
  let JSData = await JSONData.json();

  console.log(JSData);
};


  return (
    <div className="App">
      <TopNavigation/>

        <form>
            <h3>Edit Profile</h3>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef}/>
            </div>
            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef}/>
            </div>
            <div>
                <label>Age</label>
                <input ref={ageInputRef}/>
            </div>
            <div>
                <label>Email</label>
                <input ref={emailInputRef} readOnly/>
            </div>
            <div>
                <label>Password</label>
                <input ref={passwordInputRef}/>
            </div>
            <div>
                <label>Mobile No.</label>
                <input ref={mobileInputRef}></input>
            </div>
            <div>
                <label>Profile Pic</label>
                <input ref={profileInputRef} type="file"  onChange={(eventObj)=>{
                   
                   let selectedFileURL = URL.createObjectURL(eventObj.target.files[0]);
                  setProfilePic(selectedFileURL);   
                
                }}/>
            </div>
            <div>
                <img  className="profilePic" src ={profilePic} alt=''/>
            </div>
            <div>
          
                <button type="button" onClick={()=>{
                  sendUpdatedProfilePic();
                }}>Update Profile</button>
            </div>
        </form>

    </div>
  )
}

export default EditProfile