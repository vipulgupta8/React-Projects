import React from 'react'
import { useState } from 'react'

function Input({taskList, setTaskList}) {
const [input, setInput] = useState("")

    const handleAddTask = (e) =>{
        e.preventDefault();
        setTaskList([...taskList, input]);
        setInput('');
    }

  return (
    <>
      <form className='flex flex-row items-center gap-3'>
        <input 
        className='border px-2 rounded-lg py-3 text-lg'
        type="text"
        placeholder='Add to task' 
        value={input}
        onChange={(e)=> setInput(e.target.value)}/>
        <button className='bg-violet-400 text-white py-2 px-3.5 rounded-lg font-semibold hover:opacity-70' onClick={handleAddTask}>Add</button>
      </form>

    </>
  )
}

export default Input
