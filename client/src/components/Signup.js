import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function Signup() {

    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let ageInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileInputRef = useRef();
    let profileInputRef = useRef();

    let [profilePic,setProfilePic] = useState("./images/no image.jpg");



    let onSignup = async ()=>{
        
        let dataToSend ={
            firstName : firstNameInputRef.current.value,
            lastName : lastNameInputRef.current.value,
            age : ageInputRef.current.value,
            email : emailInputRef.current.value,
            password : passwordInputRef.current.value,
            mobile : mobileInputRef.current.value,
            profile : profileInputRef.current.value,
        }
        console.log(dataToSend);

        let myHeader = new Headers();
        myHeader.append("content-type","application/json");

        let reqOptions={
            method:"POST",
            body:JSON.stringify(dataToSend),
            headers:myHeader,
        };

        let JSONData = await fetch("http://localhost:1234/signup",reqOptions);
        let JSData = await JSONData.json();
        console.log(JSData);
    };
     let OnSignupUsingURLEncoded =async ()=>{

        let dataToSend = new URLSearchParams();
        dataToSend.append("firstName",firstNameInputRef.current.value);
        dataToSend.append("lastName",lastNameInputRef.current.value);
        dataToSend.append("age",ageInputRef.current.value);
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);
        dataToSend.append("mobile",mobileInputRef.current.value);
        dataToSend.append("profilePic",profileInputRef.current.value);

        let myHeader = new Headers();
        myHeader.append("content-type","application/x-www-form-urlencoded");

        let reqOptions ={
            method:"POST",
            body:dataToSend,
            headers :myHeader,
        };
        let JSONData = await fetch("http://localhost:1234/signup",reqOptions);
        let JSData = await JSONData.json();
        console.log(JSData);
     };
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
  return (
    <div className="App">
        <form>
            <h3>Signup</h3>
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
                <input ref={emailInputRef}/>
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
                    onSignup();

                }}>Signup (JSON)</button>
                <button type="button" onClick={()=>{
                    OnSignupUsingURLEncoded();
                }}>Signup (URL Encoded)</button>
                <button type="button" onClick={()=>{
                    OnSignupUsingFD();
                }}>Signup (FD)</button>
            </div>
        </form>
        <br></br>
        <Link to="/">Login</Link>

    </div>
  )
}

export default Signup