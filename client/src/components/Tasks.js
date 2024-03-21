import React from 'react'
import TopNavigation from './TopNavigation'
import { useDispatch } from 'react-redux'

function Tasks() {

let dispatch = useDispatch();

  return (
    <div className='App'>
        <TopNavigation/>
        <h1>Tasks</h1>
        <br></br>
        <button onClick ={()=>{
    dispatch({type:"createTask",data:"create a task"})
        }}>Create Task</button>
        <button onClick ={()=>{
    dispatch({type:"submitTask",data:"submit a task"})
        }}>Submit Task</button>
        <button onClick ={()=>{
    dispatch({type:"rejectTask",data:"reject a task"})
        }}>Reject Task</button>

        </div>
  )
}

export default Tasks