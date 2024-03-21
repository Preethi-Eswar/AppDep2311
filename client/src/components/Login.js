import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();



     useEffect(()=>{
    //  validateToken();
  },[]);
     let validateToken =async ()=>{

      if(localStorage.getItem("token")){


        let dataToSend = new FormData();
      dataToSend.append("token",localStorage.getItem("token"));


      let reqOptions ={
        method:"POST",
        body:dataToSend,
      };
let JSONData = await fetch("/loginWithToken",reqOptions);
let JSData = await JSONData.json();
if(JSData.status == "success"){


  dispatch({type:"login",data:JSData.data});
  navigate("/home");
}else{
 alert(JSData.msg);
}
console.log(JSData);

      }

      
     };

    let validateLogin1 = ()=>{

  return  async()=>{
    let dataToSend =new FormData();
    dataToSend.append("email",emailInputRef.current.value);
    dataToSend.append("password",passwordInputRef.current.value);



    let reqOptions ={
        method:"POST",
        body:dataToSend,
    }

    let JSONData = await fetch("/login",reqOptions);
    let JSData = await JSONData.json();
    if(JSData.status == "success"){

      localStorage.setItem("token",JSData.data.token);

      dispatch({type:"login",data:JSData.data});
      navigate("/home");
    }else{
     alert(JSData.msg);
    }

    console.log(JSData);
  }
    };

    let validateLogin = async()=>{
        let dataToSend =new FormData();
        dataToSend.append("email",emailInputRef.current.value);
        dataToSend.append("password",passwordInputRef.current.value);



        let reqOptions ={
            method:"POST",
            body:dataToSend,
        }

        let JSONData = await fetch("/login",reqOptions);
        let JSData = await JSONData.json();
        if(JSData.status == "success"){

          localStorage.setItem("token",JSData.data.token);

          dispatch({type:"login",data:JSData.data});
          navigate("/home");
        }else{
         alert(JSData.msg);
        }

        console.log(JSData);
    };
  return (
    <div className="App">
        <h1>Login</h1>
        <form>
        <div>
           <label>Email</label> 
           <input ref={emailInputRef}/>
        </div>
        <div>
           <label>Password</label> 
           <input ref ={passwordInputRef}/>
        </div>
        <div>
            <button type="button" onClick={()=>{
               // validateLogin();
                dispatch(validateLogin1());
            }}>Login</button>
        </div>
        </form>
        <br></br>
        <Link to="/signup">Signup</Link>
    </div>
  )
}

export default Login